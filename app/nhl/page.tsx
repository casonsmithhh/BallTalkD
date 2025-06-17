'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function NHLPage() {
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
      title: "Ovechkin's Record Chase",
      description: "Alex Ovechkin sits at 853 goals, just 41 away from Gretzky's all-time record of 894.",
      image: "https://a.espncdn.com/i/teamlogos/nhl/500/wsh.png"
    },
    {
      title: "Panthers Defending Cup",
      description: "Florida looks to repeat as Stanley Cup champions after historic 2024 victory.",
      image: "https://a.espncdn.com/i/teamlogos/nhl/500/fla.png"
    },
    {
      title: "Trade Deadline Buzz",
      description: "March 7th deadline approaching with several contenders looking to make moves.",
      image: "https://a.espncdn.com/i/teamlogos/nhl/500/nhl.png"
    },
    {
      title: "McDavid's Dominance",
      description: "Connor McDavid continues to lead the league in scoring despite Oilers' struggles.",
      image: "https://a.espncdn.com/i/teamlogos/nhl/500/edm.png"
    }
  ]

  const currentNews = [
    {
      title: "Ovechkin Injury Update",
      description: "Capitals captain dealing with lower-body injury but expected to return soon.",
      source: "ESPN NHL"
    },
    {
      title: "Panthers Cup Defense",
      description: "Florida showing championship mettle in their quest to repeat as Stanley Cup winners.",
      source: "NHL Network"
    },
    {
      title: "Trade Market Heating Up",
      description: "Several star players could be available as March deadline approaches.",
      source: "The Athletic"
    },
    {
      title: "Rookie Standouts",
      description: "2024 draft class making immediate impacts across the league.",
      source: "Sportsnet"
    }
  ]

  const divisions = {
    eastern: {
      atlantic: [
        { name: "Panthers", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/fla.png", record: "32-18-4", city: "Florida", teamUrl: "/team/nhl/florida-panthers" },
        { name: "Devils", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/njd.png", record: "30-17-6", city: "New Jersey", teamUrl: "/team/nhl/new-jersey-devils" },
        { name: "Maple Leafs", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/tor.png", record: "28-19-5", city: "Toronto", teamUrl: "/team/nhl/toronto-maple-leafs" },
        { name: "Bruins", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/bos.png", record: "26-20-6", city: "Boston", teamUrl: "/team/nhl/boston-bruins" },
        { name: "Red Wings", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/det.png", record: "28-18-6", city: "Detroit", teamUrl: "/team/nhl/detroit-red-wings" },
        { name: "Lightning", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/tb.png", record: "25-21-6", city: "Tampa Bay", teamUrl: "/team/nhl/tampa-bay-lightning" },
        { name: "Sabres", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/buf.png", record: "24-22-6", city: "Buffalo", teamUrl: "/team/nhl/buffalo-sabres" },
        { name: "Senators", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/ott.png", record: "23-23-6", city: "Ottawa", teamUrl: "/team/nhl/ottawa-senators" },
        { name: "Canadiens", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/mtl.png", record: "21-23-8", city: "Montreal", teamUrl: "/team/nhl/montreal-canadiens" }
      ],
      metropolitan: [
        { name: "Rangers", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/nyr.png", record: "29-18-5", city: "New York", teamUrl: "/team/nhl/new-york-rangers" },
        { name: "Hurricanes", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/car.png", record: "27-19-6", city: "Carolina", teamUrl: "/team/nhl/carolina-hurricanes" },
        { name: "Capitals", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/wsh.png", record: "28-18-6", city: "Washington", teamUrl: "/team/nhl/washington-capitals" },
        { name: "Flyers", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/phi.png", record: "26-19-7", city: "Philadelphia", teamUrl: "/team/nhl/philadelphia-flyers" },
        { name: "Islanders", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/nyi.png", record: "24-18-10", city: "New York", teamUrl: "/team/nhl/new-york-islanders" },
        { name: "Penguins", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/pit.png", record: "23-23-6", city: "Pittsburgh", teamUrl: "/team/nhl/pittsburgh-penguins" },
        { name: "Blue Jackets", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/cbj.png", record: "19-26-7", city: "Columbus", teamUrl: "/team/nhl/columbus-blue-jackets" }
      ]
    },
    western: {
      central: [
        { name: "Jets", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/wpg.png", record: "35-14-3", city: "Winnipeg", teamUrl: "/team/nhl/winnipeg-jets" },
        { name: "Wild", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/min.png", record: "31-17-4", city: "Minnesota", teamUrl: "/team/nhl/minnesota-wild" },
        { name: "Stars", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/dal.png", record: "30-18-4", city: "Dallas", teamUrl: "/team/nhl/dallas-stars" },
        { name: "Avalanche", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/col.png", record: "29-19-4", city: "Colorado", teamUrl: "/team/nhl/colorado-avalanche" },
        { name: "Predators", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/nsh.png", record: "27-19-6", city: "Nashville", teamUrl: "/team/nhl/nashville-predators" },
        { name: "Blues", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/stl.png", record: "25-21-6", city: "St. Louis", teamUrl: "/team/nhl/st-louis-blues" },
        { name: "Coyotes", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/ari.png", record: "22-24-6", city: "Utah", teamUrl: "/team/nhl/arizona-coyotes" },
        { name: "Blackhawks", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/chi.png", record: "16-30-6", city: "Chicago", teamUrl: "/team/nhl/chicago-blackhawks" }
      ],
      pacific: [
        { name: "Canucks", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/van.png", record: "33-13-6", city: "Vancouver", teamUrl: "/team/nhl/vancouver-canucks" },
        { name: "Golden Knights", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/vgk.png", record: "27-19-6", city: "Vegas", teamUrl: "/team/nhl/vegas-golden-knights" },
        { name: "Kings", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/lak.png", record: "28-18-6", city: "Los Angeles", teamUrl: "/team/nhl/los-angeles-kings" },
        { name: "Kraken", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/sea.png", record: "22-24-6", city: "Seattle", teamUrl: "/team/nhl/seattle-kraken" },
        { name: "Flames", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/cgy.png", record: "26-20-6", city: "Calgary", teamUrl: "/team/nhl/calgary-flames" },
        { name: "Oilers", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/edm.png", record: "25-21-6", city: "Edmonton", teamUrl: "/team/nhl/edmonton-oilers" },
        { name: "Ducks", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/ana.png", record: "18-28-6", city: "Anaheim", teamUrl: "/team/nhl/anaheim-ducks" },
        { name: "Sharks", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/sj.png", record: "14-32-6", city: "San Jose", teamUrl: "/team/nhl/san-jose-sharks" }
      ]
    }
  }

  const trendingPlayers = {
    up: [
      { name: "Connor Hellebuyck", team: "Winnipeg Jets", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/wpg.png" },
      { name: "Kirill Kaprizov", team: "Minnesota Wild", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/min.png" }
    ],
    down: [
      { name: "Alex Ovechkin", team: "Washington Capitals", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/wsh.png" },
      { name: "Sidney Crosby", team: "Pittsburgh Penguins", logo: "https://a.espncdn.com/i/teamlogos/nhl/500/pit.png" }
    ]
  }

  // All NHL teams for the team buttons section
  const allTeams = [
    ...divisions.eastern.atlantic,
    ...divisions.eastern.metropolitan,
    ...divisions.western.central,
    ...divisions.western.pacific
  ].sort((a, b) => a.city.localeCompare(b.city));

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation 
        currentUser={currentUser} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
      />
      
      <div className="bg-white py-6 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 text-center">🏒 NHL Hub</h1>
          <p className="text-gray-600 text-center mt-2">Latest news, standings, and analysis</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Hot Topics */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">🔥 Hot NHL Topics</h2>
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

            {/* NHL Standings */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center">🏒 NHL Standings</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Eastern Conference */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-4 text-blue-600 text-center">Eastern Conference</h3>
                  <div className="space-y-3">
                    {divisions.eastern.atlantic.map((team, index) => (
                      <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <span className="text-sm font-bold text-gray-500 w-6">{index + 1}</span>
                          <img src={team.logo} alt={team.name} className="w-8 h-8 object-contain mx-3" />
                          <div>
                            <span className="font-medium">{team.city}</span>
                            <span className="text-sm text-gray-500 ml-1">{team.name}</span>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-gray-600">{team.record}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Western Conference */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-4 text-red-600 text-center">Western Conference</h3>
                  <div className="space-y-3">
                    {divisions.western.central.map((team, index) => (
                      <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <span className="text-sm font-bold text-gray-500 w-6">{index + 1}</span>
                          <img src={team.logo} alt={team.name} className="w-8 h-8 object-contain mx-3" />
                          <div>
                            <span className="font-medium">{team.city}</span>
                            <span className="text-sm text-gray-500 ml-1">{team.name}</span>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-gray-600">{team.record}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Latest News */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">📰 Latest NHL News</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentNews.map((article, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <img 
                      src="https://a.espncdn.com/i/teamlogos/nhl/500/nhl.png" 
                      alt="NHL News" 
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
            {/* NHL Teams Sidebar */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6 sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
              <h3 className="text-lg font-semibold mb-4 text-center text-gray-900">NHL Team Fan Hubs</h3>
              
              {/* Eastern Conference */}
              <div className="mb-4">
                <h4 className="text-md font-semibold mb-2 text-blue-600 border-b pb-1">Eastern Conference</h4>
                
                {/* Atlantic Division */}
                <div className="mb-3">
                  <h5 className="text-sm font-medium text-blue-500 mb-1">Atlantic Division</h5>
                  <div className="grid grid-cols-3 gap-2">
                    {divisions.eastern.atlantic.map((team) => (
                      <Link 
                        key={team.name}
                        href={team.teamUrl}
                        className="flex flex-col items-center p-1 hover:bg-gray-50 rounded transition-colors"
                      >
                        <img 
                          src={team.logo} 
                          alt={`${team.city} ${team.name}`} 
                          className="w-8 h-8 object-contain mb-1"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://a.espncdn.com/i/teamlogos/nhl/500/nhl.png';
                          }}
                        />
                        <span className="text-xs text-center">{team.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Metropolitan Division */}
                <div>
                  <h5 className="text-sm font-medium text-blue-500 mb-1">Metropolitan Division</h5>
                  <div className="grid grid-cols-3 gap-2">
                    {divisions.eastern.metropolitan.map((team) => (
                      <Link 
                        key={team.name}
                        href={team.teamUrl}
                        className="flex flex-col items-center p-1 hover:bg-gray-50 rounded transition-colors"
                      >
                        <img 
                          src={team.logo} 
                          alt={`${team.city} ${team.name}`} 
                          className="w-8 h-8 object-contain mb-1"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://a.espncdn.com/i/teamlogos/nhl/500/nhl.png';
                          }}
                        />
                        <span className="text-xs text-center">{team.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Western Conference */}
              <div>
                <h4 className="text-md font-semibold mb-2 text-red-600 border-b pb-1">Western Conference</h4>
                
                {/* Central Division */}
                <div className="mb-3">
                  <h5 className="text-sm font-medium text-red-500 mb-1">Central Division</h5>
                  <div className="grid grid-cols-3 gap-2">
                    {divisions.western.central.map((team) => (
                      <Link 
                        key={team.name}
                        href={team.teamUrl}
                        className="flex flex-col items-center p-1 hover:bg-gray-50 rounded transition-colors"
                      >
                        <img 
                          src={team.logo} 
                          alt={`${team.city} ${team.name}`} 
                          className="w-8 h-8 object-contain mb-1"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://a.espncdn.com/i/teamlogos/nhl/500/nhl.png';
                          }}
                        />
                        <span className="text-xs text-center">{team.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Pacific Division */}
                <div>
                  <h5 className="text-sm font-medium text-red-500 mb-1">Pacific Division</h5>
                  <div className="grid grid-cols-3 gap-2">
                    {divisions.western.pacific.map((team) => (
                      <Link 
                        key={team.name}
                        href={team.teamUrl}
                        className="flex flex-col items-center p-1 hover:bg-gray-50 rounded transition-colors"
                      >
                        <img 
                          src={team.logo} 
                          alt={`${team.city} ${team.name}`} 
                          className="w-8 h-8 object-contain mb-1"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = 'https://a.espncdn.com/i/teamlogos/nhl/500/nhl.png';
                          }}
                        />
                        <span className="text-xs text-center">{team.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Player Trends */}
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-[calc(100vh-18rem)]">
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