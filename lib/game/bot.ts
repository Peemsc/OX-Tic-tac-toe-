import { Board, Player, Difficulty } from '../utility/types'
import { checkWinner, WINNING_COMBINATIONS } from './utils'

export function getBotMove(board: Board, difficulty: Difficulty): number {
  switch (difficulty) {
    case 'easy':
      return getEasyMove(board)
    case 'medium':
      return getMediumMove(board)
    case 'hard':
      return getHardMove(board)
    default:
      return getMediumMove(board)
  }
}

function getEasyMove(board: Board): number {
  const availableMoves = board
    .map((cell, i) => cell === null ? i : -1)
    .filter(i => i !== -1)
  return availableMoves[Math.floor(Math.random() * availableMoves.length)]
}

function getMediumMove(board: Board): number {
  // 70% chance of making the best move
  if (Math.random() < 0.7) {
    const bestMove = getHardMove(board)
    if (bestMove !== -1) return bestMove
  }
  return getEasyMove(board)
}

function getHardMove(board: Board): number {
  // Try to win
  const winningMove = findWinningMove(board, 'O')
  if (winningMove !== -1) return winningMove

  // Block player from winning
  const blockingMove = findWinningMove(board, 'X')
  if (blockingMove !== -1) return blockingMove

  // Take center
  if (board[4] === null) return 4

  // Take corners
  const corners = [0, 2, 6, 8]
  const availableCorners = corners.filter(i => board[i] === null)
  if (availableCorners.length > 0) {
    return availableCorners[0]
  }

  // Take any available space
  return getEasyMove(board)
}

function findWinningMove(board: Board, player: Player): number {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      const boardCopy = [...board]
      boardCopy[i] = player
      if (checkWinner(boardCopy).winner === player) {
        return i
      }
    }
  }
  return -1
}