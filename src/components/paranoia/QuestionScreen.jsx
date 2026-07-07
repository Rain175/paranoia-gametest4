import React, { useState } from "react";
import { Eye, EyeOff, Shuffle } from "lucide-react";
import GameStyles from "./GameStyles";

export default function QuestionScreen({ question, asker, others, onFlip }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-zinc-100">
      <GameStyles />
      <div className="flex flex-col min-h-screen px-5 pt-10 pb-8">
        <div className="glass rounded-xl px-4 py-2 mb-6 self-start flex items-center gap-2 text-xs text-violet-400 border-zinc-800 font-semibold uppercase tracking-widest">
          <Eye size={11} /> Only you, {asker}
        </div>

        <div className="mb-5">
          <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1 font-semibold">Your secret question</p>
          <div className="glass-strong rounded-2xl p-5 relative overflow-hidden border-zinc-700">
            {!revealed && (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0c]/95 backdrop-blur-md rounded-2xl z-10 cursor-pointer"
                onClick={() => setRevealed(true)}
              >
                <EyeOff size={28} className="text-zinc-600 mb-2" />
                <span className="text-zinc-500 text-sm">Tap to reveal</span>
              </div>
            )}
            <p className="text-xl font-bold leading-snug text-zinc-100 font-heading">{question}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {others.map((p) => (
                <span key={p} className="glass text-xs px-2.5 py-1 rounded-full text-fuchsia-400 border-zinc-800 font-medium">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-4 mb-6 border-zinc-800">
          <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-3 font-heading">How to play</h3>
          <div className="space-y-2.5">
            {[
              ["1", "Read the question above silently."],
              ["2", "Answer OUT LOUD to everyone — say a player's name."],
              ["3", "Flip the coin to decide if the question gets revealed."],
            ].map(([n, text]) => (
              <div key={n} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-violet-950 text-violet-400 border border-violet-800 text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  {n}
                </span>
                <span className="text-zinc-400 text-sm leading-relaxed">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <p className="text-center text-zinc-600 text-xs mb-3">Once you've announced your answer…</p>
          <button
            onClick={onFlip}
            className="w-full py-4 rounded-2xl font-bold text-base uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2 border border-cyan-500/30 text-white font-heading"
            style={{ background: "linear-gradient(135deg,#0e7490,#6d28d9)" }}
          >
            <Shuffle size={16} /> Flip the Coin
          </button>
        </div>
      </div>
    </div>
  );
}