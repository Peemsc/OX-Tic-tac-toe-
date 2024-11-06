"use client";

import { useCallback, useEffect } from "react";
import { Board } from "@/components/game/board";
import { AchievementCard } from "@/components/game/achievement";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { ACHIEVEMENTS } from "@/lib/game/achievements";
import { useGameStore } from "@/lib/store/useGameStore";
import { Difficulty } from "@/lib/utility/types";
import { Navbar } from "@/components/ui/navbar";

const difficultyOptions = [
  { value: "easy" as Difficulty, label: "Easy" },
  { value: "medium" as Difficulty, label: "Medium" },
  { value: "hard" as Difficulty, label: "Hard" },
];

export default function GamePage() {
  const gameState = useGameStore((state) => state.gameState);
  const stats = useGameStore((state) => state.stats);
  const newAchievements = useGameStore((state) => state.newAchievements);
  const makeMove = useGameStore((state) => state.makeMove);
  const botMove = useGameStore((state) => state.botMove);
  const resetGame = useGameStore((state) => state.resetGame);
  const setDifficulty = useGameStore((state) => state.setDifficulty);
  const clearNewAchievements = useGameStore(
    (state) => state.clearNewAchievements
  );

  const handleSquareClick = useCallback(
    (position: number) => {
      makeMove(position);
    },
    [makeMove]
  );

  const handleDifficultyChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setDifficulty(e.target.value as Difficulty);
    },
    [setDifficulty]
  );

  useEffect(() => {
    if (gameState.currentPlayer === "O" && !gameState.isGameOver) {
      const timer = setTimeout(botMove, 500);
      return () => clearTimeout(timer);
    }
  }, [gameState.currentPlayer, gameState.isGameOver, botMove]);

  return (
    <div className="min-h-screen bg-[#0a192f]">
      <Navbar />
      <div className="pt-16 px-4 sm:px-6 lg:px-8 relative">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 -top-10 -left-10 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute w-96 h-96 -bottom-10 -right-10 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        ></div>

        <div className="max-w-7xl mx-auto">
          {/* Game Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
              Tic Tac Toe
            </h1>
            <p className="text-gray-400">
              Score: {gameState.score} | Consecutive Wins:{" "}
              {gameState.consecutiveWins}/3
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Stats Card */}
            <div className="lg:w-1/3">
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 shadow-xl">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-blue-400">📊</span> Statistics
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 rounded bg-white/5">
                    <span className="text-gray-300">Total Games</span>
                    <span className="font-mono text-blue-400">
                      {stats.totalGames}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/90">Wins</span>
                    <span className="font-mono text-green-400">
                      {stats.wins}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/90">Losses</span>
                    <span className="font-mono text-red-400">
                      {stats.losses}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/90">Draws</span>
                    <span className="font-mono text-yellow-400">
                      {stats.draws}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/90">Best Streak</span>
                    <span className="font-mono text-blue-400">
                      {stats.bestStreak}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/90">Highest Score</span>
                    <span className="font-mono text-purple-400">
                      {stats.highestScore}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Game Board Section */}
            <div className="lg:w-2/3">
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 shadow-xl">
                {/* Difficulty Selector */}
                <div className="mb-6">
                  <Select
                    className="w-48 mx-auto bg-white/10 border-white/20 text-white"
                    value={gameState.difficulty}
                    onChange={handleDifficultyChange}
                    options={difficultyOptions}
                    label="Select Difficulty"
                  />
                </div>

                {/* Game Board */}
                <div className="flex justify-center mb-6">
                  <Board
                    player={gameState.currentPlayer}
                    board={gameState.board}
                    winningLine={gameState.winningLine}
                    onSquareClick={handleSquareClick}
                    disabled={
                      gameState.currentPlayer === "O" || gameState.isGameOver
                    }
                  />
                </div>

                {/* Game Status */}
                {gameState.isGameOver && (
                  <div className="text-center animate-fade-in">
                    <div className="text-2xl font-bold mb-4">
                      {gameState.winner === "X" && (
                        <span className="text-green-400">
                          🎉 Victory! Well Played!
                        </span>
                      )}
                      {gameState.winner === "O" && (
                        <span className="text-red-400">
                          😔 Better Luck Next Time!
                        </span>
                      )}
                      {!gameState.winner && (
                        <span className="text-yellow-400">🤝 It&apos;s a Draw!</span>
                      )}
                    </div>
                    <Button
                      onClick={resetGame}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-2 rounded-lg text-white font-medium transition-all hover:scale-105"
                    >
                      Play Again
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Achievements Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span>🏆</span> Achievements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ACHIEVEMENTS.map((achievement) => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                  unlocked={stats.achievements.includes(achievement.id)}
                />
              ))}
            </div>
          </div>

          {/* New Achievement Popup */}
          {newAchievements.length > 0 && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50">
              <Card className="p-8 max-w-md w-full bg-slate-800/90 border-none">
                <h2 className="text-2xl font-bold mb-4 text-white">
                  New Achievement{newAchievements.length > 1 ? "s" : ""}{" "}
                  Unlocked! 🏆
                </h2>
                <div className="space-y-4">
                  {newAchievements.map((achievement) => (
                    <AchievementCard
                      key={achievement.id}
                      achievement={achievement}
                      unlocked={true}
                    />
                  ))}
                </div>
                <Button
                  className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white"
                  onClick={clearNewAchievements}
                >
                  Continue
                </Button>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
