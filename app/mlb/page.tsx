'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function MLBPage() {
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
      title: "Free Agency Frenzy",
      description: "Juan Soto's record contract and other major signings reshaping the landscape.",
      image: "https://a.espncdn.com/i/teamlogos/mlb/500/nym.png"
    },
    {
      title: "Ohtani's 50-50 Legacy",
      description: "Shohei's historic 2024 season with 54 HR and 59 SB continues to amaze.",
      image: "https://a.espncdn.com/i/teamlogos/mlb/500/lad.png"
    },
    {
      title: "Spring Training Preview",
      description: "Teams preparing for 2025 season with new rosters and expectations.",
      image: "https://a.espncdn.com/i/teamlogos/mlb/500/mlb.png"
    },
    {
      title: "Hall of Fame Voting",
      description: "2025 ballot features several first-time eligible stars and borderline cases.",
      image: "https://a.espncdn.com/i/teamlogos/mlb/500/mlb.png"
    }
  ]

  const currentNews = [
    {
      title: "Soto Signs Record Deal",
      description: "Juan Soto's massive contract with the Mets sets new free agency benchmark.",
      source: "MLB Network"
    },
    {
      title: "Dodgers Repeat Champions",
      description: "Los Angeles captured 2024 World Series defeating Yankees 4-1 in thrilling series.",
      source: "ESPN MLB"
    },
    {
      title: "Rookie of the Year Impact",
      description: "Paul Skenes and other rookies made immediate impacts in their debut seasons.",
      source: "The Athletic"
    },
    {
      title: "Trade Market Heating Up",
      description: "Several stars could be available as teams prepare for 2025 season.",
      source: "MLB.com"
    }
  ]

  const divisions = {
    al: {
      east: [
        { name: "Orioles", logo: "https://a.espncdn.com/i/teamlogos/mlb/500/bal.png", city: "Baltimore" },
        { name: "Yankees", logo: "https://a.espncdn.com/i/teamlogos/mlb/500/nyy.png", city: "New York" },
        { name: "Blue Jays", logo: "https://a.espncdn.com/i/teamlogos/mlb/500/tor.png", city: "Toronto" },
        { name: "Rays", logo: "https://a.espncdn.com/i/teamlogos/mlb/500/tb.png", city: "Tampa Bay" },
        { name: "Red Sox", logo: "https://a.espncdn.com/i/teamlogos/mlb/500/bos.png", city: "Boston" }
      ],
      central: [
        { name: "Guardians", logo: "https://a.espncdn.com/i/teamlogos/mlb/500/cle.png", city: "Cleveland" },
        { name: "Royals", logo: "https://a.espncdn.com/i/teamlogos/mlb/500/kc.png", city: "Kansas City" },
        { name: "Tigers", logo: "https://a.espncdn.com/i/teamlogos/mlb/500/det.png", city: "Detroit" },
        { name: "Twins", logo: "https://a.espncdn.com/i/teamlogos/mlb/500/min.png", city: "Minnesota" },
        { name: "White Sox", logo: "https://a.espncdn.com/i/teamlogos/mlb/500/chw.png", city: "Chicago" }
      ],
      west: [
        { name: "Astros", logo: "https://a.espncdn.com/i/teamlogos/mlb/500/hou.png", city: "Houston" },
        { name: "Mariners", logo: "https://a.espncdn.com/i/teamlogos/mlb/500/sea.png", city: "Seattle" },
        { name: "Rangers", logo: "https://a.espncdn.com/i/teamlogos/mlb/500/tex.png", city: "Texas" },
        { name: "Angels", logo: "https://a.espncdn.com/i/teamlogos/mlb/500/laa.png", city: "Los Angeles" },
        { name: "Athletics", logo: "https://a.espncdn.com/i/teamlogos/mlb/500/oak.png", city: "Oakland" }
      ]
    },
    nl: {
      east: [
        { name: "Braves", logo: "https://a.espncdn.com/i/teamlogos/mlb/500/atl.png", city: "Atlanta" },
        { name: "Mets", logo: "https://a.espncdn.com/i/teamlogos/mlb/500/nym.png", city: "New York" },
        { name: "Phillies", logo: "https://a.espncdn.com/i/teamlogos/mlb/500/phi.png", city: "Philadelphia" },
        { name: "Nationals", logo: "https://a.espncdn.com/i/teamlogos/mlb/500/wsh.png", city: "Washington" },
        { name: "Marlins", logo: "https://a.espncdn.com/i/teamlogos/mlb/500/mia.png", city: "Miami" }
      ],
      central: [
        { name: "Brewers", logo: "https://a.espncdn.com/i/teamlogos/mlb/500/mil.png", city: "Milwaukee" },
        { name: "Cardinals", logo: "https://a.espncdn.com/i/teamlogos/mlb/500/stl.png", city: "St. Louis" },
        { name: "Cubs", logo: "https://a.espncdn.com/i/teamlogos/mlb/500/chc.png", city: "Chicago" },
        { name: "Reds", logo: "https://a.espncdn.com/i/teamlogos/mlb/500/cin.png", city: "Cincinnati" },
        { name: "Pirates", logo: "https://a.espncdn.com/i/teamlogos/mlb/500/pit.png", city: "Pittsburgh" }
      ],
      west: [
        { name: "Dodgers", logo: "https://a.espncdn.com/i/teamlogos/mlb/500/lad.png", city: "Los Angeles" },
        { name: "Padres", logo: "https://a.espncdn.com/i/teamlogos/mlb/500/sd.png", city: "San Diego" },
        { name: "Giants", logo: "https://a.espncdn.com/i/teamlogos/mlb/500/sf.png", city: "San Francisco" },
        { name: "Diamondbacks", logo: "https://a.espncdn.com/i/teamlogos/mlb/500/ari.png", city: "Arizona" },
        { name: "Rockies", logo: "https://a.espncdn.com/i/teamlogos/mlb/500/col.png", city: "Colorado" }
      ]
    }
  }

  const trendingPlayers = {
    up: [
      { name: "Juan Soto", team: "New York Mets", logo: "https://a.espncdn.com/i/teamlogos/mlb/500/nym.png" },
      { name: "Paul Skenes", team: "Pittsburgh Pirates", logo: "https://a.espncdn.com/i/teamlogos/mlb/500/pit.png" }
    ],
    down: [
      { name: "Mike Trout", team: "Los Angeles Angels", logo: "https://a.espncdn.com/i/teamlogos/mlb/500/laa.png" },
      { name: "Jacob deGrom", team: "Texas Rangers", logo: "https://a.espncdn.com/i/teamlogos/mlb/500/tex.png" }
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
          <h1 className="text-3xl font-bold text-gray-900 text-center">⚾ MLB Hub</h1>
          <p className="text-gray-600 text-center mt-2">Latest news, standings, and analysis</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Hot Topics */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">🔥 Hot MLB Topics</h2>
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

            {/* MLB Teams by Division */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">⚾ MLB Teams</h2>
              
              {/* American League */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-red-600 text-center">American League</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(divisions.al).map(([divisionName, teams]) => (
                    <div key={divisionName} className="bg-white rounded-lg shadow-md p-4">
                      <h4 className="text-lg font-semibold mb-3 text-center capitalize text-red-600">
                        AL {divisionName}
                      </h4>
                      <div className="space-y-2">
                        {teams.map((team, index) => (
                          <div key={index} className="flex items-center p-2 hover:bg-gray-50 rounded">
                            <img src={team.logo} alt={team.name} className="w-8 h-8 object-contain mr-3" />
                            <div>
                              <span className="font-medium">{team.city}</span>
                              <span className="text-sm text-gray-500 ml-1">{team.name}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* National League */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-600 text-center">National League</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(divisions.nl).map(([divisionName, teams]) => (
                    <div key={divisionName} className="bg-white rounded-lg shadow-md p-4">
                      <h4 className="text-lg font-semibold mb-3 text-center capitalize text-blue-600">
                        NL {divisionName}
                      </h4>
                      <div className="space-y-2">
                        {teams.map((team, index) => (
                          <div key={index} className="flex items-center p-2 hover:bg-gray-50 rounded">
                            <img src={team.logo} alt={team.name} className="w-8 h-8 object-contain mr-3" />
                            <div>
                              <span className="font-medium">{team.city}</span>
                              <span className="text-sm text-gray-500 ml-1">{team.name}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Latest News */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">📰 Latest MLB News</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentNews.map((article, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <img 
                      src="https://a.espncdn.com/i/teamlogos/mlb/500/mlb.png" 
                      alt="MLB News" 
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
                    <img src={player.logo} alt={player.team} className="w-8 h-8 object-contain mr-3" />
                    <div>
                      <div className="font-medium text-sm">{player.name}</div>
                      <div className="text-xs text-gray-500">{player.team}</div>
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
                    <img src={player.logo} alt={player.team} className="w-8 h-8 object-contain mr-3" />
                    <div>
                      <div className="font-medium text-sm">{player.name}</div>
                      <div className="text-xs text-gray-500">{player.team}</div>
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