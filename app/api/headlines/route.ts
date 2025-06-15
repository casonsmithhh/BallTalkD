import { NextRequest, NextResponse } from 'next/server'

interface Headline {
  id: string
  title: string
  summary: string
  source: string
  publishedAt: string
  sport: string
  team?: string
  importance: number
  tags: string[]
  url: string
  imageUrl?: string
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sport = searchParams.get('sport')
  const team = searchParams.get('team')
  const limit = parseInt(searchParams.get('limit') || '10')

  try {
    const headlines = await generateCurrentHeadlines(sport, team, limit)
    
    return NextResponse.json({
      headlines,
      lastUpdated: new Date().toISOString(),
      totalCount: headlines.length
    })
  } catch (error) {
    console.error('Headlines API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch headlines' },
      { status: 500 }
    )
  }
}

async function generateCurrentHeadlines(sport?: string | null, team?: string | null, limit: number = 10): Promise<Headline[]> {
  const currentDate = new Date()
  const headlines: Headline[] = []

  // NBA Headlines - Current Week (June 15, 2025)
  if (!sport || sport === 'nba') {
    headlines.push(
      {
        id: 'nba-1',
        title: 'NBA Finals Game 6 Tonight: Celtics Look to Close Out Nuggets at Home',
        summary: 'Boston leads series 3-2 and can capture back-to-back championships with victory at TD Garden tonight.',
        source: 'ESPN',
        publishedAt: new Date(currentDate.getTime() - 2 * 60 * 60 * 1000).toISOString(),
        sport: 'NBA',
        team: 'Boston Celtics',
        importance: 98,
        tags: ['NBA Finals', 'Celtics', 'Nuggets', 'Championship'],
        url: '/news/nba-finals-game-6-tonight',
        imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=200&fit=crop'
      },
      {
        id: 'nba-2',
        title: 'Nikola Jokic Wins Third MVP Award, Ties Larry Bird',
        summary: 'Denver center becomes ninth player in NBA history to win three MVP awards after historic triple-double season.',
        source: 'The Athletic',
        publishedAt: new Date(currentDate.getTime() - 4 * 60 * 60 * 1000).toISOString(),
        sport: 'NBA',
        team: 'Denver Nuggets',
        importance: 95,
        tags: ['MVP', 'Jokic', 'Awards', 'History'],
        url: '/news/jokic-third-mvp-award',
        imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=200&fit=crop'
      },
      {
        id: 'nba-3',
        title: 'Cooper Flagg Declares for 2025 NBA Draft, Expected #1 Pick',
        summary: 'Duke freshman phenom officially enters draft after dominant college season, projected to go first overall.',
        source: 'NBA.com',
        publishedAt: new Date(currentDate.getTime() - 6 * 60 * 60 * 1000).toISOString(),
        sport: 'NBA',
        importance: 88,
        tags: ['NBA Draft', 'Cooper Flagg', 'Duke'],
        url: '/news/cooper-flagg-declares-draft',
        imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=200&fit=crop'
      }
    )
  }

  // NFL Headlines - Current Week (June 15, 2025)
  if (!sport || sport === 'nfl') {
    headlines.push(
      {
        id: 'nfl-1',
        title: 'Caleb Williams Impresses in Bears OTAs, Ready for Starting Role',
        summary: 'First overall pick showing command of offense and strong arm in organized team activities.',
        source: 'NFL Network',
        publishedAt: new Date(currentDate.getTime() - 1 * 60 * 60 * 1000).toISOString(),
        sport: 'NFL',
        team: 'Chicago Bears',
        importance: 92,
        tags: ['Caleb Williams', 'Bears', 'Rookie', 'OTAs'],
        url: '/news/caleb-williams-bears-otas',
        imageUrl: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&h=200&fit=crop'
      },
      {
        id: 'nfl-2',
        title: 'Chiefs Begin Quest for Fourth Straight Super Bowl Title',
        summary: 'Kansas City opens training camp next month as heavy favorites to make NFL history with unprecedented four-peat.',
        source: 'ESPN',
        publishedAt: new Date(currentDate.getTime() - 3 * 60 * 60 * 1000).toISOString(),
        sport: 'NFL',
        team: 'Kansas City Chiefs',
        importance: 90,
        tags: ['Chiefs', 'Super Bowl', 'Dynasty', 'Mahomes'],
        url: '/news/chiefs-fourth-straight-title-quest',
        imageUrl: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&h=200&fit=crop'
      },
      {
        id: 'nfl-3',
        title: 'Bills Sign Josh Allen to Record Extension Through 2030',
        summary: 'Buffalo quarterback becomes highest-paid player in NFL history with 6-year, $300 million deal.',
        source: 'The Athletic',
        publishedAt: new Date(currentDate.getTime() - 5 * 60 * 60 * 1000).toISOString(),
        sport: 'NFL',
        team: 'Buffalo Bills',
        importance: 94,
        tags: ['Josh Allen', 'Bills', 'Contract', 'Record'],
        url: '/news/josh-allen-record-extension',
        imageUrl: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&h=200&fit=crop'
      }
    )
  }

  // MLB Headlines - Current Week (June 15, 2025)
  if (!sport || sport === 'mlb') {
    headlines.push(
      {
        id: 'mlb-1',
        title: 'Aaron Judge Chasing 60 Home Runs Again, Sits at 32 Before All-Star Break',
        summary: 'Yankees captain on pace for another historic season with 32 homers in first half.',
        source: 'MLB Network',
        publishedAt: new Date(currentDate.getTime() - 2 * 60 * 60 * 1000).toISOString(),
        sport: 'MLB',
        team: 'New York Yankees',
        importance: 89,
        tags: ['Aaron Judge', 'Yankees', 'Home Runs', 'All-Star'],
        url: '/news/aaron-judge-chasing-60-homers',
        imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&h=200&fit=crop'
      },
      {
        id: 'mlb-2',
        title: 'Orioles Lead AL East at All-Star Break, End Yankees Dynasty',
        summary: 'Baltimore sits atop American League East with 58-35 record, best in franchise since 1997.',
        source: 'ESPN',
        publishedAt: new Date(currentDate.getTime() - 4 * 60 * 60 * 1000).toISOString(),
        sport: 'MLB',
        team: 'Baltimore Orioles',
        importance: 87,
        tags: ['Orioles', 'AL East', 'All-Star Break'],
        url: '/news/orioles-lead-al-east-all-star',
        imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&h=200&fit=crop'
      }
    )
  }

  // Filter by team if specified
  let filteredHeadlines = headlines
  if (team) {
    filteredHeadlines = headlines.filter(h => 
      h.team?.toLowerCase().includes(team.toLowerCase()) ||
      h.title.toLowerCase().includes(team.toLowerCase()) ||
      h.summary.toLowerCase().includes(team.toLowerCase())
    )
  }

  // Sort by importance and recency
  filteredHeadlines.sort((a, b) => {
    const importanceWeight = 0.7
    const recencyWeight = 0.3
    
    const aScore = a.importance * importanceWeight + 
      (new Date(a.publishedAt).getTime() / 1000000) * recencyWeight
    const bScore = b.importance * importanceWeight + 
      (new Date(b.publishedAt).getTime() / 1000000) * recencyWeight
    
    return bScore - aScore
  })

  return filteredHeadlines.slice(0, limit)
}