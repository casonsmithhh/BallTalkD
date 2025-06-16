'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

interface Post {
  id: string
  title: string
  content: string
  author: {
    id: string
    username: string
    avatar: string
    reputation: number
    verified: boolean
    favoriteTeam?: string
  }
  sport: string
  team?: string
  category: 'general' | 'team-specific' | 'trade-rumors' | 'game-analysis' | 'predictions'
  upvotes: number
  downvotes: number
  replies: Reply[]
  createdAt: Date
  tags: string[]
  isHot: boolean
  discussionUrl: string
  userVote?: 'up' | 'down' | null
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
  userVote?: 'up' | 'down' | null
}

interface DiscussionForumProps {
  sport: string
  team?: string
  category?: string
}

export default function DiscussionForum({ sport, team, category }: DiscussionForumProps) {
  const [posts, setPosts] = useState<Post[]>([])
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostContent, setNewPostContent] = useState('')
  const [newReplyContent, setNewReplyContent] = useState('')
  const [showNewPostForm, setShowNewPostForm] = useState(false)
  const [sortBy, setSortBy] = useState<'hot' | 'new' | 'top'>('hot')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem('ballTalkUser')
    if (userData) {
      setCurrentUser(JSON.parse(userData))
    }
    loadDiscussions()
  }, [sport, team])

  const loadDiscussions = async () => {
    setIsLoading(true)
    try {
      // Simulate API call to load real discussions
      const response = await fetch(`/api/discussions?sport=${sport}&team=${team || ''}`)
      if (response.ok) {
        const data = await response.json()
        const discussions = data.discussions || generateSamplePosts()
        // Convert date strings back to Date objects
        const processedDiscussions = discussions.map((post: any) => ({
          ...post,
          createdAt: new Date(post.createdAt),
          userVote: null, // Initialize user vote
          replies: post.replies.map((reply: any) => ({
            ...reply,
            createdAt: new Date(reply.createdAt),
            userVote: null // Initialize user vote
          }))
        }))
        setPosts(processedDiscussions)
      } else {
        setPosts(generateSamplePosts())
      }
    } catch (error) {
      console.error('Failed to load discussions:', error)
      setPosts(generateSamplePosts())
    }
    setIsLoading(false)
  }

  const generateSamplePosts = (): Post[] => {
    const currentDate = new Date()
    return [
      {
        id: '1',
        title: `${team || sport.toUpperCase()} Trade Deadline Analysis: Who Should We Target?`,
        content: `With the trade deadline approaching, what moves do you think ${team || 'our team'} should make? I've been analyzing our roster needs and think we could use more depth at...`,
        author: {
          id: '1',
          username: 'TradeMaster2025',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
          reputation: 1250,
          verified: true,
          favoriteTeam: team
        },
        sport,
        team,
        category: 'trade-rumors',
        upvotes: 45,
        downvotes: 3,
        replies: [
          {
            id: '1',
            content: 'Great analysis! I think we definitely need to address our defensive issues before making any offensive moves.',
            author: {
              id: '2',
              username: 'DefenseFirst',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
              reputation: 890,
              verified: false
            },
            upvotes: 12,
            downvotes: 1,
            createdAt: new Date(currentDate.getTime() - 30 * 60 * 1000),
            userVote: null
          }
        ],
        createdAt: new Date(currentDate.getTime() - 2 * 60 * 60 * 1000),
        tags: ['trade-deadline', 'analysis', 'roster-moves'],
        isHot: true,
        discussionUrl: `/discussions/${sport}/${team?.toLowerCase().replace(/\s+/g, '-') || 'general'}/trade-deadline-analysis`,
        userVote: null
      },
      {
        id: '2',
        title: `Game Recap: Last Night's Performance Was Incredible!`,
        content: `What a game! The way ${team || 'the team'} executed in the final quarter was masterful. Let's break down the key plays that led to victory...`,
        author: {
          id: '3',
          username: 'GameAnalyst',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
          reputation: 2100,
          verified: true,
          favoriteTeam: team
        },
        sport,
        team,
        category: 'game-analysis',
        upvotes: 78,
        downvotes: 5,
        replies: [],
        createdAt: new Date(currentDate.getTime() - 4 * 60 * 60 * 1000),
        tags: ['game-recap', 'analysis', 'victory'],
        isHot: true,
        discussionUrl: `/discussions/${sport}/${team?.toLowerCase().replace(/\s+/g, '-') || 'general'}/game-recap-incredible-performance`,
        userVote: null
      }
    ]
  }

  const handleCreatePost = async () => {
    if (!newPostTitle.trim() || !newPostContent.trim() || !currentUser) return

    const newPost: Post = {
      id: Date.now().toString(),
      title: newPostTitle,
      content: newPostContent,
      author: {
        id: currentUser.id,
        username: currentUser.username,
        avatar: currentUser.avatar,
        reputation: currentUser.reputation || 0,
        verified: currentUser.verified || false,
        favoriteTeam: team
      },
      sport,
      team,
      category: 'general',
      upvotes: 0,
      downvotes: 0,
      replies: [],
      createdAt: new Date(),
      tags: [],
      isHot: false,
      discussionUrl: `/discussions/${sport}/${team?.toLowerCase().replace(/\s+/g, '-') || 'general'}/${newPostTitle.toLowerCase().replace(/\s+/g, '-')}`,
      userVote: null
    }

    setPosts([newPost, ...posts])
    setNewPostTitle('')
    setNewPostContent('')
    setShowNewPostForm(false)

    // Update user reputation for creating a post
    updateUserReputation(10, 'Created a new post')
  }

  const handleAddReply = () => {
    if (!newReplyContent.trim() || !selectedPost || !currentUser) return

    const reply: Reply = {
      id: Date.now().toString(),
      content: newReplyContent,
      author: {
        id: currentUser.id,
        username: currentUser.username,
        avatar: currentUser.avatar,
        reputation: currentUser.reputation || 0,
        verified: currentUser.verified || false
      },
      upvotes: 0,
      downvotes: 0,
      createdAt: new Date(),
      userVote: null
    }

    const updatedPost = {
      ...selectedPost,
      replies: [...selectedPost.replies, reply]
    }

    setSelectedPost(updatedPost)
    setPosts(posts.map(post => post.id === selectedPost.id ? updatedPost : post))
    setNewReplyContent('')

    // Update user reputation for commenting
    updateUserReputation(3, 'Added a comment')
  }

  const handleVote = (type: 'post' | 'reply', id: string, voteType: 'up' | 'down') => {
    if (!currentUser) {
      alert('Please sign in to vote!')
      return
    }

    if (type === 'post') {
      setPosts(posts.map(post => {
        if (post.id === id) {
          const currentVote = post.userVote
          let newUpvotes = post.upvotes
          let newDownvotes = post.downvotes
          let newUserVote: 'up' | 'down' | null = voteType

          // Handle vote logic
          if (currentVote === voteType) {
            // Remove vote
            if (voteType === 'up') newUpvotes--
            else newDownvotes--
            newUserVote = null
          } else if (currentVote && currentVote !== voteType) {
            // Change vote
            if (currentVote === 'up') newUpvotes--
            else newDownvotes--
            if (voteType === 'up') newUpvotes++
            else newDownvotes++
          } else {
            // New vote
            if (voteType === 'up') newUpvotes++
            else newDownvotes++
          }

          // Update post author's reputation if it's not the current user
          if (post.author.id !== currentUser.id) {
            const reputationChange = voteType === 'up' ? 5 : -2
            if (currentVote !== voteType) {
              updatePostAuthorReputation(post.author.id, reputationChange, `Received ${voteType}vote on post`)
            }
          }

          return {
            ...post,
            upvotes: newUpvotes,
            downvotes: newDownvotes,
            userVote: newUserVote
          }
        }
        return post
      }))
    } else {
      // Handle reply voting
      if (selectedPost) {
        const updatedPost = {
          ...selectedPost,
          replies: selectedPost.replies.map(reply => {
            if (reply.id === id) {
              const currentVote = reply.userVote
              let newUpvotes = reply.upvotes
              let newDownvotes = reply.downvotes
              let newUserVote: 'up' | 'down' | null = voteType

              // Handle vote logic (same as post)
              if (currentVote === voteType) {
                if (voteType === 'up') newUpvotes--
                else newDownvotes--
                newUserVote = null
              } else if (currentVote && currentVote !== voteType) {
                if (currentVote === 'up') newUpvotes--
                else newDownvotes--
                if (voteType === 'up') newUpvotes++
                else newDownvotes++
              } else {
                if (voteType === 'up') newUpvotes++
                else newDownvotes++
              }

              // Update reply author's reputation
              if (reply.author.id !== currentUser.id) {
                const reputationChange = voteType === 'up' ? 3 : -1
                if (currentVote !== voteType) {
                  updatePostAuthorReputation(reply.author.id, reputationChange, `Received ${voteType}vote on comment`)
                }
              }

              return {
                ...reply,
                upvotes: newUpvotes,
                downvotes: newDownvotes,
                userVote: newUserVote
              }
            }
            return reply
          })
        }
        setSelectedPost(updatedPost)
        setPosts(posts.map(post => post.id === selectedPost.id ? updatedPost : post))
      }
    }
  }

  const updateUserReputation = (points: number, description: string) => {
    // This would normally update the database
    // For now, we'll update localStorage
    const userData = localStorage.getItem('ballTalkUser')
    if (userData) {
      const user = JSON.parse(userData)
      user.reputation = (user.reputation || 0) + points
      localStorage.setItem('ballTalkUser', JSON.stringify(user))
      setCurrentUser(user)
    }
  }

  const updatePostAuthorReputation = (authorId: string, points: number, description: string) => {
    // This would normally update the database for the post author
    // For demo purposes, we'll just log it
    console.log(`User ${authorId} reputation changed by ${points}: ${description}`)
  }

  const filteredPosts = posts.filter(post => {
    if (filterCategory === 'all') return true
    return post.category === filterCategory
  })

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'hot':
        return (b.upvotes - b.downvotes + (b.isHot ? 100 : 0)) - (a.upvotes - a.downvotes + (a.isHot ? 100 : 0))
      case 'new':
        return b.createdAt.getTime() - a.createdAt.getTime()
      case 'top':
        return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)
      default:
        return 0
    }
  })

  if (selectedPost) {
    return (
      <div className="bg-white rounded-lg shadow-md">
        {/* Post Header */}
        <div className="p-6 border-b">
          <button
            onClick={() => setSelectedPost(null)}
            className="text-blue-600 hover:text-blue-800 mb-4 flex items-center"
          >
            ← Back to discussions
          </button>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{selectedPost.title}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <img
                    src={selectedPost.author.avatar}
                    alt={selectedPost.author.username}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="font-medium">{selectedPost.author.username}</span>
                  {selectedPost.author.verified && (
                    <span className="text-blue-600">✓</span>
                  )}
                  <span>• {selectedPost.author.reputation} rep</span>
                </div>
                <span>{selectedPost.createdAt.toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleVote('post', selectedPost.id, 'up')}
                className={`flex items-center space-x-1 px-3 py-1 rounded transition-colors ${
                  selectedPost.userVote === 'up' 
                    ? 'bg-green-100 text-green-800' 
                    : 'text-green-600 hover:text-green-800 hover:bg-green-50'
                }`}
              >
                <span>↑</span>
                <span>{selectedPost.upvotes}</span>
              </button>
              <button
                onClick={() => handleVote('post', selectedPost.id, 'down')}
                className={`flex items-center space-x-1 px-3 py-1 rounded transition-colors ${
                  selectedPost.userVote === 'down' 
                    ? 'bg-red-100 text-red-800' 
                    : 'text-red-600 hover:text-red-800 hover:bg-red-50'
                }`}
              >
                <span>↓</span>
                <span>{selectedPost.downvotes}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="p-6">
          <div className="prose max-w-none">
            {selectedPost.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-800 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2 mt-6">
            {selectedPost.tags.map(tag => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Replies Section */}
        <div className="border-t">
          <div className="p-6 border-b">
            <h2 className="text-xl font-bold">
              Replies ({selectedPost.replies.length})
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
                    value={newReplyContent}
                    onChange={(e) => setNewReplyContent(e.target.value)}
                    placeholder="Add your thoughts to the discussion..."
                    rows={3}
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="mt-2 flex justify-end">
                    <button
                      onClick={handleAddReply}
                      disabled={!newReplyContent.trim()}
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
            {selectedPost.replies.map((reply, index) => (
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
                          className={`px-2 py-1 rounded text-sm transition-colors ${
                            reply.userVote === 'up' 
                              ? 'bg-green-100 text-green-800' 
                              : 'text-green-600 hover:text-green-800 hover:bg-green-50'
                          }`}
                        >
                          ↑ {reply.upvotes}
                        </button>
                        <button
                          onClick={() => handleVote('reply', reply.id, 'down')}
                          className={`px-2 py-1 rounded text-sm transition-colors ${
                            reply.userVote === 'down' 
                              ? 'bg-red-100 text-red-800' 
                              : 'text-red-600 hover:text-red-800 hover:bg-red-50'
                          }`}
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

          {selectedPost.replies.length === 0 && (
            <div className="p-6 text-center text-gray-600">
              No replies yet. Be the first to join the discussion!
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Forum Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            💬 {team ? `${team} Discussions` : `${sport.toUpperCase()} Forum`}
          </h2>
          {currentUser && (
            <button
              onClick={() => setShowNewPostForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              + New Post
            </button>
          )}
        </div>

        {!currentUser && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">
              <Link href="/auth" className="font-medium underline">Sign in</Link> to create posts, comment, and vote on discussions.
            </p>
          </div>
        )}

        {/* Filters */}
        <div className="flex space-x-4 mb-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'hot' | 'new' | 'top')}
            className="border rounded px-3 py-1"
          >
            <option value="hot">🔥 Hot</option>
            <option value="new">🆕 New</option>
            <option value="top">⭐ Top</option>
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border rounded px-3 py-1"
          >
            <option value="all">All Categories</option>
            <option value="general">General</option>
            <option value="team-specific">Team Specific</option>
            <option value="trade-rumors">Trade Rumors</option>
            <option value="game-analysis">Game Analysis</option>
            <option value="predictions">Predictions</option>
          </select>
        </div>
      </div>

      {/* New Post Form */}
      <AnimatePresence>
        {showNewPostForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Create New Post</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Post title..."
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
              <textarea
                placeholder="What's on your mind?"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                rows={4}
                className="w-full border rounded px-3 py-2"
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleCreatePost}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Post (+10 rep)
                </button>
                <button
                  onClick={() => setShowNewPostForm(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Posts List */}
      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading discussions...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedPosts.map(post => (
            <motion.div
              key={post.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    {post.isHot && <span className="text-red-500">🔥</span>}
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {post.category}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3 line-clamp-2">{post.content}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <img
                        src={post.author.avatar}
                        alt={post.author.username}
                        className="w-5 h-5 rounded-full"
                      />
                      <span>{post.author.username}</span>
                      {post.author.verified && <span className="text-blue-600">✓</span>}
                      <span>({post.author.reputation} rep)</span>
                    </div>
                    <span>•</span>
                    <span>{post.replies.length} replies</span>
                    <span>•</span>
                    <span>{post.createdAt.toLocaleDateString()}</span>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <button
                      onClick={() => setSelectedPost(post)}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      Join Discussion
                    </button>
                    <Link
                      href={post.discussionUrl}
                      className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <div className="text-center">
                    <button
                      onClick={() => handleVote('post', post.id, 'up')}
                      className={`block px-2 py-1 rounded transition-colors ${
                        post.userVote === 'up' 
                          ? 'bg-green-100 text-green-800' 
                          : 'text-green-600 hover:text-green-800 hover:bg-green-50'
                      }`}
                    >
                      ↑ {post.upvotes}
                    </button>
                    <button
                      onClick={() => handleVote('post', post.id, 'down')}
                      className={`block px-2 py-1 rounded transition-colors ${
                        post.userVote === 'down' 
                          ? 'bg-red-100 text-red-800' 
                          : 'text-red-600 hover:text-red-800 hover:bg-red-50'
                      }`}
                    >
                      ↓ {post.downvotes}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}