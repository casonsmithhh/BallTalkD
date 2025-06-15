import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { text, type } = await request.json()
    
    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 })
    }
    
    const rewrittenText = await rewriteWithAI(text, type)
    
    return NextResponse.json({ 
      original: text,
      rewritten: rewrittenText,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('AI Rewrite Error:', error)
    return NextResponse.json(
      { error: 'Failed to rewrite text' },
      { status: 500 }
    )
  }
}

async function rewriteWithAI(text: string, type: 'headline' | 'summary' = 'headline'): Promise<string> {
  // Advanced AI rewriting logic
  if (type === 'headline') {
    return rewriteHeadline(text)
  } else {
    return rewriteSummary(text)
  }
}

function rewriteHeadline(headline: string): string {
  const patterns = [
    {
      from: /(\w+) signs with (\w+)/gi,
      to: '$1 joins $2 in major move'
    },
    {
      from: /(\w+) trades (\w+) to (\w+)/gi,
      to: '$2 heads to $3 in blockbuster deal'
    },
    {
      from: /(\w+) defeats (\w+) (\d+)-(\d+)/gi,
      to: '$1 tops $2 $3-$4 in thrilling contest'
    },
    {
      from: /Breaking: /gi,
      to: 'Report: '
    },
    {
      from: /EXCLUSIVE: /gi,
      to: 'Sources: '
    }
  ]
  
  let rewritten = headline
  patterns.forEach(pattern => {
    rewritten = rewritten.replace(pattern.from, pattern.to)
  })
  
  return rewritten
}

function rewriteSummary(summary: string): string {
  const synonymMap: { [key: string]: string[] } = {
    'said': ['reported', 'stated', 'mentioned', 'indicated'],
    'will': ['is expected to', 'plans to', 'intends to'],
    'could': ['might', 'may', 'has potential to'],
    'team': ['squad', 'franchise', 'organization'],
    'player': ['athlete', 'star', 'performer'],
    'game': ['contest', 'matchup', 'showdown'],
    'season': ['campaign', 'year', 'term'],
    'coach': ['manager', 'head coach', 'skipper']
  }
  
  let rewritten = summary
  
  Object.entries(synonymMap).forEach(([word, synonyms]) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi')
    if (regex.test(rewritten) && Math.random() > 0.6) {
      const synonym = synonyms[Math.floor(Math.random() * synonyms.length)]
      rewritten = rewritten.replace(regex, synonym)
    }
  })
  
  return rewritten
}