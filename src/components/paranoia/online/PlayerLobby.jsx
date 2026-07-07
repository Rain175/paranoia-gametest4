import React from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import GameStyles from "../GameStyles";

export default function PlayerLobby({ room, players, onExit }) {
  return (
    <div className="min-h-screen bg-[#0a0a0c] flex flex-col items-center px-5 py-8 text-zinc-100">
      <GameStyles />
      <div className="w-full max-w-md">
        <button
          onClick={onExit}
          className="text-zinc-500 hover:text-zinc-300 mb-6 flex items-center gap-2 text-sm"
        >
          <ArrowLeft size={16} /> Leave Room
        </button>

        <div className="text-center mb-8">
          <p className="text-zinc-500 text-xs uppercase tracking-widest font-semibold mb-2">
            Room Code
          </p>
          <div className="glass-strong rounded-3xl px-10 py-6 inline-block border border-zinc-700">
            <span className="text-4xl font-extrabold shimmer-text font-heading tracking-widest">
              {room.room_code}
            </span>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold uppercase tracking-widest text-zinc-400 mb-4 font-heading">
            Players ({players.length})
          </h2>
          <div className="glass-strong rounded-2xl p-4 space-y-2 border border-zinc-800">
            {players.map((p, i) => (
              <div
                key={i}
                className="flex items-center justify-between bg-zinc-900/50 rounded-lg px-4 py-3 border border-zinc-800"
              >
                <span className="font-medium text-zinc-200">{p.name}</span>
                {p.is_host && (
                  <span className="text-xs text-violet-400 font-semibold uppercase tracking-widest">
                    Host
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6 text-center border border-zinc-800">
          <Loader2 size={24} className="text-violet-400 animate-spin mx-auto mb-3" />
          <p className="text-zinc-400 font-semibold">Waiting for host to start...</p>
          <p className="text-zinc-600 text-sm mt-1">Hang tight, the game will begin soon</p>
        </div>
      </div>
    </div>
  );
}