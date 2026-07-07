import React from "react";
import { Trophy, Home } from "lucide-react";
import GameStyles from "../GameStyles";

export default function OnlineGameEnd({ onExit }) {
  return (
    <div className="min-h-screen bg-[#0a0a0c] flex flex-col items-center justify-center px-6 text-center text-zinc-100">
      <GameStyles />
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mb-6">
        <Trophy size={32} className="text-white" />
      </div>
      <h2 className="text-3xl font-extrabold mb-3 shimmer-text font-heading">Game Over!</h2>
      <p className="text-zinc-500 text-sm max-w-xs mb-8">
        You've played through all the questions. Hope you survived the paranoia!
      </p>
      <button
        onClick={onExit}
        className="px-8 py-3.5 rounded-2xl font-bold text-sm uppercase tracking-widest active:scale-95 transition-all flex items-center gap-2 border border-purple-500/30 text-white font-heading"
        style={{ background: "linear-gradient(135deg,#6d28d9,#be185d)" }}
      >
        <Home size={16} /> Back to Menu
      </button>
    </div>
  );
}