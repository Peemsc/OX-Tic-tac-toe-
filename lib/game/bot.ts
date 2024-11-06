import type { Board, Difficulty } from '../utility/types'

export function getBotMove(board: Board, difficulty: Difficulty = 'medium'): number {
  switch (difficulty) {
    case 'hard':
      return getBestMove(board);
    case 'medium':
      return Math.random() > 0.5 ? getBestMove(board) : getRandomMove(board);
    case 'easy':
    default:
      return getRandomMove(board);
  }
}

function getRandomMove(board: Board): number {
  const availableMoves = board
    .map((cell, index) => cell === null ? index : -1)
    .filter(index => index !== -1);
  
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}

function getBestMove(board: Board): number {
  let bestScore = -Infinity;
  let bestMove = 0;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      board[i] = 'O';
      const score = minimax(board, 0, false);
      board[i] = null;
      
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return bestMove;
}

function minimax(board: Board, depth: number, isMaximizing: boolean): number {
  const scores = {
    O: 1,
    X: -1,
    tie: 0
  };

  const winner = checkWinner(board);
  if (winner !== null) {
    return scores[winner as keyof typeof scores];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = 'O';
        const score = minimax(board, depth + 1, false);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = 'X';
        const score = minimax(board, depth + 1, true);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function checkWinner(board: Board): string | null {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  if (board.every(cell => cell !== null)) {
    return 'tie';
  }

  return null;
}