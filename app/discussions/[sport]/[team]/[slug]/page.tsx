'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Navigation from '../../../../components/Navigation'
import Footer from '../../../../components/Footer'
import { motion } from 'framer-motion'

interface DiscussionPost {
  id: string
  title: string
  content: string
  author: {
    id: string
    username: string
    avatar: string
    reputation: number
    verified: boolean
  }
  sport: string
  team: string
  upvotes: number
  downvotes: number
  replies: Reply[]
  createdAt: Date
  tags: string[]
}

interface Reply {
  id: string
  content: string
  author: {
    id: string
    username: string
    avatar: string
    reputation: number
    verified: boolean
  }
  upvotes: number
  downvotes: number
  createdAt: Date
  parentId?: string
}

export default function DiscussionPage() {
  const params = useParams()
  const sport = params.sport as string
  const team = params.team as string
  const slug = params.slug as string
  
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [post, setPost] = useState<DiscussionPost | null>(null)
  const [newReply, setNewReply] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem('ballTalkUser')
    if (userData) {
      setCurrentUser(JSON.parse(userData))
    }
    loadDiscussion()
  }, [sport, team, slug])

  const loadDiscussion = async () => {
    setIsLoading(true)
    try {
      // Simulate API call
      setTimeout(() => {
        setPost(generateDiscussionPost())
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Failed to load discussion:', error)
      setIsLoading(false)
    }
  }

  const generateDiscussionPost = (): DiscussionPost => {
    const titles: { [key: string]: string } = {
      'trade-deadline-analysis': `${team} Trade Deadline Analysis: Who Should We Target?`,
      'game-recap-incredible-performance': `Game Recap: Last Night's Performance Was Incredible!`,
      'rookie-watch-young-talent': `Rookie Watch: Our Young Talent is Showing Real Promise`
    }

    const contents: { [key: string]: string } = {
      'trade-deadline-analysis': `With the trade deadline fast approaching on February 6th, 2025, I've been analyzing our roster and thinking about what moves ${team} should make to improve our championship chances.

Looking at our current lineup, I think we have some clear needs:

**Defensive Improvements Needed:**
- Our defensive rating has dropped to 15th in the league
- We're allowing too many easy baskets in transition
- Need a rim protector who can also switch on picks

**Offensive Depth:**
- Bench scoring has been inconsistent 
- Could use another reliable shooter for spacing
- Need someone who can create their own shot

**Potential Trade Targets:**
Based on recent reports and team needs, here are some realistic options:

1. **Defensive Anchor:** There are rumors that a few veteran centers might be available
2. **Bench Scorer:** Several teams are looking to move expiring contracts
3. **3-Point Specialist:** Always valuable in today's game

**What We Can Offer:**
- We have some attractive young assets
- Future draft picks could be in play
- Expiring contracts for salary matching

The key is not to mortgage our future for a rental player. We need to find the right balance between improving for this year's playoff push while maintaining our long-term flexibility.

What do you all think? Are there specific players you'd like to see us target? What would you be willing to give up?`,

      'game-recap-incredible-performance': `What an absolutely incredible game last night! ${team} showed exactly why they're considered championship contenders with that dominant performance.

**Game Highlights:**

**First Half:**
- Started slow but found our rhythm in the 2nd quarter
- Defense was locked in from the start
- Ball movement was crisp - 18 assists on 22 made shots

**Third Quarter Explosion:**
- Outscored them 35-18 in the third
- That 12-0 run to start the quarter was beautiful basketball
- Everyone was contributing - true team effort

**Key Performances:**
- Our star player was phenomenal: 28 points, 8 assists, 6 rebounds
- Bench mob came through with 42 points
- Defense held them to 38% shooting

**What Impressed Me Most:**
1. **Ball Movement:** The way we moved the ball was poetry in motion
2. **Defensive Intensity:** Forced 18 turnovers and converted them into easy points
3. **Clutch Execution:** When they made their run, we had answers every time
4. **Bench Production:** Role players stepped up in big moments

**Looking Ahead:**
This is the kind of performance that can build momentum for a deep playoff run. If we can maintain this level of intensity and execution, we're going to be very dangerous come postseason time.

The chemistry is clearly there, and everyone knows their role. This team is special, and last night proved it.

What were your favorite moments from the game? Think this performance is sustainable?`,

      'rookie-watch-young-talent': `I've been closely following our rookie class this season, and I have to say, the development has been really impressive. These young guys are adapting to the professional level faster than I expected.

**Standout Performances:**

**Rookie #1:**
- Averaging 12.5 points, 4.2 rebounds in just 22 minutes per game
- Shooting 45% from the field, 38% from three
- Basketball IQ is off the charts for someone his age
- Already earning trust in clutch situations

**Rookie #2:**
- Defensive impact has been immediate
- Leading all rookies in steals per game
- Still raw offensively but showing flashes
- Work ethic is reportedly incredible

**What's Most Encouraging:**

1. **Coachability:** Both rookies are sponges for knowledge
2. **Confidence:** Not playing scared or tentative
3. **Team Chemistry:** Veterans have embraced them
4. **Improvement Curve:** Getting better every month

**Areas for Growth:**
- Decision making in late-game situations
- Consistency from game to game  
- Physical strength (normal for rookies)
- Understanding of complex defensive schemes

**Long-term Outlook:**
If these guys continue developing at this rate, we could have foundational pieces for the next decade. The front office clearly did their homework in the draft.

It's exciting to think about where they'll be in 2-3 years with more experience and physical development.

What have you noticed about their games? Any specific areas where you think they need to improve?`
    }

    return {
      id: '1',
      title: titles[slug] || `${team} Discussion`,
      content: contents[slug] || `This is a discussion about ${team} and ${sport}. Join the conversation!`,
      author: {
        id: '1',
        username: 'TradeMaster2025',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        reputation: 1250,
        verified: true
      },
      sport,
      team,
      upvotes: 45,
      downvotes: 3,
      replies: [
        {
          id: '1',
          content: 'Great analysis! I completely agree about our defensive needs. We definitely need someone who can protect the rim but also switch on defense.',
          author: {
            id: '2',
            username: 'DefenseFirst',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
            reputation: 890,
            verified: false
          },
          upvotes: 12,
          downvotes: 1,
          createdAt: new Date('2025-01-15T10:30:00')
        },
        {
          id: '2',
          content: 'I think we should be careful not to give up too much for a rental. Our young core is special and we don\'t want to mortgage the future.',
          author: {
            id: '3',
            username: 'FutureFirst',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
            reputation: 650,
            verified: false
          },
          upvotes: 8,
          downvotes: 0,
          createdAt: new Date('2025-01-15T11:15:00')
        }
      ],
      createdAt: new Date('2025-01-15T09:00:00'),
      tags: ['trade-deadline', 'analysis', 'roster-moves']
    }
  }

  const handleLogin = (user: any) => {
    setCurrentUser(user)
    localStorage.setItem('ballTalkUser', JSON.stringify(user))
  }

  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem('ballTalkUser')
  }

  const handleAddReply = () => {
    if (!newReply.trim() || !post) return

    const reply: Reply = {
      id: Date.now().toString(),
      content: newReply,
      author: {
        id: 'current-user',
        username: currentUser?.username || 'Guest',
        avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
        reputation: currentUser?.reputation || 0,
        verified: currentUser?.verified || false
      },
      upvotes: 0,
      downvotes: 0,
      createdAt: new Date()
    }

    setPost({
      ...post,
      replies: [...post.replies, reply]
    })
    setNewReply('')
  }

  const handleVote = (type: 'post' | 'reply', id: string, voteType: 'up' | 'down') => {
    if (!post) return

    if (type === 'post') {
      setPost({
        ...post,
        upvotes: voteType === 'up' ? post.upvotes + 1 : post.upvotes,
        downvotes: voteType === 'down' ? post.downvotes + 1 : post.downvotes
      })
    } else {
      setPost({
        ...post,
        replies: post.replies.map(reply => 
          reply.id === id 
            ? {
                ...reply,
                upvotes: voteType === 'up' ? reply.upvotes + 1 : reply.upvotes,
                downvotes: voteType === 'down' ? reply.downvotes + 1 : reply.downvotes
              }
            : reply
        )
      })
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
            <p className="mt-4 text-gray-600">Loading discussion...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navigation 
          currentUser={currentUser} 
          onLogin={handleLogin} 
          onLogout={handleLogout} 
        />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Discussion Not Found</h1>
            <p className="text-gray-600">The discussion you're looking for doesn't exist.</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation 
        currentUser={currentUser} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
      />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Discussion Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md mb-8"
        >
          {/* Post Header */}
          <div className="p-6 border-b">
            <div className="flex items-center space-x-2 mb-4">
              <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                {sport.toUpperCase()}
              </span>
              <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full">
                {team}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  src={post.author.avatar}
                  alt={post.author.username}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{post.author.username}</span>
                    {post.author.verified && (
                      <span className="text-blue-600">✓</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    {post.author.reputation} reputation • {post.createdAt.toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleVote('post', post.id, 'up')}
                  className="flex items-center space-x-1 text-green-600 hover:text-green-800"
                >
                  <span>↑</span>
                  <span>{post.upvotes}</span>
                </button>
                <button
                  onClick={() => handleVote('post', post.id, 'down')}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-800"
                >
                  <span>↓</span>
                  <span>{post.downvotes}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div className="p-6">
            <div className="prose max-w-none">
              {post.content.split('\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-800 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Replies Section */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">
              Replies ({post.replies.length})
            </h2>
          </div>

          {/* Reply Form */}
          {currentUser && (
            <div className="p-6 border-b bg-gray-50">
              <div className="flex space-x-4">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.username}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <textarea
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    placeholder="Add your thoughts to the discussion..."
                    rows={3}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="mt-2 flex justify-end">
                    <button
                      onClick={handleAddReply}
                      disabled={!newReply.trim()}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Replies List */}
          <div className="divide-y">
            {post.replies.map((reply, index) => (
              <motion.div
                key={reply.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6"
              >
                <div className="flex space-x-4">
                  <img
                    src={reply.author.avatar}
                    alt={reply.author.username}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{reply.author.username}</span>
                        {reply.author.verified && (
                          <span className="text-blue-600 text-sm">✓</span>
                        )}
                        <span className="text-sm text-gray-600">
                          {reply.author.reputation} rep
                        </span>
                        <span className="text-sm text-gray-600">
                          • {reply.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleVote('reply', reply.id, 'up')}
                          className="text-green-600 hover:text-green-800 text-sm"
                        >
                          ↑ {reply.upvotes}
                        </button>
                        <button
                          onClick={() => handleVote('reply', reply.id, 'down')}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          ↓ {reply.downvotes}
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-800">{reply.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {post.replies.length === 0 && (
            <div className="p-6 text-center text-gray-600">
              No replies yet. Be the first to join the discussion!
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}