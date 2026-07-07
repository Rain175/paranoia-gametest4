import React, { useState } from "react";
import { ArrowLeft, Copy, Check, Zap, Loader2 } from "lucide-react";
import { CATEGORY_META } from "@/lib/gameData";
import { startGame } from "@/lib/onlineGame";
import GameStyles from "../GameStyles";

export default function HostLobby({ room, players, onExit }) {
  const [copied, setCopied] = useState(false);
  const [categories, setCategories] = useState(
    room.categories || { icebreaker: true, funny: true, spicy: false, extreme: false }
  );
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState("");

  const toggleCategory = (cat) => {
    setCategories({ ...categories, [cat]: !categories[cat] });
  };

  const copyCode = () => {
    navigator.clipboard.writeText(room.room_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const canStart = players.length >= 2 && Object.values(categories).some(Boolean);

  const handleStart = async () => {
    setStarting(true);
    setError("");
    try {
      await startGame(room.id, categories, players);
    } catch (e) {
      setError(e.message || "Failed to start game");
    } finally {
      setStarting(false);
    }
  };

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
          <button
            onClick={copyCode}
            className="glass-strong rounded-3xl px-10 py-6 inline-flex items-center gap-3 border border-zinc-700 hover:border-zinc-600 transition-all active:scale-95"
          >
            <span className="text-5xl font-extrabold shimmer-text font-heading tracking-widest">
              {room.room_code}
            </span>
            {copied ? (
              <Check size={20} className="text-green-400" />
            ) : (
              <Copy size={20} className="text-zinc-500" />
            )}
          </button>
          <p className="text-zinc-600 text-xs mt-2">Tap to copy & share with friends</p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold uppercase tracking-widest text-zinc-400 mb-4 font-heading">
            Players ({players.length})
          </h2>
          <div className="glass-strong rounded-2xl p-4 space-y-2 max-h-48 overflow-y-auto border border-zinc-800">
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

        <div className="mb-8">
          <h2 className="text-lg font-bold uppercase tracking-widest text-zinc-400 mb-4 font-heading">
            Categories
          </h2>
          <div className="space-y-2">
            {Object.entries(CATEGORY_META).map(([key, meta]) => (
              <button
                key={key}
                onClick={() => toggleCategory(key)}
                className={`w-full rounded-xl p-3 transition-all text-left ${
                  categories[key]
                    ? `bg-gradient-to-r ${meta.color} text-white font-semibold`
                    : "glass-strong text-zinc-500 hover:text-zinc-300 border border-zinc-800"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold font-heading">{meta.label}</span>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      categories[key] ? "border-white bg-white" : "border-zinc-700"
                    }`}
                  >
                    {categories[key] && <Check size={14} className="text-zinc-900" />}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleStart}
          disabled={!canStart || starting}
          className={`w-full py-4 rounded-2xl font-bold text-base uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2 font-heading ${
            !canStart || starting
              ? "opacity-30 cursor-not-allowed bg-zinc-900 border border-zinc-800"
              : "bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/20"
          }`}
        >
          {starting ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Zap size={16} />
          )}
          {players.length < 2 ? "Need 2+ Players" : "Start Game"}
        </button>

        {error && <p className="text-red-400 text-sm text-center mt-4">{error}</p>}
      </div>
    </div>
  );
}