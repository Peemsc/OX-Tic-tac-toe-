interface ScoreProps {
  score: number;
  consecutiveWins: number;
}

export function Score({ score, consecutiveWins }: ScoreProps) {
  return (
    <div className="text-center mb-6">
      <div className="text-2xl font-bold mb-2">Score: {score}</div>
      <div className="text-sm text-gray-700">
        Consecutive Wins: {consecutiveWins}/3
        {consecutiveWins > 0 && (
          <span className="ml-2">
            {consecutiveWins === 2 ? "🔥 One more for bonus!" : "🔥".repeat(consecutiveWins)}
          </span>
        )}
      </div>
    </div>
  )
}