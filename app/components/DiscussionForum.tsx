'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

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

  // Sample data - replace with API calls
  const samplePosts: Post[] = [
    {
      id: '1',
      title: `${team || sport} Trade Deadline Predictions`,
      content: 'What moves do you think the team will make before the deadline? I think we need to strengthen our defense...',
      author: {
        id: '1',
        username: 'SportsFan2024',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SportsFan2024',
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
          content: 'I agree! We definitely need more depth in the secondary.',
          author: {
            id: '2',
            username: 'DefenseFirst',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DefenseFirst',
            reputation: 890,
            verified: false
          },
          upvotes: 12,
          downvotes: 1,
          createdAt: new Date('2025-01-15T10:30:00')
        }
      ],
      createdAt: new Date('2025-01-15T09:00:00'),
      tags: ['trade-deadline', 'predictions', 'defense'],
      isHot: true
    },
    {
      id: '2',
      title: `Game Analysis: Last Night's Performance`,
      content: 'Breaking down the key plays and strategies from last night\'s game. The offensive line really stepped up...',
      author: {
        id: '3',
        username: 'GameAnalyst',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GameAnalyst',
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
      createdAt: new Date('2025-01-15T08:00:00'),
      tags: ['game-analysis', 'offense', 'strategy'],
      isHot: true
    }
  ]

  useEffect(() => {
    setPosts(samplePosts)
  }, [sport, team])

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return

    const newPost: Post = {
      id: Date.now().toString(),
      title: newPostTitle,
      content: newPostContent,
      author: {
        id: 'current-user',
        username: 'CurrentUser',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser',
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
      isHot: false
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
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
      <div className="space-y-4">
        {sortedPosts.map(post => (
          <motion.div
            key={post.id}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedPost(post)}
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
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <div className="text-center">
                  <div className="text-green-600 font-semibold">↑ {post.upvotes}</div>
                  <div className="text-red-600 font-semibold">↓ {post.downvotes}</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}