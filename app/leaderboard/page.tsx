import { Card } from '@/components/ui/card'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/auth'
import { cn } from '@/lib/utility/utils'

// Mock data - in real app, fetch from database
const MOCK_LEADERBOARD = [
  { userId: '1', username: 'Player 1', score: 100, wins: 10, achievements: 5 },
  { userId: '2', username: 'Player 2', score: 80, wins: 8, achievements: 4 },
  { userId: '3', username: 'Player 3', score: 60, wins: 6, achievements: 3 },
]

export default async function LeaderboardPage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Leaderboard</h1>
      
      <div className="max-w-2xl mx-auto space-y-4">
        {MOCK_LEADERBOARD.map((entry, index) => (
          <Card key={entry.userId} className={cn(
            "flex items-center justify-between p-4",
            session?.user?.email === entry.userId && "border-blue-500"
          )}>
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold">
                {index + 1}
              </div>
              <div>
                <div className="font-bold">{entry.username}</div>
                <div className="text-sm text-gray-600">
                  Wins: {entry.wins} | Achievements: {entry.achievements}
                </div>
              </div>
            </div>
            <div className="text-2xl font-bold">
              {entry.score}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}