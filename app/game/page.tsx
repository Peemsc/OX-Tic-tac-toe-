"use client";

import { useCallback, useEffect } from "react";
import { Board } from "@/components/game/board";
import { Score } from "@/components/game/score";
import { AchievementCard } from "@/components/game/achievement";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { ACHIEVEMENTS } from "@/lib/game/achievements";
import { useGameStore } from "@/lib/store/useGameStore";
import { Difficulty } from "@/lib/utility/types";

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
    <div className="min-h-screen p-4 sm:p-8 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          {/* Stats Card */}
          <div className="w-full lg:w-1/3">
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-none shadow-xl">
              <h2 className="text-xl font-bold mb-4 text-white">Statistics</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-white/90">
                  <span>Total Games</span>
                  <span className="font-mono">{stats.totalGames}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/90">Wins</span>
                  <span className="font-mono text-green-400">{stats.wins}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/90">Losses</span>
                  <span className="font-mono text-red-400">{stats.losses}</span>
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
            </Card>
          </div>

          {/* Game Section */}
          <div className="w-full lg:w-2/3 space-y-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-6 text-white">
                Tic Tac Toe
              </h1>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <Select
                  className="w-48 mx-auto mb-4"
                  value={gameState.difficulty}
                  onChange={handleDifficultyChange}
                  options={difficultyOptions}
                  label="Difficulty"
                />

                <Score
                  score={gameState.score}
                  consecutiveWins={gameState.consecutiveWins}
                />
              </div>
            </div>

            <div className="flex justify-center">
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

            {gameState.isGameOver && (
              <div className="mt-8 text-center space-y-4 animate-fade-in">
                <div className="text-xl font-semibold">
                  {gameState.winner === "X" && (
                    <span className="text-green-400">You Won! 🎉</span>
                  )}
                  {gameState.winner === "O" && (
                    <span className="text-red-400">You Lost! 😢</span>
                  )}
                  {!gameState.winner && (
                    <span className="text-yellow-400">It's a Draw! 🤝</span>
                  )}
                </div>
                <Button
                  onClick={resetGame}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2"
                >
                  Play Again
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-white">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in z-50">
            <Card className="p-8 max-w-md w-full bg-slate-800/90 border-none">
              <h2 className="text-2xl font-bold mb-4 text-white">
                New Achievement{newAchievements.length > 1 ? "s" : ""} Unlocked!
                🏆
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
  );
}
