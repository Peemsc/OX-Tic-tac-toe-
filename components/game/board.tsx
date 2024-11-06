import { Board as BoardType, Player } from "@/lib/utility/types";
import { Square } from "./square";

interface BoardProps {
  player: Player;
  board: BoardType;
  winningLine: number[] | null;
  onSquareClick: (index: number) => void;
  disabled: boolean;
}

export function Board({
  board,
  winningLine,
  onSquareClick,
  disabled,
}: BoardProps) {
  const renderSquare = (index: number) => {
    const isWinning = winningLine?.includes(index) ?? false;

    return (
      <Square
        key={index}
        value={board[index]}
        onClick={() => onSquareClick(index)}
        isWinning={isWinning}
        disabled={disabled || board[index] !== null}
      />
    );
  };

  return (
    <div className="grid grid-cols-3 gap-2 max-w-[400px] mx-auto">
      {board.map((_, index) => renderSquare(index))}
    </div>
  );
}
