import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getBotMove } from '@/lib/game/bot'
import { checkWinner, getInitialGameState, isBoardFull } from '@/lib/game/utils'
import { checkAchievements } from '@/lib/game/achievements'
import type { GameState, PlayerStats, Achievement, Difficulty } from '@/lib/utility/types'

interface GameStore {
  gameState: GameState
  stats: PlayerStats
  newAchievements: Achievement[]
  makeMove: (position: number) => void
  botMove: () => void
  resetGame: () => void
  setDifficulty: (difficulty: Difficulty) => void  
  clearNewAchievements: () => void
}
enum Player {
  X = 'X',
  O = 'O',
}
export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      gameState: {
        ...getInitialGameState(),
        difficulty: 'medium' as Difficulty  
      },
      stats: {
        totalGames: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        highestScore: 0,
        currentStreak: 0,
        bestStreak: 0,
        achievements: []
      },
      newAchievements: [],

      makeMove: (position) => {
        const { gameState } = get()
        if (gameState.board[position] || gameState.isGameOver) return

        const newBoard = [...gameState.board]
        newBoard[position] = gameState.currentPlayer

        const { winner, line } = checkWinner(newBoard)
        const isGameOver = winner !== null || isBoardFull(newBoard)

        let consecutiveWins = gameState.consecutiveWins
        let score = gameState.score

        if (winner === 'X') {
          consecutiveWins += 1
          score += 1
          if (consecutiveWins === 3) {
            score += 1
            consecutiveWins = 0
          }
        } else if (winner === 'O') {
          consecutiveWins = 0
          score -= 1
        }

        const newGameState = {
          ...gameState,
          board: newBoard,
          currentPlayer: gameState.currentPlayer === Player.X ? Player.O : Player.X,
          winner,
          winningLine: line,
          isGameOver,
          consecutiveWins,
          score,
        }

        if (isGameOver) {
          const { stats } = get()
          const newStats = {
            ...stats,
            totalGames: stats.totalGames + 1,
            wins: winner === 'X' ? stats.wins + 1 : stats.wins,
            losses: winner === 'O' ? stats.losses + 1 : stats.losses,
            draws: !winner ? stats.draws + 1 : stats.draws,
            highestScore: Math.max(stats.highestScore, score),
            currentStreak: winner === 'X' ? stats.currentStreak + 1 : 0,
            bestStreak: winner === 'X' 
              ? Math.max(stats.bestStreak, stats.currentStreak + 1)
              : stats.bestStreak
          }

          const achievements = checkAchievements(newStats)
          if (achievements.length > 0) {
            newStats.achievements = [
              ...stats.achievements,
              ...achievements.map(a => a.id)
            ]
            set({ newAchievements: achievements })
          }

          set({ stats: newStats })
        }

        set({ gameState: newGameState })
      },

      botMove: () => {
        const { gameState } = get();
        const position = getBotMove(gameState.board, gameState.difficulty);
        get().makeMove(position);
      },

      resetGame: () => set((state) => ({
        gameState: {
          ...getInitialGameState(),
          score: state.gameState.score,
          consecutiveWins: state.gameState.consecutiveWins,
          difficulty: state.gameState.difficulty as Difficulty
        }
      })),

      setDifficulty: (difficulty: Difficulty) => set((state) => ({
        gameState: {
          ...state.gameState,
          difficulty
        }
      })),

      clearNewAchievements: () => set({ newAchievements: [] })
    }),
    {
      name: 'game-storage'
    }
  )
)