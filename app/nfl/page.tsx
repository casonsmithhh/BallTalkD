'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'

export default function NFLPage() {
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
      title: "Defense wins championships?",
      description: "Bengals Edge Rushers Trey Hendricks and Shemar Stewart are still holding out for financial reasons",
      image: "https://images2.minutemediacdn.com/image/upload/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/shape/cover/sport/https-3A-2F-2Fstripehype-com-2Fwp-content-2Fuploads-2Fimagn-images-2F2018-2F08-2F17809877-850x560-ec054703e5b25bd5382ea85f1cf29338.jpg",
      discussionUrl: "/discussions/nfl/general/bengals-edge-extension"
    },
    {
      title: "Time to Tank?",
      description: "Steelers sign 42 year old Aaron Rodgers, is it time for them to finally invest in an elite QB talent?",
      image: "https://images2.minutemediacdn.com/image/upload/c_crop,w_3000,h_1687,x_0,y_0/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/ImagnImages/mmsport/all_steelers/01jxr2det3bsqxg752re.jpg",
      discussionUrl: "/discussions/nfl/general/aaron-rodgers-steelers-sign"
    },
    {
      title: "Sophmore Slump or Jump?",
      description: "How will Caleb Williams, Jayden Daniels, Bo Nix, Micheal Penix, and Drake Maye show up after impressive rookie seasons.",
      image: "https://a3.espncdn.com/combiner/i?img=%2Fphoto%2F2025%2F0610%2Fr1503427_2_1296x729_16%2D9.jpg",
      discussionUrl: "/discussions/nfl/general/soph-qb-development"
    },
    {
      title: "B2B?",
      description: "Do the Eagles have the best shot to win it next year, after their dominant Super Bowl run?",
      image: "https://cdn.abcotvs.com/dip/images/15887147_020925-wpvi-eagles-trophy-img.jpg?w=1600",
      discussionUrl: "/discussions/nfl/general/eagles-b2b"
    }
  ]

  const currentNews = [
    {
      title: "Chiefs Begin Quest for Fourth Straight Title",
      description: "Kansas City opens training camp next month as heavy favorites to make NFL history.",
      source: "ESPN NFL",
      publishedAt: "2 hours ago"
    },
    {
      title: "Caleb Williams Impresses in Bears OTAs",
      description: "First overall pick showing command of offense and strong arm in organized team activities.",
      source: "NFL Network",
      publishedAt: "4 hours ago"
    },
    {
      title: "Bills Sign Josh Allen to Record Extension",
      description: "Buffalo quarterback becomes highest-paid player in NFL history with massive deal.",
      source: "The Athletic",
      publishedAt: "6 hours ago"
    },
    {
      title: "Lions Maintain Championship Expectations",
      description: "Detroit looking to build on successful 2024 season with strong roster additions.",
      source: "Pro Football Focus",
      publishedAt: "8 hours ago"
    }
  ]

  const divisions = {
    afc: {
      east: [
        { name: "Bills", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/buf.png", teamUrl: "/team/nfl/buffalo-bills" },
        { name: "Dolphins", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/mia.png", teamUrl: "/team/nfl/miami-dolphins" },
        { name: "Jets", logo: "/images/nfl-logos/jets_logo.png", teamUrl: "/team/nfl/new-york-jets" },
        { name: "Patriots", logo: "/images/nfl-logos/patriots_logo.png", teamUrl: "/team/nfl/new-england-patriots" }
      ],
      north: [
        { name: "Ravens", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/bal.png", teamUrl: "/team/nfl/baltimore-ravens" },
        { name: "Steelers", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/pit.png", teamUrl: "/team/nfl/pittsburgh-steelers" },
        { name: "Bengals", logo: "/images/nfl-logos/bengals1_logo.png", teamUrl: "/team/nfl/cincinnati-bengals" },
        { name: "Browns", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/cle.png", teamUrl: "/team/nfl/cleveland-browns" }
      ],
      south: [
        { name: "Texans", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/hou.png", teamUrl: "/team/nfl/houston-texans" },
        { name: "Colts", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/ind.png", teamUrl: "/team/nfl/indianapolis-colts" },
        { name: "Jaguars", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/jax.png", teamUrl: "/team/nfl/jacksonville-jaguars" },
        { name: "Titans", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/ten.png", teamUrl: "/team/nfl/tennessee-titans" }
      ],
      west: [
        { name: "Chiefs", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/kc.png", teamUrl: "/team/nfl/kansas-city-chiefs" },
        { name: "Chargers", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/lac.png", teamUrl: "/team/nfl/los-angeles-chargers" },
        { name: "Broncos", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/den.png", teamUrl: "/team/nfl/denver-broncos" },
        { name: "Raiders", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/lv.png", teamUrl: "/team/nfl/las-vegas-raiders" }
      ]
    },
    nfc: {
      east: [
        { name: "Eagles", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/phi.png", teamUrl: "/team/nfl/philadelphia-eagles" },
        { name: "Commanders", logo: "/images/nfl-logos/commanders_logo.png", teamUrl: "/team/nfl/washington-commanders" },
        { name: "Cowboys", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/dal.png", teamUrl: "/team/nfl/dallas-cowboys" },
        { name: "Giants", logo: "/images/nfl-logos/giants_logo.png", teamUrl: "/team/nfl/new-york-giants" }
      ],
      north: [
        { name: "Lions", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/det.png", teamUrl: "/team/nfl/detroit-lions" },
        { name: "Vikings", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/min.png", teamUrl: "/team/nfl/minnesota-vikings" },
        { name: "Packers", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/gb.png", teamUrl: "/team/nfl/green-bay-packers" },
        { name: "Bears", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/chi.png", teamUrl: "/team/nfl/chicago-bears" }
      ],
      south: [
        { name: "Buccaneers", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/tb.png", teamUrl: "/team/nfl/tampa-bay-buccaneers" },
        { name: "Falcons", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/atl.png", teamUrl: "/team/nfl/atlanta-falcons" },
        { name: "Saints", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/no.png", teamUrl: "/team/nfl/new-orleans-saints" },
        { name: "Panthers", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/car.png", teamUrl: "/team/nfl/carolina-panthers" }
      ],
      west: [
        { name: "Rams", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/lar.png", teamUrl: "/team/nfl/los-angeles-rams" },
        { name: "Seahawks", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/sea.png", teamUrl: "/team/nfl/seattle-seahawks" },
        { name: "Cardinals", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/ari.png", teamUrl: "/team/nfl/arizona-cardinals" },
        { name: "49ers", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/sf.png", teamUrl: "/team/nfl/san-francisco-49ers" }
      ]
    }
  }

  const trendingPlayers = {
    up: [
      { 
        name: "Micheal Penix", 
        team: "Atlanta Falcons", 
        logo: "https://a.espncdn.com/i/teamlogos/nfl/500/atl.png",
        photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4360423.png&w=350&h=254",
        position: "QB"
      },
      { 
        name: "Justin (if man) Herbert", 
        team: "LA Chargers", 
        logo: "https://a.espncdn.com/i/teamlogos/nfl/500/lac.png",
        photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4038941.png",
        position: "QB"
      }
    ],
    down: [
      { 
        name: "Dontayvion Wicks", 
        team: "Green Bay Packers", 
        logo: "https://a.espncdn.com/i/teamlogos/nfl/500/gb.png",
        photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/4428850.png",
        position: "WR"
      },
      { 
        name: "Kirk Cousins", 
        team: "Atlanta Falcons", 
        logo: "https://a.espncdn.com/i/teamlogos/nfl/500/atl.png",
        photo: "https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/14880.png&w=350&h=254",
        position: "QB"
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation 
        currentUser={currentUser} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
      />

  
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Hot Topics */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Hot Discussions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hotTopics.map((topic, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <img 
                      src={topic.image} 
                      alt={topic.title} 
                      className="w-full h-50 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{topic.title}</h3>
                      <p className="text-gray-600 mb-4">{topic.description}</p>
                      <Link 
                        href={topic.discussionUrl}
                        className="bg-white text-black px-4 py-2 rounded hover:bg-blue-200 transition-colors inline-block"
                      >
                        Join Discussion →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Latest News */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Latest NFL News</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentNews.map((article, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <img 
                      src="https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&h=200&fit=crop" 
                      alt="NFL News" 
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold mb-2 text-gray-900">{article.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{article.description}</p>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-orange-500 font-medium">{article.source}</p>
                        <p className="text-xs text-gray-500">{article.publishedAt}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* NFL Teams */}
              <div className="bg-white rounded-lg shadow-md p-6">
                
                {/* AFC */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold mb-4 text-red-600 text-center">AFC</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(divisions.afc).map(([divisionName, teams]) => (
                      <div key={divisionName} className="space-y-2">
                        <h5 className="text-sm font-semibold text-center capitalize text-red-600">
                          {divisionName}
                        </h5>
                        <div className="space-y-1">
                          {teams.map((team, index) => (
                            <Link 
                              key={index} 
                              href={team.teamUrl}
                              className="flex items-center p-2 hover:bg-gray-50 rounded transition-colors group"
                            >
                              <img 
                                src={team.logo} 
                                alt={team.name} 
                                className="w-6 h-6 object-contain mr-2"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.src = 'https://a.espncdn.com/i/teamlogos/nfl/500/nfl.png'
                                }}
                              />
                              <span className="text-xs font-medium group-hover:text-blue-600">{team.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* NFC */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-blue-600 text-center">NFC</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(divisions.nfc).map(([divisionName, teams]) => (
                      <div key={divisionName} className="space-y-2">
                        <h5 className="text-sm font-semibold text-center capitalize text-blue-600">
                          {divisionName}
                        </h5>
                        <div className="space-y-1">
                          {teams.map((team, index) => (
                            <Link 
                              key={index} 
                              href={team.teamUrl}
                              className="flex items-center p-2 hover:bg-gray-50 rounded transition-colors group"
                            >
                              <img 
                                src={team.logo} 
                                alt={team.name} 
                                className="w-6 h-6 object-contain mr-2"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement
                                  target.src = 'https://a.espncdn.com/i/teamlogos/nfl/500/nfl.png'
                                }}
                              />
                              <span className="text-xs font-medium group-hover:text-blue-600">{team.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Player Trends */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-6 text-center text-gray-900">📈 Player Trends</h3>
                
                {/* Trending Up */}
                <div className="mb-6">
                  <h4 className="text-green-600 font-semibold mb-3 flex items-center">
                    <i className="fas fa-arrow-up mr-2"></i>
                    Trending Up
                  </h4>
                  {trendingPlayers.up.map((player, index) => (
                    <div key={index} className="flex items-center p-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 rounded">
                      <img 
                        src={player.photo} 
                        alt={player.name} 
                        className="w-12 h-12 rounded-full object-cover mr-3"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{player.name}</div>
                        <div className="text-xs text-gray-500">{player.position} • {player.team}</div>
                      </div>
                      <img 
                        src={player.logo} 
                        alt={player.team} 
                        className="w-6 h-6 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = 'https://a.espncdn.com/i/teamlogos/nfl/500/nfl.png'
                        }}
                      />
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
                    <div key={index} className="flex items-center p-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 rounded">
                      <img 
                        src={player.photo} 
                        alt={player.name} 
                        className="w-12 h-12 rounded-full object-cover mr-3"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{player.name}</div>
                        <div className="text-xs text-gray-500">{player.position} • {player.team}</div>
                      </div>
                      <img 
                        src={player.logo} 
                        alt={player.team} 
                        className="w-6 h-6 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = 'https://a.espncdn.com/i/teamlogos/nfl/500/nfl.png'
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}