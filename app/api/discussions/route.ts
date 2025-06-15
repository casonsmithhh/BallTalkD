import { NextRequest, NextResponse } from 'next/server'

interface Discussion {
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
  category: string
  upvotes: number
  downvotes: number
  replies: Reply[]
  createdAt: Date
  tags: string[]
  isHot: boolean
  discussionUrl: string
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
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sport = searchParams.get('sport')
  const team = searchParams.get('team')
  const limit = parseInt(searchParams.get('limit') || '10')

  try {
    const discussions = await generateCurrentDiscussions(sport, team, limit)
    
    return NextResponse.json({
      discussions,
      lastUpdated: new Date().toISOString(),
      totalCount: discussions.length
    })
  } catch (error) {
    console.error('Discussions API Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch discussions' },
      { status: 500 }
    )
  }
}

async function generateCurrentDiscussions(sport?: string | null, team?: string | null, limit: number = 10): Promise<Discussion[]> {
  const currentDate = new Date()
  const discussions: Discussion[] = []

  // NFL Discussions - Current as of June 15, 2025
  if (!sport || sport === 'nfl') {
    discussions.push(
      {
        id: 'nfl-1',
        title: `${team || 'NFL'} Offseason Moves: What's Next for 2025?`,
        content: `With the 2025 season approaching, let's discuss the key moves ${team || 'teams'} have made this offseason. Training camps are starting soon and there's still time for more signings and trades.

Key areas to discuss:
- Free agency signings and their impact
- Draft picks and rookie development
- Coaching changes and new systems
- Salary cap management
- Injury updates and player health

What moves do you think will have the biggest impact on the upcoming season?`,
        author: {
          id: '1',
          username: 'OffseasonExpert',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
          reputation: 1850,
          verified: true
        },
        sport: 'nfl',
        team: team || undefined,
        category: 'general',
        upvotes: 67,
        downvotes: 4,
        replies: [
          {
            id: '1',
            content: 'The rookie quarterback class is going to be fascinating to watch. Caleb Williams in Chicago especially has shown great promise in OTAs.',
            author: {
              id: '2',
              username: 'QBAnalyst',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
              reputation: 1200,
              verified: false
            },
            upvotes: 23,
            downvotes: 1,
            createdAt: new Date(currentDate.getTime() - 2 * 60 * 60 * 1000)
          }
        ],
        createdAt: new Date(currentDate.getTime() - 4 * 60 * 60 * 1000),
        tags: ['offseason', 'free-agency', 'draft', '2025-season'],
        isHot: true,
        discussionUrl: `/discussions/nfl/${team?.toLowerCase().replace(/\s+/g, '-') || 'general'}/offseason-moves-2025`
      },
      {
        id: 'nfl-2',
        title: `Chiefs Dynasty: Can Anyone Stop the Three-Peat Champions?`,
        content: `Kansas City just completed an unprecedented three-peat, winning their third straight Super Bowl. As we head into the 2025 season, the question everyone is asking: can anyone stop this dynasty?

Discussion points:
- What makes the Chiefs so dominant?
- Which teams pose the biggest threat?
- How do other teams need to adapt?
- Is this the greatest dynasty in NFL history?
- Can they make it four straight?

The Bills, Lions, and Ravens all look strong, but the Chiefs keep finding ways to win. What's your take?`,
        author: {
          id: '3',
          username: 'DynastyWatcher',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
          reputation: 2100,
          verified: true
        },
        sport: 'nfl',
        category: 'analysis',
        upvotes: 89,
        downvotes: 7,
        replies: [],
        createdAt: new Date(currentDate.getTime() - 6 * 60 * 60 * 1000),
        tags: ['chiefs', 'dynasty', 'super-bowl', 'mahomes'],
        isHot: true,
        discussionUrl: `/discussions/nfl/general/chiefs-dynasty-three-peat`
      },
      {
        id: 'nfl-3',
        title: `Rookie QB Watch: Williams, Daniels, and Maye Development`,
        content: `The 2024 rookie quarterback class is showing different development paths as we head into their second season. Let's break down how each is progressing:

**Caleb Williams (Bears):**
- Impressive arm strength and accuracy in OTAs
- Building chemistry with DJ Moore and Rome Odunze
- Learning new offensive system under Shane Waldron

**Jayden Daniels (Commanders):**
- Mobile playmaker showing great poise
- Dual-threat ability creating new dimensions
- Strong leadership qualities emerging

**Drake Maye (Patriots):**
- Solid fundamentals but needs more time
- Working with limited weapons
- Showing improvement in decision-making

Which rookie QB do you think will have the best 2025 season?`,
        author: {
          id: '4',
          username: 'RookieScout',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
          reputation: 950,
          verified: false
        },
        sport: 'nfl',
        category: 'players',
        upvotes: 45,
        downvotes: 3,
        replies: [],
        createdAt: new Date(currentDate.getTime() - 8 * 60 * 60 * 1000),
        tags: ['rookies', 'quarterbacks', 'development', 'bears', 'commanders', 'patriots'],
        isHot: false,
        discussionUrl: `/discussions/nfl/general/rookie-qb-development`
      }
    )
  }

  // NBA Discussions - Current as of June 15, 2025
  if (!sport || sport === 'nba') {
    discussions.push(
      {
        id: 'nba-1',
        title: `NBA Finals Game 6 Tonight: Celtics vs Nuggets Predictions`,
        content: `Tonight's Game 6 at TD Garden could decide the 2025 NBA Championship! The Celtics lead the series 3-2 and have a chance to win back-to-back titles at home.

Key storylines:
- Can Jayson Tatum close out the series with a dominant performance?
- Will Nikola Jokic's historic Finals averages be enough to force Game 7?
- How crucial will the home crowd be for Boston?
- Which role players will step up in the biggest game?

The Nuggets have shown incredible resilience all playoffs. Can they steal one on the road and force a decisive Game 7?

What are your predictions for tonight's game?`,
        author: {
          id: '5',
          username: 'FinalsExpert',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
          reputation: 1650,
          verified: true
        },
        sport: 'nba',
        team: team || undefined,
        category: 'game-analysis',
        upvotes: 134,
        downvotes: 8,
        replies: [],
        createdAt: new Date(currentDate.getTime() - 1 * 60 * 60 * 1000),
        tags: ['nba-finals', 'celtics', 'nuggets', 'game-6', 'predictions'],
        isHot: true,
        discussionUrl: `/discussions/nba/general/finals-game-6-predictions`
      }
    )
  }

  // Filter by team if specified
  let filteredDiscussions = discussions
  if (team) {
    filteredDiscussions = discussions.filter(d => 
      d.team?.toLowerCase().includes(team.toLowerCase()) ||
      d.title.toLowerCase().includes(team.toLowerCase()) ||
      d.content.toLowerCase().includes(team.toLowerCase())
    )
  }

  // Sort by importance and recency
  filteredDiscussions.sort((a, b) => {
    const hotWeight = a.isHot ? 100 : 0
    const voteWeight = (a.upvotes - a.downvotes) * 2
    const replyWeight = a.replies.length * 5
    const recencyWeight = (new Date().getTime() - a.createdAt.getTime()) / (1000 * 60 * 60) // Hours ago
    
    const aScore = hotWeight + voteWeight + replyWeight - recencyWeight
    
    const bHotWeight = b.isHot ? 100 : 0
    const bVoteWeight = (b.upvotes - b.downvotes) * 2
    const bReplyWeight = b.replies.length * 5
    const bRecencyWeight = (new Date().getTime() - b.createdAt.getTime()) / (1000 * 60 * 60)
    
    const bScore = bHotWeight + bVoteWeight + bReplyWeight - bRecencyWeight
    
    return bScore - aScore
  })

  return filteredDiscussions.slice(0, limit)
}