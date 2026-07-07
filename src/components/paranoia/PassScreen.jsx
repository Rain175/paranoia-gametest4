import React from "react";
import { Eye } from "lucide-react";
import GameStyles from "./GameStyles";

export default function PassScreen({ asker, round, onReady }) {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-zinc-100">
      <GameStyles />
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="glass rounded-full px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-500 border-zinc-800">
          Round {round}
        </div>
        <div className="mb-3 text-zinc-500 text-sm font-medium">Pass the device to</div>
        <div className="glass-strong rounded-3xl px-8 py-5 mb-3 inline-block border-zinc-700">
          <span className="text-4xl font-extrabold shimmer-text font-heading">{asker}</span>
        </div>
        <p className="text-zinc-600 text-xs mb-14 max-w-xs">
          Only <strong className="text-zinc-400">{asker}</strong> should be looking at the screen for the next step.
        </p>
        <button
          onClick={onReady}
          className="pulse-btn w-40 h-40 rounded-full font-extrabold text-lg uppercase tracking-wider transition-all active:scale-90 flex flex-col items-center justify-center gap-1 border border-purple-500/30 font-heading text-white"
          style={{ background: "linear-gradient(135deg,#6d28d9,#be185d)" }}
        >
          <Eye size={28} />
          <span className="text-xs tracking-widest">I'm Ready</span>
        </button>
      </div>
    </div>
  );
}