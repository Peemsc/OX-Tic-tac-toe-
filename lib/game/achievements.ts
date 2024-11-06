import { Achievement, PlayerStats } from '../utility/types'

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-win',
    title: 'First Victory',
    description: 'Win your first game',
    condition: (stats: PlayerStats) => stats.wins >= 1,
    icon: '🏆'
  },
  {
    id: 'master',
    title: 'Master Tactician',
    description: 'Win 10 games',
    condition: (stats: PlayerStats) => stats.wins >= 10,
    icon: '👑'
  },
  {
    id: 'streak-3',
    title: 'Hot Streak',
    description: 'Win 3 games in a row',
    condition: (stats: PlayerStats) => stats.currentStreak >= 3,
    icon: '🔥'
  },
  {
    id: 'perfect-score',
    title: 'Perfect Score',
    description: 'Reach a score of 10',
    condition: (stats: PlayerStats) => stats.highestScore >= 10,
    icon: '💯'
  }
]

export function checkAchievements(stats: PlayerStats): Achievement[] {
  return ACHIEVEMENTS.filter(achievement => 
    !stats.achievements.includes(achievement.id) && 
    achievement.condition(stats)
  )
}