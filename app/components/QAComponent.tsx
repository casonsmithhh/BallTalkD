'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Question {
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
  team?: string
  category: 'rules' | 'stats' | 'history' | 'strategy' | 'players' | 'general'
  upvotes: number
  downvotes: number
  answers: Answer[]
  createdAt: Date
  tags: string[]
  bounty?: number
  solved: boolean
}

interface Answer {
  id: string
  content: string
  author: {
    id: string
    username: string
    avatar: string
    reputation: number
    verified: boolean
    expertise?: string[]
  }
  upvotes: number
  downvotes: number
  isAccepted: boolean
  createdAt: Date
  sources?: string[]
}

interface QAComponentProps {
  sport: string
  team?: string
}

export default function QAComponent({ sport, team }: QAComponentProps) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
  const [newQuestionTitle, setNewQuestionTitle] = useState('')
  const [newQuestionContent, setNewQuestionContent] = useState('')
  const [newAnswerContent, setNewAnswerContent] = useState('')
  const [showNewQuestionForm, setShowNewQuestionForm] = useState(false)
  const [sortBy, setSortBy] = useState<'newest' | 'votes' | 'unanswered'>('newest')
  const [filterCategory, setFilterCategory] = useState<string>('all')

  // Sample data - replace with API calls
  const sampleQuestions: Question[] = [
    {
      id: '1',
      title: `What's the most important stat for evaluating ${sport} players?`,
      content: `I've been following ${sport} for years, but I'm curious about what advanced stats really matter when evaluating player performance. Traditional stats seem limited...`,
      author: {
        id: '1',
        username: 'StatsNerd',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=StatsNerd',
        reputation: 1500,
        verified: false
      },
      sport,
      team,
      category: 'stats',
      upvotes: 23,
      downvotes: 2,
      answers: [
        {
          id: '1',
          content: 'It really depends on the position and context. For offensive players, efficiency metrics like PER or advanced rate stats are crucial. But you also need to consider defensive impact...',
          author: {
            id: '2',
            username: 'AnalyticsExpert',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AnalyticsExpert',
            reputation: 3200,
            verified: true,
            expertise: ['analytics', 'statistics']
          },
          upvotes: 15,
          downvotes: 1,
          isAccepted: true,
          createdAt: new Date('2025-01-15T11:00:00'),
          sources: ['ESPN Analytics', 'Sports Reference']
        }
      ],
      createdAt: new Date('2025-01-15T10:00:00'),
      tags: ['statistics', 'player-evaluation', 'analytics'],
      solved: true
    },
    {
      id: '2',
      title: `Historical question: Greatest ${sport} comeback of all time?`,
      content: 'What do you think was the most incredible comeback in the history of this sport? Looking for games where teams overcame seemingly impossible odds...',
      author: {
        id: '3',
        username: 'HistoryBuff',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HistoryBuff',
        reputation: 890,
        verified: false
      },
      sport,
      team,
      category: 'history',
      upvotes: 45,
      downvotes: 3,
      answers: [],
      createdAt: new Date('2025-01-15T09:00:00'),
      tags: ['history', 'comebacks', 'memorable-games'],
      bounty: 50,
      solved: false
    }
  ]

  useEffect(() => {
    setQuestions(sampleQuestions)
  }, [sport, team])

  const handleCreateQuestion = () => {
    if (!newQuestionTitle.trim() || !newQuestionContent.trim()) return

    const newQuestion: Question = {
      id: Date.now().toString(),
      title: newQuestionTitle,
      content: newQuestionContent,
      author: {
        id: 'current-user',
        username: 'CurrentUser',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser',
        reputation: 100,
        verified: false
      },
      sport,
      team,
      category: 'general',
      upvotes: 0,
      downvotes: 0,
      answers: [],
      createdAt: new Date(),
      tags: [],
      solved: false
    }

    setQuestions([newQuestion, ...questions])
    setNewQuestionTitle('')
    setNewQuestionContent('')
    setShowNewQuestionForm(false)
  }

  const handleCreateAnswer = () => {
    if (!newAnswerContent.trim() || !selectedQuestion) return

    const newAnswer: Answer = {
      id: Date.now().toString(),
      content: newAnswerContent,
      author: {
        id: 'current-user',
        username: 'CurrentUser',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser',
        reputation: 100,
        verified: false
      },
      upvotes: 0,
      downvotes: 0,
      isAccepted: false,
      createdAt: new Date()
    }

    const updatedQuestion = {
      ...selectedQuestion,
      answers: [...selectedQuestion.answers, newAnswer]
    }

    setSelectedQuestion(updatedQuestion)
    setQuestions(questions.map(q => q.id === selectedQuestion.id ? updatedQuestion : q))
    setNewAnswerContent('')
  }

  const handleVoteQuestion = (questionId: string, voteType: 'up' | 'down') => {
    setQuestions(questions.map(question => {
      if (question.id === questionId) {
        return {
          ...question,
          upvotes: voteType === 'up' ? question.upvotes + 1 : question.upvotes,
          downvotes: voteType === 'down' ? question.downvotes + 1 : question.downvotes
        }
      }
      return question
    }))
  }

  const handleAcceptAnswer = (answerId: string) => {
    if (!selectedQuestion) return

    const updatedQuestion = {
      ...selectedQuestion,
      answers: selectedQuestion.answers.map(answer => ({
        ...answer,
        isAccepted: answer.id === answerId
      })),
      solved: true
    }

    setSelectedQuestion(updatedQuestion)
    setQuestions(questions.map(q => q.id === selectedQuestion.id ? updatedQuestion : q))
  }

  const filteredQuestions = questions.filter(question => {
    if (filterCategory === 'all') return true
    return question.category === filterCategory
  })

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return b.createdAt.getTime() - a.createdAt.getTime()
      case 'votes':
        return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes)
      case 'unanswered':
        return a.answers.length - b.answers.length
      default:
        return 0
    }
  })

  if (selectedQuestion) {
    return (
      <div className="bg-white rounded-lg shadow-md">
        {/* Question Header */}
        <div className="p-6 border-b">
          <button
            onClick={() => setSelectedQuestion(null)}
            className="text-blue-600 hover:text-blue-800 mb-4 flex items-center"
          >
            ← Back to questions
          </button>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h2 className="text-2xl font-bold">{selectedQuestion.title}</h2>
                {selectedQuestion.solved && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    ✓ Solved
                  </span>
                )}
                {selectedQuestion.bounty && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                    💰 {selectedQuestion.bounty} rep
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <img
                    src={selectedQuestion.author.avatar}
                    alt={selectedQuestion.author.username}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="font-medium">{selectedQuestion.author.username}</span>
                  {selectedQuestion.author.verified && (
                    <span className="text-blue-600">✓</span>
                  )}
                  <span>• {selectedQuestion.author.reputation} rep</span>
                </div>
                <span>{selectedQuestion.createdAt.toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleVoteQuestion(selectedQuestion.id, 'up')}
                className="flex items-center space-x-1 text-green-600 hover:text-green-800"
              >
                <span>↑</span>
                <span>{selectedQuestion.upvotes}</span>
              </button>
              <button
                onClick={() => handleVoteQuestion(selectedQuestion.id, 'down')}
                className="flex items-center space-x-1 text-red-600 hover:text-red-800"
              >
                <span>↓</span>
                <span>{selectedQuestion.downvotes}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Question Content */}
        <div className="p-6">
          <p className="text-gray-800 leading-relaxed mb-4">{selectedQuestion.content}</p>
          <div className="flex flex-wrap gap-2">
            {selectedQuestion.tags.map(tag => (
              <span
                key={tag}
                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Answers */}
        <div className="border-t">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Answers ({selectedQuestion.answers.length})
            </h3>
            <div className="space-y-6">
              {selectedQuestion.answers.map(answer => (
                <div
                  key={answer.id}
                  className={`border rounded-lg p-4 ${
                    answer.isAccepted ? 'border-green-500 bg-green-50' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <img
                        src={answer.author.avatar}
                        alt={answer.author.username}
                        className="w-6 h-6 rounded-full"
                      />
                      <span className="font-medium">{answer.author.username}</span>
                      {answer.author.verified && (
                        <span className="text-blue-600">✓</span>
                      )}
                      <span className="text-sm text-gray-600">
                        {answer.author.reputation} rep
                      </span>
                      {answer.author.expertise && (
                        <div className="flex space-x-1">
                          {answer.author.expertise.map(skill => (
                            <span
                              key={skill}
                              className="bg-purple-100 text-purple-800 text-xs px-1 py-0.5 rounded"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {answer.isAccepted && (
                        <span className="text-green-600 font-semibold">✓ Accepted</span>
                      )}
                      {!selectedQuestion.solved && (
                        <button
                          onClick={() => handleAcceptAnswer(answer.id)}
                          className="text-green-600 hover:text-green-800 text-sm"
                        >
                          Accept
                        </button>
                      )}
                      <div className="flex items-center space-x-1">
                        <button className="text-green-600 hover:text-green-800">
                          ↑ {answer.upvotes}
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          ↓ {answer.downvotes}
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">{answer.content}</p>
                  {answer.sources && (
                    <div className="text-sm text-gray-600">
                      <strong>Sources:</strong> {answer.sources.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Add Answer Form */}
            <div className="mt-6 border-t pt-6">
              <h4 className="font-semibold mb-3">Your Answer</h4>
              <textarea
                placeholder="Share your knowledge..."
                value={newAnswerContent}
                onChange={(e) => setNewAnswerContent(e.target.value)}
                rows={4}
                className="w-full border rounded px-3 py-2 mb-3"
              />
              <button
                onClick={handleCreateAnswer}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Post Answer
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Q&A Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            ❓ {team ? `${team} Q&A` : `${sport.toUpperCase()} Questions & Answers`}
          </h2>
          <button
            onClick={() => setShowNewQuestionForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Ask Question
          </button>
        </div>

        {/* Filters */}
        <div className="flex space-x-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'newest' | 'votes' | 'unanswered')}
            className="border rounded px-3 py-1"
          >
            <option value="newest">🆕 Newest</option>
            <option value="votes">⭐ Most Voted</option>
            <option value="unanswered">❓ Unanswered</option>
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border rounded px-3 py-1"
          >
            <option value="all">All Categories</option>
            <option value="rules">Rules</option>
            <option value="stats">Statistics</option>
            <option value="history">History</option>
            <option value="strategy">Strategy</option>
            <option value="players">Players</option>
            <option value="general">General</option>
          </select>
        </div>
      </div>

      {/* New Question Form */}
      <AnimatePresence>
        {showNewQuestionForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Ask a Question</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="What's your question?"
                value={newQuestionTitle}
                onChange={(e) => setNewQuestionTitle(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
              <textarea
                placeholder="Provide more details about your question..."
                value={newQuestionContent}
                onChange={(e) => setNewQuestionContent(e.target.value)}
                rows={4}
                className="w-full border rounded px-3 py-2"
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleCreateQuestion}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Ask Question
                </button>
                <button
                  onClick={() => setShowNewQuestionForm(false)}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Questions List */}
      <div className="space-y-4">
        {sortedQuestions.map(question => (
          <motion.div
            key={question.id}
            className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedQuestion(question)}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-semibold">{question.title}</h3>
                  {question.solved && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      ✓ Solved
                    </span>
                  )}
                  {question.bounty && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                      💰 {question.bounty}
                    </span>
                  )}
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {question.category}
                  </span>
                </div>
                <p className="text-gray-600 mb-3 line-clamp-2">{question.content}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <img
                      src={question.author.avatar}
                      alt={question.author.username}
                      className="w-5 h-5 rounded-full"
                    />
                    <span>{question.author.username}</span>
                    {question.author.verified && <span className="text-blue-600">✓</span>}
                  </div>
                  <span>•</span>
                  <span>{question.answers.length} answers</span>
                  <span>•</span>
                  <span>{question.createdAt.toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <div className="text-center">
                  <div className="text-green-600 font-semibold">↑ {question.upvotes}</div>
                  <div className="text-red-600 font-semibold">↓ {question.downvotes}</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}