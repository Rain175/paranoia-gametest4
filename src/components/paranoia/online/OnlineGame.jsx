import React, { useState, useEffect } from "react";
import { db, handleFirestoreError, OperationType } from "@/lib/firebase";
import {
  doc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { getSessionId } from "@/lib/session";
import OnlineLobby from "@/components/paranoia/online/OnlineLobby";
import HostLobby from "@/components/paranoia/online/HostLobby";
import PlayerLobby from "@/components/paranoia/online/PlayerLobby";
import OnlineQuestionScreen from "@/components/paranoia/online/OnlineQuestionScreen";
import OnlineWaitingScreen from "@/components/paranoia/online/OnlineWaitingScreen";
import OnlineResultScreen from "@/components/paranoia/online/OnlineResultScreen";
import OnlineGameEnd from "@/components/paranoia/online/OnlineGameEnd";

export default function OnlineGame({ onExit }) {
  const [roomCode, setRoomCode] = useState(() => localStorage.getItem("paranoia_room_code") || "");
  const [room, setRoom] = useState(null);
  const [players, setPlayers] = useState([]);
  const sessionId = getSessionId();

  useEffect(() => {
    if (roomCode) {
      localStorage.setItem("paranoia_room_code", roomCode);
    } else {
      localStorage.removeItem("paranoia_room_code");
    }
  }, [roomCode]);

  useEffect(() => {
    if (!roomCode) {
      setRoom(null);
      setPlayers([]);
      return;
    }

    let cancelled = false;

    const unsubRoom = onSnapshot(
      doc(db, "game_rooms", roomCode),
      (snap) => {
        if (cancelled) return;
        if (!snap.exists()) {
          setRoomCode("");
          return;
        }
        setRoom({ id: snap.id, ...snap.data() });
      },
      (error) => {
        if (!cancelled) {
          try {
            handleFirestoreError(error, OperationType.GET, `game_rooms/${roomCode}`);
          } catch (e) {
            setRoomCode("");
          }
        }
      }
    );

    const unsubPlayers = onSnapshot(
      query(collection(db, "room_players"), where("room_code", "==", roomCode)),
      (snap) => {
        if (cancelled) return;
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        list.sort((a, b) => (a.order || 0) - (b.order || 0));
        setPlayers(list);
      },
      (error) => {
        if (!cancelled) {
          handleFirestoreError(error, OperationType.LIST, "room_players");
        }
      }
    );

    return () => {
      cancelled = true;
      unsubRoom();
      unsubPlayers();
    };
  }, [roomCode]);

  const handleExit = () => {
    localStorage.removeItem("paranoia_room_code");
    localStorage.removeItem("paranoia_mode");
    setRoomCode("");
    setRoom(null);
    setPlayers([]);
    onExit();
  };

  if (!roomCode) {
    return (
      <OnlineLobby
        onRoomCreated={(code) => setRoomCode(code)}
        onRoomJoined={(code) => setRoomCode(code)}
        onExit={handleExit}
      />
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-zinc-800 border-t-violet-500 rounded-full animate-spin" />
      </div>
    );
  }

  const isHost = room.host_session_id === sessionId;

  if (room.status === "lobby") {
    return isHost ? (
      <HostLobby room={room} players={players} onExit={handleExit} />
    ) : (
      <PlayerLobby room={room} players={players} onExit={handleExit} />
    );
  }

  if (room.status === "ended") {
    return <OnlineGameEnd onExit={handleExit} />;
  }

  const currentAsker = room.players?.[room.asker_idx];
  const isMyTurn = currentAsker?.session_id === sessionId;

  if (room.phase === "question") {
    if (isMyTurn && currentAsker) {
      const others = (room.players || [])
        .filter((_, i) => i !== room.asker_idx)
        .map((p) => p.name);
      return (
        <OnlineQuestionScreen
          question={room.current_question}
          asker={currentAsker.name}
          others={others}
          roomId={room.id}
        />
      );
    }
    return <OnlineWaitingScreen asker={currentAsker?.name || "?"} phase="question" />;
  }

  if (room.phase === "result") {
    return (
      <OnlineResultScreen
        coinResult={room.coin_result}
        question={room.current_question}
        asker={currentAsker?.name || "?"}
        isAsker={isMyTurn}
        roomId={room.id}
        room={room}
      />
    );
  }

  return null;
}