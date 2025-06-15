'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Quiz {
  id: string
  title: string
  sport: string
  team?: string
  questions: Question[]
  difficulty: 'easy' | 'medium' | 'hard'
  timeLimit: number
}

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  points: number
}

interface QuizComponentProps {
  sport: string
  team?: string
}

export default function QuizComponent({ sport, team }: QuizComponentProps) {
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  // Sample quiz data - replace with API calls
  const sampleQuizzes: Quiz[] = [
    {
      id: '1',
      title: `${sport.toUpperCase()} Knowledge Challenge`,
      sport,
      team,
      difficulty: 'medium',
      timeLimit: 30,
      questions: [
        {
          id: '1',
          question: `Who won the ${sport.toUpperCase()} championship in 2024?`,
          options: ['Team A', 'Team B', 'Team C', 'Team D'],
          correctAnswer: 0,
          explanation: 'Team A won after a thrilling championship game.',
          points: 10
        },
        {
          id: '2',
          question: `What is the most important stat in ${sport}?`,
          options: ['Points', 'Assists', 'Defense', 'All of the above'],
          correctAnswer: 3,
          explanation: 'All stats contribute to team success in different ways.',
          points: 15
        }
      ]
    }
  ]

  useEffect(() => {
    if (currentQuiz && timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && currentQuiz && !quizCompleted) {
      handleNextQuestion()
    }
  }, [timeLeft, currentQuiz, quizCompleted])

  const startQuiz = (quiz: Quiz) => {
    setCurrentQuiz(quiz)
    setCurrentQuestion(0)
    setScore(0)
    setTimeLeft(quiz.timeLimit)
    setQuizCompleted(false)
    setShowExplanation(false)
    setSelectedAnswer(null)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(answerIndex)
    setShowExplanation(true)
    
    if (answerIndex === currentQuiz!.questions[currentQuestion].correctAnswer) {
      setScore(score + currentQuiz!.questions[currentQuestion].points)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < currentQuiz!.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
      setTimeLeft(currentQuiz!.timeLimit)
    } else {
      setQuizCompleted(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuiz(null)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setQuizCompleted(false)
    setShowExplanation(false)
  }

  if (!currentQuiz) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold mb-4">🧠 {sport.toUpperCase()} Quizzes</h3>
        <div className="space-y-4">
          {sampleQuizzes.map((quiz) => (
            <motion.div
              key={quiz.id}
              className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
              whileHover={{ scale: 1.02 }}
              onClick={() => startQuiz(quiz)}
            >
              <h4 className="font-semibold">{quiz.title}</h4>
              <p className="text-sm text-gray-600">
                {quiz.questions.length} questions • {quiz.difficulty} • {quiz.timeLimit}s per question
              </p>
              <div className="mt-2">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {quiz.sport.toUpperCase()}
                </span>
                {quiz.team && (
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded ml-2">
                    {quiz.team}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    )
  }

  if (quizCompleted) {
    const totalPoints = currentQuiz.questions.reduce((sum, q) => sum + q.points, 0)
    const percentage = Math.round((score / totalPoints) * 100)
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-md p-6 text-center"
      >
        <h3 className="text-2xl font-bold mb-4">🎉 Quiz Complete!</h3>
        <div className="text-4xl font-bold text-blue-600 mb-2">{score}/{totalPoints}</div>
        <div className="text-lg text-gray-600 mb-4">{percentage}% Correct</div>
        
        <div className="mb-6">
          {percentage >= 80 && (
            <div className="text-green-600 font-semibold">🏆 Excellent! You're a true fan!</div>
          )}
          {percentage >= 60 && percentage < 80 && (
            <div className="text-yellow-600 font-semibold">👍 Good job! Keep learning!</div>
          )}
          {percentage < 60 && (
            <div className="text-red-600 font-semibold">📚 Keep studying! You'll get it next time!</div>
          )}
        </div>

        <div className="space-x-4">
          <button
            onClick={() => startQuiz(currentQuiz)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retake Quiz
          </button>
          <button
            onClick={resetQuiz}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Back to Quizzes
          </button>
        </div>
      </motion.div>
    )
  }

  const question = currentQuiz.questions[currentQuestion]

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      {/* Quiz Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold">{currentQuiz.title}</h3>
          <p className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {currentQuiz.questions.length}
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{timeLeft}s</div>
          <div className="text-sm text-gray-600">Score: {score}</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / currentQuiz.questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-4">{question.question}</h4>
        <div className="space-y-3">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              className={`w-full p-3 text-left rounded-lg border transition-all ${
                selectedAnswer === null
                  ? 'hover:bg-gray-50 border-gray-300'
                  : selectedAnswer === index
                  ? index === question.correctAnswer
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : 'bg-red-100 border-red-500 text-red-800'
                  : index === question.correctAnswer
                  ? 'bg-green-100 border-green-500 text-green-800'
                  : 'bg-gray-100 border-gray-300'
              }`}
              onClick={() => handleAnswerSelect(index)}
              disabled={selectedAnswer !== null}
              whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
            >
              <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
              {option}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-blue-50 rounded-lg"
          >
            <h5 className="font-semibold mb-2">Explanation:</h5>
            <p className="text-sm">{question.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next Button */}
      {showExplanation && (
        <div className="text-center">
          <button
            onClick={handleNextQuestion}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {currentQuestion < currentQuiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        </div>
      )}
    </motion.div>
  )
}