import React from "react";
import GameStyles from "../GameStyles";

export default function OnlineWaitingScreen({ asker, phase }) {
  const message =
    phase === "result"
      ? `Waiting for ${asker} to continue...`
      : `${asker} is reading their question...`;

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex flex-col items-center justify-center px-6 text-center text-zinc-100">
      <GameStyles />
      <div className="glass rounded-full px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-500 border border-zinc-800">
        {phase === "result" ? "Round Complete" : "In Progress"}
      </div>
      <div className="w-16 h-16 rounded-full border-4 border-zinc-800 border-t-violet-500 animate-spin mb-8" />
      <p className="text-zinc-300 text-lg font-semibold font-heading">{message}</p>
      <p className="text-zinc-600 text-sm mt-2 max-w-xs">
        {phase === "result"
          ? "The next round will start automatically."
          : "They'll flip a coin when they're ready."}
      </p>
    </div>
  );
}