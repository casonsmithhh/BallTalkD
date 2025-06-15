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
  const [showNewPostForm, setShowNewPostForm] = useState(false)
  const [sortBy, setSortBy] = useState<'hot' | 'new' | 'top'>('hot')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
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
          replies: post.replies.map((reply: any) => ({
            ...reply,
            createdAt: new Date(reply.createdAt)
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
            createdAt: new Date(currentDate.getTime() - 30 * 60 * 1000)
          }
        ],
        createdAt: new Date(currentDate.getTime() - 2 * 60 * 60 * 1000),
        tags: ['trade-deadline', 'analysis', 'roster-moves'],
        isHot: true,
        discussionUrl: `/discussions/${sport}/${team || 'general'}/trade-deadline-analysis`
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
        discussionUrl: `/discussions/${sport}/${team || 'general'}/game-recap-incredible-performance`
      },
      {
        id: '3',
        title: `Rookie Watch: Our Young Talent is Showing Real Promise`,
        content: `The development of our rookie class has been impressive this season. Particularly excited about how they're adapting to the professional level...`,
        author: {
          id: '4',
          username: 'FutureStars',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
          reputation: 650,
          verified: false,
          favoriteTeam: team
        },
        sport,
        team,
        category: 'general',
        upvotes: 34,
        downvotes: 2,
        replies: [],
        createdAt: new Date(currentDate.getTime() - 6 * 60 * 60 * 1000),
        tags: ['rookies', 'development', 'future'],
        isHot: false,
        discussionUrl: `/discussions/${sport}/${team || 'general'}/rookie-watch-young-talent`
      }
    ]
  }

  const handleCreatePost = async () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return

    const newPost: Post = {
      id: Date.now().toString(),
      title: newPostTitle,
      content: newPostContent,
      author: {
        id: 'current-user',
        username: 'CurrentUser',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
        reputation: 100,
        verified: false,
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
      discussionUrl: `/discussions/${sport}/${team || 'general'}/${newPostTitle.toLowerCase().replace(/\s+/g, '-')}`
    }

    setPosts([newPost, ...posts])
    setNewPostTitle('')
    setNewPostContent('')
    setShowNewPostForm(false)
  }

  const handleVote = (postId: string, voteType: 'up' | 'down') => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          upvotes: voteType === 'up' ? post.upvotes + 1 : post.upvotes,
          downvotes: voteType === 'down' ? post.downvotes + 1 : post.downvotes
        }
      }
      return post
    }))
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
                onClick={() => handleVote(selectedPost.id, 'up')}
                className="flex items-center space-x-1 text-green-600 hover:text-green-800"
              >
                <span>↑</span>
                <span>{selectedPost.upvotes}</span>
              </button>
              <button
                onClick={() => handleVote(selectedPost.id, 'down')}
                className="flex items-center space-x-1 text-red-600 hover:text-red-800"
              >
                <span>↓</span>
                <span>{selectedPost.downvotes}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="p-6">
          <p className="text-gray-800 leading-relaxed mb-4">{selectedPost.content}</p>
          <div className="flex flex-wrap gap-2">
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

        {/* Replies */}
        <div className="border-t">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Replies ({selectedPost.replies.length})
            </h3>
            <div className="space-y-4">
              {selectedPost.replies.map(reply => (
                <div key={reply.id} className="border-l-2 border-gray-200 pl-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <img
                        src={reply.author.avatar}
                        alt={reply.author.username}
                        className="w-5 h-5 rounded-full"
                      />
                      <span className="font-medium text-sm">{reply.author.username}</span>
                      {reply.author.verified && (
                        <span className="text-blue-600 text-xs">✓</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <button className="text-green-600 hover:text-green-800">
                        ↑ {reply.upvotes}
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        ↓ {reply.downvotes}
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">{reply.content}</p>
                </div>
              ))}
            </div>
          </div>
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
          <button
            onClick={() => setShowNewPostForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            + New Post
          </button>
        </div>

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
                  Post
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
                    </div>
                    <span>•</span>
                    <span>{post.replies.length} replies</span>
                    <span>•</span>
                    <span>{post.createdAt.toLocaleDateString()}</span>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Link
                      href={post.discussionUrl}
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                    >
                      Join Discussion
                    </Link>
                    <button
                      onClick={() => setSelectedPost(post)}
                      className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <div className="text-center">
                    <button
                      onClick={() => handleVote(post.id, 'up')}
                      className="block text-green-600 hover:text-green-800 font-semibold"
                    >
                      ↑ {post.upvotes}
                    </button>
                    <button
                      onClick={() => handleVote(post.id, 'down')}
                      className="block text-red-600 hover:text-red-800 font-semibold"
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