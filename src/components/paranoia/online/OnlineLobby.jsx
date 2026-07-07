import React, { useState } from "react";
import { ArrowLeft, Plus, LogIn, Loader2 } from "lucide-react";
import { getDisplayName, setDisplayName } from "@/lib/session";
import { createRoom, joinRoom } from "@/lib/onlineGame";
import GameStyles from "../GameStyles";

export default function OnlineLobby({ onRoomCreated, onRoomJoined, onExit }) {
  const [name, setName] = useState(getDisplayName());
  const [joinCode, setJoinCode] = useState("");
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState("");

  const handleCreate = async () => {
    if (!name.trim()) {
      setError("Enter your name first");
      return;
    }
    setError("");
    setLoading("create");
    setDisplayName(name.trim());
    try {
      const code = await createRoom(name.trim(), {
        icebreaker: true,
        funny: true,
        spicy: false,
        extreme: false,
      });
      onRoomCreated(code);
    } catch (e) {
      setError(e.message || "Failed to create room");
    } finally {
      setLoading(null);
    }
  };

  const handleJoin = async () => {
    if (!name.trim()) {
      setError("Enter your name first");
      return;
    }
    if (!joinCode.trim()) {
      setError("Enter a room code");
      return;
    }
    setError("");
    setLoading("join");
    setDisplayName(name.trim());
    try {
      const code = await joinRoom(joinCode, name.trim());
      onRoomJoined(code);
    } catch (e) {
      setError(e.message || "Failed to join room");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex flex-col items-center justify-center px-5 py-8 text-zinc-100">
      <GameStyles />
      <div className="w-full max-w-md">
        <button
          onClick={onExit}
          className="text-zinc-500 hover:text-zinc-300 mb-6 flex items-center gap-2 text-sm"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold mb-2 shimmer-text font-heading">ONLINE</h1>
          <p className="text-zinc-500 text-sm uppercase tracking-widest font-semibold">
            Play with friends anywhere
          </p>
        </div>

        <div className="mb-6">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 block font-heading">
            Your Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name..."
            className="w-full glass rounded-xl px-4 py-3 bg-zinc-900/40 text-zinc-100 placeholder-zinc-600 outline-none focus:bg-zinc-900/80 focus:border-zinc-700 transition-all text-sm"
            maxLength={20}
          />
        </div>

        <div className="glass-strong rounded-2xl p-5 mb-4 border border-zinc-800">
          <button
            onClick={handleCreate}
            disabled={loading === "create"}
            className="w-full py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 font-heading text-white"
            style={{ background: "linear-gradient(135deg,#6d28d9,#be185d)" }}
          >
            {loading === "create" ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Plus size={16} />
            )}
            Create Room
          </button>
          <p className="text-zinc-600 text-xs text-center mt-2">
            Get a code to share with friends
          </p>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 h-px bg-zinc-800" />
          <span className="text-zinc-600 text-xs uppercase tracking-widest">or</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        <div className="glass-strong rounded-2xl p-5 border border-zinc-800">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 block font-heading">
            Room Code
          </label>
          <input
            type="text"
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && handleJoin()}
            placeholder="ABCD"
            className="w-full glass rounded-xl px-4 py-3 bg-zinc-900/40 text-zinc-100 placeholder-zinc-600 outline-none focus:bg-zinc-900/80 focus:border-zinc-700 transition-all text-lg font-bold text-center tracking-widest uppercase"
            maxLength={4}
          />
          <button
            onClick={handleJoin}
            disabled={loading === "join"}
            className="w-full mt-3 py-3.5 rounded-xl font-bold text-sm uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 font-heading border border-cyan-500/30 text-white"
            style={{ background: "linear-gradient(135deg,#0e7490,#6d28d9)" }}
          >
            {loading === "join" ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <LogIn size={16} />
            )}
            Join Room
          </button>
        </div>

        {error && <p className="text-red-400 text-sm text-center mt-4">{error}</p>}
      </div>
    </div>
  );
}