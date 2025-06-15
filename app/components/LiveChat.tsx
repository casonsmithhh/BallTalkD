'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ChatMessage {
  id: string
  content: string
  author: {
    id: string
    username: string
    avatar: string
    verified: boolean
  }
  timestamp: Date
  type: 'message' | 'system' | 'reaction'
  reactions?: { [emoji: string]: string[] }
}

interface LiveChatProps {
  sport: string
  team?: string
  gameId?: string
}

export default function LiveChat({ sport, team, gameId }: LiveChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Sample messages - replace with real-time socket connection
  const sampleMessages: ChatMessage[] = [
    {
      id: '1',
      content: `Great play by ${team || 'the team'}! That was incredible!`,
      author: {
        id: '1',
        username: 'SportsFan123',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SportsFan123',
        verified: false
      },
      timestamp: new Date(Date.now() - 60000),
      type: 'message',
      reactions: { '🔥': ['user1', 'user2'], '👏': ['user3'] }
    },
    {
      id: '2',
      content: 'User SportsFan123 joined the chat',
      author: {
        id: 'system',
        username: 'System',
        avatar: '',
        verified: true
      },
      timestamp: new Date(Date.now() - 120000),
      type: 'system'
    }
  ]

  useEffect(() => {
    setMessages(sampleMessages)
    setIsConnected(true)
    setOnlineUsers(Math.floor(Math.random() * 500) + 100)

    // Simulate new messages
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newMsg: ChatMessage = {
          id: Date.now().toString(),
          content: getRandomMessage(),
          author: {
            id: `user${Math.floor(Math.random() * 1000)}`,
            username: `Fan${Math.floor(Math.random() * 1000)}`,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=Fan${Math.floor(Math.random() * 1000)}`,
            verified: Math.random() > 0.8
          },
          timestamp: new Date(),
          type: 'message'
        }
        setMessages(prev => [...prev, newMsg])
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [sport, team])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const getRandomMessage = () => {
    const messages = [
      `Let's go ${team || 'team'}!`,
      'What a play!',
      'Defense needs to step up',
      'This game is intense!',
      'Great coaching decision',
      'MVP performance right there',
      'Can\'t believe that call',
      'This is why I love this sport!'
    ]
    return messages[Math.floor(Math.random() * messages.length)]
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: ChatMessage = {
      id: Date.now().toString(),
      content: newMessage,
      author: {
        id: 'current-user',
        username: 'You',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CurrentUser',
        verified: false
      },
      timestamp: new Date(),
      type: 'message'
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  const handleReaction = (messageId: string, emoji: string) => {
    setMessages(messages.map(msg => {
      if (msg.id === messageId) {
        const reactions = { ...msg.reactions }
        if (!reactions[emoji]) {
          reactions[emoji] = []
        }
        
        const userId = 'current-user'
        if (reactions[emoji].includes(userId)) {
          reactions[emoji] = reactions[emoji].filter(id => id !== userId)
          if (reactions[emoji].length === 0) {
            delete reactions[emoji]
          }
        } else {
          reactions[emoji].push(userId)
        }
        
        return { ...msg, reactions }
      }
      return msg
    }))
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="bg-white rounded-lg shadow-md h-96 flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b bg-gray-50 rounded-t-lg">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">
            💬 Live Chat {team && `- ${team}`}
          </h3>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="text-sm text-gray-600">
              {onlineUsers.toLocaleString()} online
            </span>
          </div>
        </div>
        {gameId && (
          <div className="text-sm text-gray-600 mt-1">
            Game Chat - Live Discussion
          </div>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <AnimatePresence>
          {messages.map(message => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`${
                message.type === 'system' 
                  ? 'text-center text-gray-500 text-sm' 
                  : 'flex items-start space-x-2'
              }`}
            >
              {message.type === 'system' ? (
                <span>{message.content}</span>
              ) : (
                <>
                  <img
                    src={message.author.avatar}
                    alt={message.author.username}
                    className="w-6 h-6 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-sm">{message.author.username}</span>
                      {message.author.verified && (
                        <span className="text-blue-500 text-xs">✓</span>
                      )}
                      <span className="text-xs text-gray-500">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-800 break-words">{message.content}</p>
                    
                    {/* Reactions */}
                    {message.reactions && Object.keys(message.reactions).length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {Object.entries(message.reactions).map(([emoji, users]) => (
                          <button
                            key={emoji}
                            onClick={() => handleReaction(message.id, emoji)}
                            className={`text-xs px-2 py-1 rounded-full border ${
                              users.includes('current-user')
                                ? 'bg-blue-100 border-blue-300'
                                : 'bg-gray-100 border-gray-300'
                            } hover:bg-blue-50`}
                          >
                            {emoji} {users.length}
                          </button>
                        ))}
                      </div>
                    )}
                    
                    {/* Quick Reactions */}
                    <div className="flex space-x-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {['👍', '❤️', '😂', '🔥'].map(emoji => (
                        <button
                          key={emoji}
                          onClick={() => handleReaction(message.id, emoji)}
                          className="text-xs hover:bg-gray-100 rounded p-1"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={!isConnected}
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || !isConnected}
            className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
        <div className="text-xs text-gray-500 mt-2 text-center">
          Be respectful and follow community guidelines
        </div>
      </div>
    </div>
  )
}