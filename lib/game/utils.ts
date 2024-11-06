import { Board, Player, GameState } from '../utility/types'

export const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
]

export function checkWinner(board: Board): { winner: Player; line: number[] | null } {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] }
    }
  }
  return { winner: null, line: null }
}

export function isBoardFull(board: Board): boolean {
  return board.every((cell) => cell !== null)
}

export function getInitialGameState(): GameState {
  return {
    board: Array(9).fill(null),
    currentPlayer: 'X' as Player,
    winner: null as Player,
    winningLine: null as number[] | null,
    isGameOver: false,
    consecutiveWins: 0,
    score: 0,
    difficulty: 'medium'
  }
}