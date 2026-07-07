import React from "react";
import GameStyles from "./GameStyles";

export default function CoinScreen({ onFlip }) {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-zinc-100">
      <GameStyles />
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <p className="text-zinc-500 text-sm mb-2 uppercase tracking-widest font-semibold">The moment of truth</p>
        <h2 className="text-3xl font-extrabold mb-12 text-zinc-200 font-heading">
          Heads = <span className="text-cyan-400">Reveal</span>
          <br />
          Tails = <span className="text-fuchsia-400">Secret</span>
        </h2>
        <div
          onClick={onFlip}
          className="w-44 h-44 rounded-full cursor-pointer select-none mb-10 active:scale-95 transition-transform"
          style={{
            background: "linear-gradient(145deg,#d97706,#b45309,#d97706)",
            boxShadow:
              "0 0 0 6px rgba(217,119,6,0.1), 0 20px 60px rgba(217,119,6,0.15), inset 0 2px 4px rgba(255,255,255,0.2), inset 0 -4px 6px rgba(0,0,0,0.4)",
          }}
        >
          <div className="w-full h-full rounded-full flex items-center justify-center">
            <span className="text-5xl font-extrabold text-amber-950/80 font-heading">?</span>
          </div>
        </div>
        <button
          onClick={onFlip}
          className="glass-strong px-8 py-3.5 rounded-2xl font-bold uppercase tracking-widest text-sm active:scale-95 transition-all text-amber-400 border-zinc-700 font-heading"
        >
          Flip It!
        </button>
      </div>
    </div>
  );
}