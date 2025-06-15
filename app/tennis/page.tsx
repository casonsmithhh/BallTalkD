'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function TennisPage() {
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem('ballTalkUser')
    if (userData) {
      setCurrentUser(JSON.parse(userData))
    }
  }, [])

  const handleLogin = (user: any) => {
    setCurrentUser(user)
    localStorage.setItem('ballTalkUser', JSON.stringify(user))
  }

  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem('ballTalkUser')
  }

  const hotTopics = [
    {
      title: "Australian Open 2025",
      description: "First Grand Slam of the year kicks off with exciting storylines and new champions.",
      image: "https://cdn-icons-png.flaticon.com/512/53/53283.png"
    },
    {
      title: "GOAT Debate Continues",
      description: "Djokovic, Federer, and Nadal legacy discussions as new generation emerges.",
      image: "https://cdn-icons-png.flaticon.com/512/53/53283.png"
    },
    {
      title: "Rising Stars",
      description: "Young talents like Alcaraz and Swiatek leading the next generation of tennis.",
      image: "https://cdn-icons-png.flaticon.com/512/53/53283.png"
    },
    {
      title: "WTA Tour Evolution",
      description: "Women's tennis continues to showcase incredible depth and competitive balance.",
      image: "https://cdn-icons-png.flaticon.com/512/53/53283.png"
    }
  ]

  const currentNews = [
    {
      title: "Australian Open Draw Released",
      description: "First Grand Slam of 2025 features exciting first-round matchups and potential early clashes.",
      source: "Tennis.com"
    },
    {
      title: "Djokovic's Comeback Trail",
      description: "Serbian legend looks to add to his Grand Slam record in Melbourne.",
      source: "ESPN Tennis"
    },
    {
      title: "Swiatek's Dominance",
      description: "Polish star continues her reign as world No. 1 heading into new season.",
      source: "WTA Tour"
    },
    {
      title: "Next Gen Breakthrough",
      description: "Young players making their mark on the professional circuit.",
      source: "ATP Tour"
    }
  ]

  const rankings = {
    atp: [
      { name: "Novak Djokovic", country: "Serbia", points: "9855", flag: "🇷🇸" },
      { name: "Carlos Alcaraz", country: "Spain", points: "8805", flag: "🇪🇸" },
      { name: "Daniil Medvedev", country: "Russia", points: "7555", flag: "🇷🇺" },
      { name: "Jannik Sinner", country: "Italy", points: "6490", flag: "🇮🇹" },
      { name: "Andrey Rublev", country: "Russia", points: "4805", flag: "🇷🇺" },
      { name: "Stefanos Tsitsipas", country: "Greece", points: "4445", flag: "🇬🇷" },
      { name: "Alexander Zverev", country: "Germany", points: "4315", flag: "🇩🇪" },
      { name: "Holger Rune", country: "Denmark", points: "3960", flag: "🇩🇰" }
    ],
    wta: [
      { name: "Iga Swiatek", country: "Poland", points: "9665", flag: "🇵🇱" },
      { name: "Aryna Sabalenka", country: "Belarus", points: "7876", flag: "🇧🇾" },
      { name: "Coco Gauff", country: "USA", points: "6743", flag: "🇺🇸" },
      { name: "Elena Rybakina", country: "Kazakhstan", points: "5871", flag: "🇰🇿" },
      { name: "Jessica Pegula", country: "USA", points: "5205", flag: "🇺🇸" },
      { name: "Ons Jabeur", country: "Tunisia", points: "4746", flag: "🇹🇳" },
      { name: "Marketa Vondrousova", country: "Czech Republic", points: "4268", flag: "🇨🇿" },
      { name: "Karolina Muchova", country: "Czech Republic", points: "3971", flag: "🇨🇿" }
    ]
  }

  const grandSlams = [
    {
      name: "Australian Open",
      date: "January 2025",
      location: "Melbourne, Australia",
      surface: "Hard Court",
      status: "Upcoming"
    },
    {
      name: "French Open",
      date: "May-June 2025",
      location: "Paris, France",
      surface: "Clay Court",
      status: "Upcoming"
    },
    {
      name: "Wimbledon",
      date: "June-July 2025",
      location: "London, England",
      surface: "Grass Court",
      status: "Upcoming"
    },
    {
      name: "US Open",
      date: "August-September 2025",
      location: "New York, USA",
      surface: "Hard Court",
      status: "Upcoming"
    }
  ]

  const trendingPlayers = {
    up: [
      { name: "Carlos Alcaraz", tour: "ATP", flag: "🇪🇸" },
      { name: "Coco Gauff", tour: "WTA", flag: "🇺🇸" }
    ],
    down: [
      { name: "Rafael Nadal", tour: "ATP", flag: "🇪🇸" },
      { name: "Serena Williams", tour: "WTA (Retired)", flag: "🇺🇸" }
    ]
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation 
        currentUser={currentUser} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
      />
      
      <div className="bg-white py-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 text-center">🎾 Tennis Hub</h1>
          <p className="text-gray-600 text-center mt-2">Latest news, rankings, and Grand Slam updates</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Hot Topics */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">🔥 Hot Tennis Topics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hotTopics.map((topic, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-4">
                      <img src={topic.image} alt={topic.title} className="w-12 h-12 object-contain mr-4" />
                      <h3 className="text-lg font-semibold text-gray-900">{topic.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{topic.description}</p>
                    <Link href="#" className="text-orange-500 font-medium hover:text-orange-600">
                      Join Discussion →
                    </Link>
                  </div>
                ))}
              </div>
            </section>

            {/* World Rankings */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">🎾 World Rankings</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* ATP Rankings */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-4 text-blue-600 text-center">ATP Men's Rankings</h3>
                  <div className="space-y-3">
                    {rankings.atp.map((player, index) => (
                      <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <span className="text-sm font-bold text-gray-500 w-6">{index + 1}</span>
                          <span className="text-lg mx-3">{player.flag}</span>
                          <div>
                            <span className="font-medium">{player.name}</span>
                            <span className="text-sm text-gray-500 ml-1">({player.country})</span>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-gray-600">{player.points}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* WTA Rankings */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-4 text-pink-600 text-center">WTA Women's Rankings</h3>
                  <div className="space-y-3">
                    {rankings.wta.map((player, index) => (
                      <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <span className="text-sm font-bold text-gray-500 w-6">{index + 1}</span>
                          <span className="text-lg mx-3">{player.flag}</span>
                          <div>
                            <span className="font-medium">{player.name}</span>
                            <span className="text-sm text-gray-500 ml-1">({player.country})</span>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-gray-600">{player.points}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Grand Slam Calendar */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">🏆 2025 Grand Slam Calendar</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {grandSlams.map((slam, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{slam.name}</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>Date:</strong> {slam.date}</p>
                      <p><strong>Location:</strong> {slam.location}</p>
                      <p><strong>Surface:</strong> {slam.surface}</p>
                      <p><strong>Status:</strong> <span className="text-orange-500 font-medium">{slam.status}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Latest News */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">📰 Latest Tennis News</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentNews.map((article, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/53/53283.png" 
                      alt="Tennis News" 
                      className="w-full h-32 object-contain bg-gray-100"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold mb-2 text-gray-900">{article.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{article.description}</p>
                      <p className="text-xs text-orange-500 font-medium">{article.source}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-xl font-semibold mb-6 text-center text-gray-900">📈 Player Trends</h3>
              
              {/* Trending Up */}
              <div className="mb-6">
                <h4 className="text-green-600 font-semibold mb-3 flex items-center">
                  <i className="fas fa-arrow-up mr-2"></i>
                  Trending Up
                </h4>
                {trendingPlayers.up.map((player, index) => (
                  <div key={index} className="flex items-center p-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-lg mr-3">{player.flag}</span>
                    <div>
                      <div className="font-medium text-sm">{player.name}</div>
                      <div className="text-xs text-gray-500">{player.tour}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trending Down */}
              <div>
                <h4 className="text-red-600 font-semibold mb-3 flex items-center">
                  <i className="fas fa-arrow-down mr-2"></i>
                  Trending Down
                </h4>
                {trendingPlayers.down.map((player, index) => (
                  <div key={index} className="flex items-center p-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-lg mr-3">{player.flag}</span>
                    <div>
                      <div className="font-medium text-sm">{player.name}</div>
                      <div className="text-xs text-gray-500">{player.tour}</div>
                    </div>
                  </div>
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