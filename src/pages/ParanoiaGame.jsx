import React, { useState } from "react";
import { QUESTIONS, shuffle } from "@/lib/gameData";
import SetupScreen from "@/components/paranoia/SetupScreen";
import PassScreen from "@/components/paranoia/PassScreen";
import QuestionScreen from "@/components/paranoia/QuestionScreen";
import CoinScreen from "@/components/paranoia/CoinScreen";
import ResultScreen from "@/components/paranoia/ResultScreen";
import ModeSelect from "@/components/paranoia/online/ModeSelect";
import OnlineGame from "@/components/paranoia/online/OnlineGame";

export default function ParanoiaGame() {
  const [mode, setMode] = useState(null);
  const [screen, setScreen] = useState("setup");
  const [players, setPlayers] = useState([]);
  const [categories, setCategories] = useState({
    icebreaker: true,
    funny: true,
    spicy: false,
    extreme: false,
  });
  const [game, setGame] = useState(null);

  const toggleCategory = (cat) => {
    setCategories({ ...categories, [cat]: !categories[cat] });
  };

  const startGame = () => {
    if (players.length < 2) return;
    const selectedCats = Object.entries(categories)
      .filter(([_, enabled]) => enabled)
      .map(([cat]) => cat);
    if (selectedCats.length === 0) return;

    const allQuestions = selectedCats.flatMap((cat) => QUESTIONS[cat]);
    const shuffledQ = shuffle(allQuestions);
    setGame({
      players: shuffle(players),
      questions: shuffledQ,
      round: 0,
      askerIdx: 0,
      currentQuestion: null,
      coinResult: null,
    });
    setScreen("pass");
  };

  if (!mode) {
    return <ModeSelect onSelect={setMode} />;
  }

  if (mode === "online") {
    return <OnlineGame onExit={() => setMode(null)} />;
  }

  if (screen === "setup") {
    return (
      <SetupScreen
        players={players}
        setPlayers={setPlayers}
        categories={categories}
        toggleCategory={toggleCategory}
        startGame={startGame}
      />
    );
  }

  if (!game) return null;

  if (screen === "pass") {
    return (
      <PassScreen
        asker={game.players[game.askerIdx].name}
        round={game.round + 1}
        onReady={() => {
          setGame({ ...game, currentQuestion: game.questions[game.round] });
          setScreen("question");
        }}
      />
    );
  }

  if (screen === "question") {
    const asker = game.players[game.askerIdx];
    const others = game.players.filter((p) => p.name !== asker.name).map((p) => p.name);
    return (
      <QuestionScreen
        question={game.currentQuestion}
        asker={asker.name}
        others={others}
        onFlip={() => {
          const result = Math.random() < 0.5 ? "heads" : "tails";
          setGame({ ...game, coinResult: result });
          setScreen("coin");
        }}
      />
    );
  }

  if (screen === "coin") {
    return (
      <CoinScreen
        onFlip={() => {
          setScreen("result");
        }}
      />
    );
  }

  if (screen === "result") {
    const nextRound = game.round + 1;
    const nextAsker = nextRound % game.players.length;
    return (
      <ResultScreen
        coinResult={game.coinResult}
        question={game.currentQuestion}
        asker={game.players[game.askerIdx].name}
        onNext={() => {
          if (nextRound >= game.questions.length) {
            setScreen("setup");
            setGame(null);
          } else {
            setGame({
              ...game,
              round: nextRound,
              askerIdx: nextAsker,
              coinResult: null,
            });
            setScreen("pass");
          }
        }}
      />
    );
  }

  return null;
}