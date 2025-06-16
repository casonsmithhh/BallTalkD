'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'

interface Activity {
  id: string
  type: 'post' | 'comment' | 'upvote' | 'downvote' | 'badge' | 'team_follow'
  description: string
  points: number
  timestamp: Date
  relatedContent?: string
  relatedUrl?: string
}

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  earnedAt: Date
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

export default function ProfilePage() {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    username: '',
    favoriteTeams: [] as string[]
  })
  const [activities, setActivities] = useState<Activity[]>([])
  const [badges, setBadges] = useState<Badge[]>([])
  const [showTeamSelector, setShowTeamSelector] = useState(false)
  const router = useRouter()

  const availableTeams = {
    NFL: [
      'Buffalo Bills', 'Miami Dolphins', 'New England Patriots', 'New York Jets',
      'Baltimore Ravens', 'Cincinnati Bengals', 'Cleveland Browns', 'Pittsburgh Steelers',
      'Houston Texans', 'Indianapolis Colts', 'Jacksonville Jaguars', 'Tennessee Titans',
      'Denver Broncos', 'Kansas City Chiefs', 'Las Vegas Raiders', 'Los Angeles Chargers',
      'Dallas Cowboys', 'New York Giants', 'Philadelphia Eagles', 'Washington Commanders',
      'Chicago Bears', 'Detroit Lions', 'Green Bay Packers', 'Minnesota Vikings',
      'Atlanta Falcons', 'Carolina Panthers', 'New Orleans Saints', 'Tampa Bay Buccaneers',
      'Arizona Cardinals', 'Los Angeles Rams', 'San Francisco 49ers', 'Seattle Seahawks'
    ],
    NBA: [
      'Boston Celtics', 'Brooklyn Nets', 'New York Knicks', 'Philadelphia 76ers', 'Toronto Raptors',
      'Chicago Bulls', 'Cleveland Cavaliers', 'Detroit Pistons', 'Indiana Pacers', 'Milwaukee Bucks',
      'Atlanta Hawks', 'Charlotte Hornets', 'Miami Heat', 'Orlando Magic', 'Washington Wizards',
      'Denver Nuggets', 'Minnesota Timberwolves', 'Oklahoma City Thunder', 'Portland Trail Blazers', 'Utah Jazz',
      'Golden State Warriors', 'Los Angeles Clippers', 'Los Angeles Lakers', 'Phoenix Suns', 'Sacramento Kings',
      'Dallas Mavericks', 'Houston Rockets', 'Memphis Grizzlies', 'New Orleans Pelicans', 'San Antonio Spurs'
    ],
    MLB: [
      'Baltimore Orioles', 'Boston Red Sox', 'New York Yankees', 'Tampa Bay Rays', 'Toronto Blue Jays',
      'Chicago White Sox', 'Cleveland Guardians', 'Detroit Tigers', 'Kansas City Royals', 'Minnesota Twins',
      'Houston Astros', 'Los Angeles Angels', 'Oakland Athletics', 'Seattle Mariners', 'Texas Rangers',
      'Atlanta Braves', 'Miami Marlins', 'New York Mets', 'Philadelphia Phillies', 'Washington Nationals',
      'Chicago Cubs', 'Cincinnati Reds', 'Milwaukee Brewers', 'Pittsburgh Pirates', 'St. Louis Cardinals',
      'Arizona Diamondbacks', 'Colorado Rockies', 'Los Angeles Dodgers', 'San Diego Padres', 'San Francisco Giants'
    ]
  }

  useEffect(() => {
    const userData = localStorage.getItem('ballTalkUser')
    if (userData) {
      const user = JSON.parse(userData)
      setCurrentUser(user)
      setEditForm({
        username: user.username || '',
        favoriteTeams: user.favoriteTeams || []
      })
      loadUserActivities(user.id)
      loadUserBadges(user.id)
    } else {
      router.push('/auth')
    }
    setIsLoading(false)
  }, [router])

  const loadUserActivities = (userId: string) => {
    // Simulate loading activities from API
    const mockActivities: Activity[] = [
      {
        id: '1',
        type: 'post',
        description: 'Created post "Trade Deadline Analysis"',
        points: 10,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        relatedContent: 'Trade Deadline Analysis',
        relatedUrl: '/discussions/nfl/general/trade-deadline-analysis'
      },
      {
        id: '2',
        type: 'upvote',
        description: 'Received upvote on comment about MVP race',
        points: 5,
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        relatedContent: 'MVP Race Discussion'
      },
      {
        id: '3',
        type: 'comment',
        description: 'Commented on "NFL Playoff Predictions"',
        points: 3,
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        relatedContent: 'NFL Playoff Predictions',
        relatedUrl: '/discussions/nfl/general/playoff-predictions'
      },
      {
        id: '4',
        type: 'badge',
        description: 'Earned "First Post" badge',
        points: 25,
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        relatedContent: 'First Post Badge'
      },
      {
        id: '5',
        type: 'team_follow',
        description: 'Started following Kansas City Chiefs',
        points: 0,
        timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
        relatedContent: 'Kansas City Chiefs'
      },
      {
        id: '6',
        type: 'downvote',
        description: 'Received downvote on controversial take',
        points: -2,
        timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000),
        relatedContent: 'Hot Take Discussion'
      }
    ]
    setActivities(mockActivities)
  }

  const loadUserBadges = (userId: string) => {
    const mockBadges: Badge[] = [
      {
        id: '1',
        name: 'First Post',
        description: 'Created your first post',
        icon: '📝',
        earnedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
        rarity: 'common'
      },
      {
        id: '2',
        name: 'Team Loyal',
        description: 'Followed your first team',
        icon: '🏈',
        earnedAt: new Date(Date.now() - 48 * 60 * 60 * 1000),
        rarity: 'common'
      },
      {
        id: '3',
        name: 'Conversation Starter',
        description: 'Received 10+ upvotes on a post',
        icon: '💬',
        earnedAt: new Date(Date.now() - 72 * 60 * 60 * 1000),
        rarity: 'rare'
      }
    ]
    setBadges(mockBadges)
  }

  const handleLogin = (user: any) => {
    setCurrentUser(user)
    localStorage.setItem('ballTalkUser', JSON.stringify(user))
  }

  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem('ballTalkUser')
    router.push('/')
  }

  const handleSaveProfile = () => {
    if (!editForm.username.trim()) {
      alert('Username is required!')
      return
    }

    const updatedUser = {
      ...currentUser,
      username: editForm.username,
      favoriteTeams: editForm.favoriteTeams
    }

    setCurrentUser(updatedUser)
    localStorage.setItem('ballTalkUser', JSON.stringify(updatedUser))
    setIsEditing(false)

    // Add activity for profile update
    const newActivity: Activity = {
      id: Date.now().toString(),
      type: 'team_follow',
      description: 'Updated profile and favorite teams',
      points: 0,
      timestamp: new Date()
    }
    setActivities([newActivity, ...activities])
  }

  const handleTeamToggle = (team: string) => {
    const isSelected = editForm.favoriteTeams.includes(team)
    if (isSelected) {
      setEditForm({
        ...editForm,
        favoriteTeams: editForm.favoriteTeams.filter(t => t !== team)
      })
    } else {
      if (editForm.favoriteTeams.length < 5) { // Limit to 5 teams
        setEditForm({
          ...editForm,
          favoriteTeams: [...editForm.favoriteTeams, team]
        })
      } else {
        alert('You can only follow up to 5 teams!')
      }
    }
  }

  const calculateTotalReputation = () => {
    return activities.reduce((total, activity) => total + activity.points, 0)
  }

  const getReputationLevel = (reputation: number) => {
    if (reputation >= 1000) return { name: 'Sports Legend', color: 'text-purple-600', bg: 'bg-purple-100' }
    if (reputation >= 500) return { name: 'Expert Analyst', color: 'text-blue-600', bg: 'bg-blue-100' }
    if (reputation >= 200) return { name: 'Rising Star', color: 'text-green-600', bg: 'bg-green-100' }
    if (reputation >= 50) return { name: 'Active Fan', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    return { name: 'Rookie Fan', color: 'text-gray-600', bg: 'bg-gray-100' }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'post': return '📝'
      case 'comment': return '💬'
      case 'upvote': return '👍'
      case 'downvote': return '👎'
      case 'badge': return '🏅'
      case 'team_follow': return '⭐'
      default: return '📊'
    }
  }

  const getActivityColor = (points: number) => {
    if (points > 0) return 'text-green-600'
    if (points < 0) return 'text-red-600'
    return 'text-gray-600'
  }

  const getBadgeRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-purple-500 bg-purple-50'
      case 'epic': return 'border-orange-500 bg-orange-50'
      case 'rare': return 'border-blue-500 bg-blue-50'
      default: return 'border-gray-300 bg-gray-50'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navigation 
          currentUser={currentUser} 
          onLogin={handleLogin} 
          onLogout={handleLogout} 
        />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!currentUser) {
    return null
  }

  const totalReputation = calculateTotalReputation()
  const reputationLevel = getReputationLevel(totalReputation)

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation 
        currentUser={currentUser} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
      />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="text-center mb-6">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.username}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.username}
                    onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                    className="text-2xl font-bold text-center w-full border rounded px-2 py-1"
                    placeholder="Enter username"
                  />
                ) : (
                  <h1 className="text-2xl font-bold text-gray-900">{currentUser.username}</h1>
                )}
                <p className="text-gray-600">{currentUser.email}</p>
                
                <div className="mt-4">
                  <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${reputationLevel.bg} ${reputationLevel.color}`}>
                    {reputationLevel.name}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mt-2">
                    {totalReputation} Reputation
                  </div>
                </div>
              </div>

              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={handleSaveProfile}
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* Favorite Teams */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Favorite Teams</h3>
                {isEditing && (
                  <button
                    onClick={() => setShowTeamSelector(!showTeamSelector)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    {showTeamSelector ? 'Hide' : 'Edit'}
                  </button>
                )}
              </div>
              
              {editForm.favoriteTeams.length > 0 ? (
                <div className="space-y-2">
                  {editForm.favoriteTeams.map(team => (
                    <div key={team} className="flex items-center justify-between">
                      <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                        {team}
                      </span>
                      {isEditing && (
                        <button
                          onClick={() => handleTeamToggle(team)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No favorite teams selected</p>
              )}

              {isEditing && showTeamSelector && (
                <div className="mt-4 border-t pt-4">
                  <p className="text-sm text-gray-600 mb-3">Select up to 5 teams:</p>
                  {Object.entries(availableTeams).map(([sport, teams]) => (
                    <div key={sport} className="mb-4">
                      <h4 className="font-medium text-sm text-gray-700 mb-2">{sport}</h4>
                      <div className="grid grid-cols-1 gap-1 max-h-32 overflow-y-auto">
                        {teams.map(team => (
                          <button
                            key={team}
                            onClick={() => handleTeamToggle(team)}
                            className={`text-left text-xs px-2 py-1 rounded transition-colors ${
                              editForm.favoriteTeams.includes(team)
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                          >
                            {team}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Badges */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Badges ({badges.length})</h3>
              <div className="grid grid-cols-2 gap-3">
                {badges.map(badge => (
                  <div
                    key={badge.id}
                    className={`p-3 rounded-lg border-2 ${getBadgeRarityColor(badge.rarity)} text-center`}
                  >
                    <div className="text-2xl mb-1">{badge.icon}</div>
                    <div className="font-medium text-xs">{badge.name}</div>
                    <div className="text-xs text-gray-600 mt-1">{badge.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Stats Overview */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Activity Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {activities.filter(a => a.type === 'post').length}
                  </div>
                  <div className="text-sm text-gray-600">Posts</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {activities.filter(a => a.type === 'comment').length}
                  </div>
                  <div className="text-sm text-gray-600">Comments</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">
                    {activities.filter(a => a.type === 'upvote').length}
                  </div>
                  <div className="text-sm text-gray-600">Upvotes Received</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{badges.length}</div>
                  <div className="text-sm text-gray-600">Badges Earned</div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{activity.description}</div>
                      <div className="text-sm text-gray-600">
                        {activity.timestamp.toLocaleDateString()} at {activity.timestamp.toLocaleTimeString()}
                      </div>
                      {activity.relatedUrl && (
                        <a
                          href={activity.relatedUrl}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          View →
                        </a>
                      )}
                    </div>
                    <div className={`font-semibold ${getActivityColor(activity.points)}`}>
                      {activity.points > 0 ? '+' : ''}{activity.points} rep
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}