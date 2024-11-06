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
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-start mb-8">
          <div className="w-1/3">
            <Card className="p-4">
              <h2 className="text-xl font-bold mb-4">Statistics</h2>
              <div className="space-y-2">
                <div>Total Games: {stats.totalGames}</div>
                <div>Wins: {stats.wins}</div>
                <div>Losses: {stats.losses}</div>
                <div>Draws: {stats.draws}</div>
                <div>Best Streak: {stats.bestStreak}</div>
                <div>Highest Score: {stats.highestScore}</div>
              </div>
            </Card>
          </div>

          <div className="w-2/3 pl-8">
            <div className="text-center mb-4">
              <h1 className="text-4xl font-bold mb-4">Tic Tac Toe</h1>

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

            <Board
              board={gameState.board}
              winningLine={gameState.winningLine}
              onSquareClick={handleSquareClick}
              disabled={gameState.currentPlayer === "O" || gameState.isGameOver}
            />

            {gameState.isGameOver && (
              <div className="mt-8 text-center space-y-4">
                <div className="text-xl">
                  {gameState.winner
                    ? `Winner: ${gameState.winner}`
                    : "It's a draw!"}
                </div>
                <Button onClick={resetGame}>Play Again</Button>
              </div>
            )}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <Card className="p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">
                New Achievement{newAchievements.length > 1 ? "s" : ""} Unlocked!
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
              <Button className="mt-4 w-full" onClick={clearNewAchievements}>
                Continue
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
