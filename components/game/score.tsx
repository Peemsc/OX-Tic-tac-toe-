interface ScoreProps {
  score: number;
  consecutiveWins: number;
}

export function Score({ score, consecutiveWins }: ScoreProps) {
  return (
    <div className="text-center mb-4">
      <div className="text-2xl font-bold">Score: {score}</div>
      <div className="text-sm">Consecutive Wins: {consecutiveWins}/3</div>
    </div>
  );
}
