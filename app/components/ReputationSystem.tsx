'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface UserReputation {
  userId: string
  username: string
  avatar: string
  totalReputation: number
  level: string
  badges: Badge[]
  expertise: string[]
  contributions: {
    posts: number
    answers: number
    correctAnswers: number
    helpfulVotes: number
  }
  recentActivity: Activity[]
}

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  earnedAt: Date
}

interface Activity {
  id: string
  type: 'post' | 'answer' | 'vote' | 'badge'
  description: string
  points: number
  timestamp: Date
}

interface ReputationSystemProps {
  userId: string
  sport?: string
  team?: string
}

export default function ReputationSystem({ userId, sport, team }: ReputationSystemProps) {
  const [userRep, setUserRep] = useState<UserReputation | null>(null)
  const [leaderboard, setLeaderboard] = useState<UserReputation[]>([])
  const [selectedTab, setSelectedTab] = useState<'profile' | 'leaderboard' | 'badges'>('profile')

  // Sample data - replace with API calls
  const sampleUserRep: UserReputation = {
    userId: 'current-user',
    username: 'SportsFanatic',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SportsFanatic',
    totalReputation: 2450,
    level: 'Expert Analyst',
    badges: [
      {
        id: '1',
        name: 'First Post',
        description: 'Made your first post',
        icon: '📝',
        rarity: 'common',
        earnedAt: new Date('2025-01-01')
      },
      {
        id: '2',
        name: 'Helpful Answer',
        description: 'Answer received 10+ upvotes',
        icon: '🎯',
        rarity: 'rare',
        earnedAt: new Date('2025-01-10')
      },
      {
        id: '3',
        name: 'Trade Prophet',
        description: 'Correctly predicted 5 trades',
        icon: '🔮',
        rarity: 'epic',
        earnedAt: new Date('2025-01-14')
      }
    ],
    expertise: ['Trade Analysis', 'Player Stats', 'Game Strategy'],
    contributions: {
      posts: 45,
      answers: 123,
      correctAnswers: 89,
      helpfulVotes: 234
    },
    recentActivity: [
      {
        id: '1',
        type: 'answer',
        description: 'Answered question about MVP candidates',
        points: 15,
        timestamp: new Date('2025-01-15T10:00:00')
      },
      {
        id: '2',
        type: 'badge',
        description: 'Earned "Trade Prophet" badge',
        points: 50,
        timestamp: new Date('2025-01-14T15:30:00')
      },
      {
        id: '3',
        type: 'vote',
        description: 'Received upvote on trade analysis',
        points: 5,
        timestamp: new Date('2025-01-14T12:00:00')
      }
    ]
  }

  const sampleLeaderboard: UserReputation[] = [
    {
      ...sampleUserRep,
      username: 'StatsGuru',
      totalReputation: 5670,
      level: 'Legendary Analyst'
    },
    {
      ...sampleUserRep,
      username: 'TradeExpert',
      totalReputation: 4320,
      level: 'Master Predictor'
    },
    {
      ...sampleUserRep,
      username: 'GameAnalyst',
      totalReputation: 3890,
      level: 'Expert Analyst'
    },
    sampleUserRep
  ].sort((a, b) => b.totalReputation - a.totalReputation)

  useEffect(() => {
    setUserRep(sampleUserRep)
    setLeaderboard(sampleLeaderboard)
  }, [userId])

  const getReputationLevel = (reputation: number) => {
    if (reputation >= 5000) return { name: 'Legendary Analyst', color: 'text-purple-600', bg: 'bg-purple-100' }
    if (reputation >= 3000) return { name: 'Master Predictor', color: 'text-orange-600', bg: 'bg-orange-100' }
    if (reputation >= 1500) return { name: 'Expert Analyst', color: 'text-blue-600', bg: 'bg-blue-100' }
    if (reputation >= 500) return { name: 'Rising Star', color: 'text-green-600', bg: 'bg-green-100' }
    return { name: 'Rookie Fan', color: 'text-gray-600', bg: 'bg-gray-100' }
  }

  const getBadgeRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-purple-500 bg-purple-50'
      case 'epic': return 'border-orange-500 bg-orange-50'
      case 'rare': return 'border-blue-500 bg-blue-50'
      default: return 'border-gray-300 bg-gray-50'
    }
  }

  if (!userRep) {
    return <div className="bg-white rounded-lg shadow-md p-6">Loading reputation data...</div>
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Tab Navigation */}
      <div className="border-b">
        <nav className="flex space-x-8 px-6">
          {[
            { id: 'profile', label: '👤 Profile', icon: '👤' },
            { id: 'leaderboard', label: '🏆 Leaderboard', icon: '🏆' },
            { id: 'badges', label: '🏅 Badges', icon: '🏅' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                selectedTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Profile Tab */}
      {selectedTab === 'profile' && (
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={userRep.avatar}
              alt={userRep.username}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-2xl font-bold">{userRep.username}</h3>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getReputationLevel(userRep.totalReputation).bg} ${getReputationLevel(userRep.totalReputation).color}`}>
                {getReputationLevel(userRep.totalReputation).name}
              </div>
              <div className="text-lg font-semibold text-gray-700 mt-1">
                {userRep.totalReputation.toLocaleString()} reputation
              </div>
            </div>
          </div>

          {/* Expertise Tags */}
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Expertise Areas</h4>
            <div className="flex flex-wrap gap-2">
              {userRep.expertise.map(skill => (
                <span
                  key={skill}
                  className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{userRep.contributions.posts}</div>
              <div className="text-sm text-gray-600">Posts</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{userRep.contributions.answers}</div>
              <div className="text-sm text-gray-600">Answers</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{userRep.contributions.correctAnswers}</div>
              <div className="text-sm text-gray-600">Accepted</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{userRep.contributions.helpfulVotes}</div>
              <div className="text-sm text-gray-600">Helpful Votes</div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h4 className="font-semibold mb-4">Recent Activity</h4>
            <div className="space-y-3">
              {userRep.recentActivity.map(activity => (
                <motion.div
                  key={activity.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-lg">
                      {activity.type === 'post' && '📝'}
                      {activity.type === 'answer' && '💬'}
                      {activity.type === 'vote' && '👍'}
                      {activity.type === 'badge' && '🏅'}
                    </div>
                    <div>
                      <div className="font-medium">{activity.description}</div>
                      <div className="text-sm text-gray-600">
                        {activity.timestamp.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-green-600 font-semibold">
                    +{activity.points} rep
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard Tab */}
      {selectedTab === 'leaderboard' && (
        <div className="p-6">
          <h3 className="text-xl font-bold mb-6">
            🏆 {sport ? `${sport.toUpperCase()} ` : ''}Top Contributors
          </h3>
          <div className="space-y-4">
            {leaderboard.map((user, index) => (
              <motion.div
                key={user.userId}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  user.userId === userId ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-4">
                  <div className={`text-2xl font-bold ${
                    index === 0 ? 'text-yellow-500' :
                    index === 1 ? 'text-gray-400' :
                    index === 2 ? 'text-orange-600' : 'text-gray-600'
                  }`}>
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                  </div>
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-semibold">{user.username}</div>
                    <div className="text-sm text-gray-600">{user.level}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{user.totalReputation.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">reputation</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Badges Tab */}
      {selectedTab === 'badges' && (
        <div className="p-6">
          <h3 className="text-xl font-bold mb-6">🏅 Your Badges</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userRep.badges.map(badge => (
              <motion.div
                key={badge.id}
                className={`p-4 rounded-lg border-2 ${getBadgeRarityColor(badge.rarity)}`}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <h4 className="font-semibold">{badge.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{badge.description}</p>
                  <div className="text-xs text-gray-500">
                    Earned {badge.earnedAt.toLocaleDateString()}
                  </div>
                  <div className={`inline-block mt-2 px-2 py-1 rounded text-xs font-medium ${
                    badge.rarity === 'legendary' ? 'bg-purple-100 text-purple-800' :
                    badge.rarity === 'epic' ? 'bg-orange-100 text-orange-800' :
                    badge.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {badge.rarity.toUpperCase()}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}