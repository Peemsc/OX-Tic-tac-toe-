import { Achievement } from '@/lib/utility/types'
import { Card } from '../ui/card'
import { cn } from '@/lib/utility/utils'

interface AchievementProps {
  achievement: Achievement
  unlocked: boolean
}

export function AchievementCard({ achievement, unlocked }: AchievementProps) {
  return (
    <Card className={cn(
      "relative",
      !unlocked && "opacity-50"
    )}>
      <div className="flex items-center space-x-4 p-4">
        <div className="text-4xl">{achievement.icon}</div>
        <div>
          <h3 className="font-bold">{achievement.title}</h3>
          <p className="text-sm text-gray-600">{achievement.description}</p>
        </div>
        {unlocked && (
          <div className="absolute top-2 right-2 text-green-500">
            ✓
          </div>
        )}
      </div>
    </Card>
  )
}