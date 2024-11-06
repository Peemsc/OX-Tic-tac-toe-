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
  setDifficulty: (difficulty: Difficulty) => void  // เปลี่ยนเป็น Difficulty type
  clearNewAchievements: () => void
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      gameState: {
        ...getInitialGameState(),
        difficulty: 'medium' as Difficulty  // ระบุ type ให้ชัดเจน
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
        // ... โค้ดเดิม
      },

      botMove: () => {
        // ... โค้ดเดิม
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