import React from "react";
import { Users, Wifi } from "lucide-react";
import GameStyles from "../GameStyles";

export default function ModeSelect({ onSelect }) {
  return (
    <div className="min-h-screen bg-[#0a0a0c] flex flex-col items-center justify-center px-5 py-8 text-zinc-100">
      <GameStyles />
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-3 shimmer-text font-heading">
            PARANOIA
          </h1>
          <p className="text-zinc-500 text-sm uppercase tracking-widest font-semibold">
            Choose your game mode
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => onSelect("local")}
            className="w-full glass-strong rounded-2xl p-6 text-left hover:border-zinc-600 transition-all active:scale-95 border border-zinc-800"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shrink-0">
                <Users size={24} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-lg text-zinc-100 font-heading">Local Play</div>
                <p className="text-zinc-500 text-sm">Pass one device around the room</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onSelect("online")}
            className="w-full glass-strong rounded-2xl p-6 text-left hover:border-zinc-600 transition-all active:scale-95 border border-zinc-800"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600 to-violet-600 flex items-center justify-center shrink-0">
                <Wifi size={24} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-lg text-zinc-100 font-heading">Online Play</div>
                <p className="text-zinc-500 text-sm">Create a room, share the code, play together</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}