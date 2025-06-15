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
    // In production, this would:
    // 1. Fetch from multiple sports news APIs
    // 2. Use AI to analyze and rank importance
    // 3. Filter out low-quality content
    // 4. Aggregate from social media and expert sources
    
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

  // NBA Headlines
  if (!sport || sport === 'nba') {
    headlines.push(
      {
        id: 'nba-1',
        title: 'Shai Gilgeous-Alexander Leads MVP Race as Thunder Dominate West',
        summary: 'Oklahoma City\'s superstar guard averaging 31.2 PPG while leading team to best record in Western Conference.',
        source: 'ESPN',
        publishedAt: new Date(currentDate.getTime() - 2 * 60 * 60 * 1000).toISOString(),
        sport: 'NBA',
        team: 'Oklahoma City Thunder',
        importance: 95,
        tags: ['MVP', 'Thunder', 'Shai Gilgeous-Alexander'],
        url: '/news/sga-mvp-race-thunder'
      },
      {
        id: 'nba-2',
        title: 'Trade Deadline Approaching: Which Stars Could Move?',
        summary: 'Analysis of potential blockbuster trades as February 6th deadline looms for playoff contenders.',
        source: 'The Athletic',
        publishedAt: new Date(currentDate.getTime() - 4 * 60 * 60 * 1000).toISOString(),
        sport: 'NBA',
        importance: 88,
        tags: ['Trade Deadline', 'Rumors', 'Playoffs'],
        url: '/news/nba-trade-deadline-analysis'
      }
    )
  }

  // NFL Headlines
  if (!sport || sport === 'nfl') {
    headlines.push(
      {
        id: 'nfl-1',
        title: 'Josh Allen Emerges as MVP Favorite After Bills Clinch AFC East',
        summary: 'Buffalo quarterback\'s 40 total touchdowns and clutch performances make him frontrunner for MVP award.',
        source: 'NFL Network',
        publishedAt: new Date(currentDate.getTime() - 1 * 60 * 60 * 1000).toISOString(),
        sport: 'NFL',
        team: 'Buffalo Bills',
        importance: 92,
        tags: ['MVP', 'Josh Allen', 'Bills', 'Playoffs'],
        url: '/news/josh-allen-mvp-favorite'
      },
      {
        id: 'nfl-2',
        title: 'Playoff Picture Set: Lions and Chiefs Lead Conference Championships',
        summary: 'Detroit and Kansas City secure top seeds as wild card weekend approaches with exciting matchups.',
        source: 'ESPN',
        publishedAt: new Date(currentDate.getTime() - 3 * 60 * 60 * 1000).toISOString(),
        sport: 'NFL',
        importance: 90,
        tags: ['Playoffs', 'Lions', 'Chiefs', 'Wild Card'],
        url: '/news/nfl-playoff-picture-set'
      }
    )
  }

  // MLB Headlines
  if (!sport || sport === 'mlb') {
    headlines.push(
      {
        id: 'mlb-1',
        title: 'Juan Soto\'s Record Contract Reshapes Free Agency Market',
        summary: 'Mets\' massive signing of superstar outfielder sets new benchmark for player salaries.',
        source: 'MLB Network',
        publishedAt: new Date(currentDate.getTime() - 6 * 60 * 60 * 1000).toISOString(),
        sport: 'MLB',
        team: 'New York Mets',
        importance: 94,
        tags: ['Free Agency', 'Juan Soto', 'Mets', 'Contract'],
        url: '/news/juan-soto-record-contract'
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