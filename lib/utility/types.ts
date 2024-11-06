// Player types
export type Player = 'X' | 'O' | null
export type Board = Player[]
export type Difficulty = 'easy' | 'medium' | 'hard'

// Game state types
export type GameState = {
  board: Board
  currentPlayer: Player
  winner: Player
  winningLine: number[] | null
  isGameOver: boolean
  consecutiveWins: number
  score: number
  difficulty: Difficulty
}

export type GameAction = 
  | { type: 'MAKE_MOVE'; position: number }
  | { type: 'RESET_GAME' }
  | { type: 'BOT_MOVE' }
  | { type: 'SET_DIFFICULTY'; difficulty: Difficulty }

// Achievement types
export type Achievement = {
  id: string
  title: string
  description: string
  condition: (stats: PlayerStats) => boolean
  icon: string
  unlockedAt?: Date
}

// Player statistics
export type PlayerStats = {
  totalGames: number
  wins: number
  losses: number
  draws: number
  highestScore: number
  currentStreak: number
  bestStreak: number
  achievements: string[]
}

// Leaderboard types
export type LeaderboardEntry = {
  userId: string
  username: string
  score: number
  wins: number
  achievements: number
}