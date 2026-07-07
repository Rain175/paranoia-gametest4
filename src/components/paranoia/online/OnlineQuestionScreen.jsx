import React, { useState } from "react";
import { Eye, Shuffle, Loader2 } from "lucide-react";
import { flipCoin } from "@/lib/onlineGame";
import GameStyles from "../GameStyles";

export default function OnlineQuestionScreen({ question, asker, others, roomId }) {
  const [flipping, setFlipping] = useState(false);

  const handleFlip = async () => {
    setFlipping(true);
    try {
      await flipCoin(roomId);
    } catch (e) {
      setFlipping(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-zinc-100">
      <GameStyles />
      <div className="flex flex-col min-h-screen px-5 pt-10 pb-8">
        <div className="glass rounded-xl px-4 py-2 mb-6 self-start flex items-center gap-2 text-xs text-violet-400 border border-zinc-800 font-semibold uppercase tracking-widest">
          <Eye size={11} /> Only you, {asker}
        </div>

        <div className="mb-5">
          <p className="text-zinc-500 text-xs uppercase tracking-widest mb-1 font-semibold">
            Your secret question
          </p>
          <div className="glass-strong rounded-2xl p-5 border border-zinc-700">
            <p className="text-xl font-bold leading-snug text-zinc-100 font-heading">
              {question}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {others.map((p) => (
                <span
                  key={p}
                  className="glass text-xs px-2.5 py-1 rounded-full text-fuchsia-400 border border-zinc-800 font-medium"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-4 mb-6 border border-zinc-800">
          <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-3 font-heading">
            How to play
          </h3>
          <div className="space-y-2.5">
            {[
              ["1", "Read the question above silently."],
              ["2", "Answer OUT LOUD to everyone — say a player's name."],
              ["3", "Flip the coin to decide if it gets revealed."],
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
          <p className="text-center text-zinc-600 text-xs mb-3">
            Once you've announced your answer…
          </p>
          <button
            onClick={handleFlip}
            disabled={flipping}
            className="w-full py-4 rounded-2xl font-bold text-base uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2 border border-cyan-500/30 text-white font-heading disabled:opacity-50"
            style={{ background: "linear-gradient(135deg,#0e7490,#6d28d9)" }}
          >
            {flipping ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Shuffle size={16} />
            )}
            {flipping ? "Flipping..." : "Flip the Coin"}
          </button>
        </div>
      </div>
    </div>
  );
}