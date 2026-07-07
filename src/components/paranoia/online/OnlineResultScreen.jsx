import React, { useState } from "react";
import { Eye, ChevronRight, Loader2 } from "lucide-react";
import { nextRound } from "@/lib/onlineGame";
import GameStyles from "../GameStyles";

export default function OnlineResultScreen({
  coinResult,
  question,
  asker,
  isAsker,
  roomId,
  room,
}) {
  const [advancing, setAdvancing] = useState(false);
  const isHeads = coinResult === "heads";

  const handleNext = async () => {
    setAdvancing(true);
    try {
      await nextRound(roomId, room);
    } catch (e) {
      setAdvancing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-zinc-100">
      <GameStyles />
      <div className="flex flex-col items-center min-h-screen px-5 pt-14 pb-8 text-center">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mb-5 text-zinc-100"
          style={{
            background: isHeads
              ? "linear-gradient(135deg,#0e7490,#06b6d4)"
              : "linear-gradient(135deg,#be185d,#7c3aed)",
            boxShadow: isHeads
              ? "0 0 40px rgba(6,182,212,0.15)"
              : "0 0 40px rgba(219,39,119,0.15)",
          }}
        >
          {isHeads ? (
            <Eye size={36} className="text-cyan-100" />
          ) : (
            <span className="text-3xl font-bold text-fuchsia-100">M</span>
          )}
        </div>

        <div
          className={`text-5xl font-extrabold mb-2 font-heading ${
            isHeads ? "text-cyan-400" : "text-fuchsia-400"
          }`}
        >
          {isHeads ? "HEADS" : "TAILS"}
        </div>
        <div className="text-lg font-bold text-zinc-500 uppercase tracking-widest mb-8 font-heading">
          {isHeads ? "Question Revealed!" : "Forever a Secret"}
        </div>

        {isHeads ? (
          <div className="glass-strong rounded-2xl p-5 mb-4 w-full text-left border border-zinc-700">
            <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold mb-2">
              The question was…
            </p>
            <p className="text-lg font-bold leading-snug text-zinc-100 font-heading">
              {question}
            </p>
            <p className="text-zinc-500 text-sm mt-3">
              Now everyone knows exactly why{" "}
              <strong className="text-zinc-400">{asker}</strong> said what they said!
            </p>
          </div>
        ) : (
          <div className="glass rounded-2xl p-5 mb-4 w-full border border-zinc-800">
            <p className="text-base font-bold text-zinc-600 italic mb-1 font-heading">
              "What did they mean…?"
            </p>
            <p className="text-zinc-600 text-sm">
              <strong className="text-zinc-500">{asker}</strong> takes the secret to the
              grave. Stay paranoid.
            </p>
          </div>
        )}

        <div className="mt-auto w-full">
          {isAsker ? (
            <button
              onClick={handleNext}
              disabled={advancing}
              className="w-full py-4 rounded-2xl font-bold text-base uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2 border border-purple-500/30 text-white font-heading disabled:opacity-50"
              style={{ background: "linear-gradient(135deg,#6d28d9,#be185d)" }}
            >
              {advancing ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <ChevronRight size={16} />
              )}
              Next Round
            </button>
          ) : (
            <div className="w-full py-4 rounded-2xl glass border border-zinc-800 flex items-center justify-center gap-2 text-zinc-500">
              <Loader2 size={16} className="animate-spin" />
              Waiting for {asker} to continue...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}