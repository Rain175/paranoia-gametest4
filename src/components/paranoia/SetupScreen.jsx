import React from "react";
import { Plus, Trash2, Check, Zap } from "lucide-react";
import { CATEGORY_META } from "@/lib/gameData";
import GameStyles from "./GameStyles";

export default function SetupScreen({ players, setPlayers, categories, toggleCategory, startGame }) {
  const [nameInput, setNameInput] = React.useState("");

  const addPlayer = () => {
    const name = nameInput.trim();
    if (name && !players.some((p) => p.name === name)) {
      setPlayers([...players, { name, order: players.length }]);
      setNameInput("");
    }
  };

  const removePlayer = (idx) => {
    setPlayers(players.filter((_, i) => i !== idx));
  };

  const canStart = players.length >= 2 && Object.values(categories).some(Boolean);

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex flex-col items-center justify-center px-5 py-8 text-zinc-100">
      <GameStyles />
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-3 shimmer-text font-heading">
            PARANOIA
          </h1>
          <p className="text-zinc-500 text-sm uppercase tracking-widest font-semibold">The ultimate party game</p>
        </div>

        {/* Player List */}
        <div className="mb-8">
          <h2 className="text-lg font-bold uppercase tracking-widest text-zinc-400 mb-4 font-heading">
            Players ({players.length})
          </h2>
          <div className="glass-strong rounded-2xl p-4 space-y-2 mb-4 max-h-48 overflow-y-auto">
            {players.length === 0 ? (
              <p className="text-zinc-600 text-sm italic">No players yet. Add someone!</p>
            ) : (
              players.map((p, i) => (
                <div key={i} className="flex items-center justify-between bg-zinc-900/50 rounded-lg px-4 py-3 border border-zinc-800">
                  <span className="font-medium text-zinc-200">{p.name}</span>
                  <button onClick={() => removePlayer(i)} className="text-red-400 hover:text-red-300 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addPlayer()}
              placeholder="Enter a name..."
              className="flex-1 glass rounded-xl px-4 py-3 bg-zinc-900/40 text-zinc-100 placeholder-zinc-600 outline-none focus:bg-zinc-900/80 focus:border-zinc-700 transition-all text-sm"
            />
            <button
              onClick={addPlayer}
              className="glass-strong rounded-xl px-4 py-3 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition-all active:scale-95 flex items-center gap-2 text-sm font-semibold"
            >
              <Plus size={16} /> Add
            </button>
          </div>
        </div>

        {/* Category Toggles */}
        <div className="mb-8">
          <h2 className="text-lg font-bold uppercase tracking-widest text-zinc-400 mb-4 font-heading">
            Question Categories
          </h2>
          <div className="space-y-2">
            {Object.entries(CATEGORY_META).map(([key, meta]) => (
              <button
                key={key}
                onClick={() => toggleCategory(key)}
                className={`w-full rounded-2xl p-4 transition-all text-left ${
                  categories[key]
                    ? `bg-gradient-to-r ${meta.color} text-white font-semibold`
                    : "glass-strong text-zinc-500 hover:text-zinc-300 border-zinc-800"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold flex items-center gap-2 font-heading">
                      {meta.label}
                    </div>
                    <p className="text-xs mt-1 opacity-75">{meta.desc}</p>
                  </div>
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      categories[key] ? "border-white bg-white" : "border-zinc-700"
                    }`}
                  >
                    {categories[key] && <Check size={16} className="text-zinc-900" />}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={startGame}
          disabled={!canStart}
          className={`w-full py-4 rounded-2xl font-bold text-base uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-2 font-heading ${
            !canStart
              ? "opacity-30 cursor-not-allowed bg-zinc-900 border border-zinc-800"
              : "bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/20"
          }`}
        >
          <Zap size={16} /> Start Game
        </button>
      </div>
    </div>
  );
}