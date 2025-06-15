import { NextRequest, NextResponse } from 'next/server'
import { JSDOM } from 'jsdom'

interface NewsArticle {
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
    const articles = await scrapeMultipleSources(sport, team, limit)
    
    return NextResponse.json({
      articles,
      lastUpdated: new Date().toISOString(),
      totalCount: articles.length
    })
  } catch (error) {
    console.error('News scraping error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sports news' },
      { status: 500 }
    )
  }
}

async function scrapeMultipleSources(sport?: string | null, team?: string | null, limit: number = 10): Promise<NewsArticle[]> {
  const articles: NewsArticle[] = []
  
  // ESPN Scraping
  try {
    const espnArticles = await scrapeESPN(sport)
    articles.push(...espnArticles)
  } catch (error) {
    console.error('ESPN scraping failed:', error)
  }

  // The Athletic Scraping
  try {
    const athleticArticles = await scrapeTheAthletic(sport)
    articles.push(...athleticArticles)
  } catch (error) {
    console.error('The Athletic scraping failed:', error)
  }

  // Filter by team if specified
  let filteredArticles = articles
  if (team) {
    filteredArticles = articles.filter(article => 
      article.team?.toLowerCase().includes(team.toLowerCase()) ||
      article.title.toLowerCase().includes(team.toLowerCase()) ||
      article.summary.toLowerCase().includes(team.toLowerCase())
    )
  }

  // Sort by importance and recency
  filteredArticles.sort((a, b) => {
    const importanceWeight = 0.7
    const recencyWeight = 0.3
    
    const aScore = a.importance * importanceWeight + 
      (new Date(a.publishedAt).getTime() / 1000000) * recencyWeight
    const bScore = b.importance * importanceWeight + 
      (new Date(b.publishedAt).getTime() / 1000000) * recencyWeight
    
    return bScore - aScore
  })

  return filteredArticles.slice(0, limit)
}

async function scrapeESPN(sport?: string | null): Promise<NewsArticle[]> {
  const articles: NewsArticle[] = []
  
  try {
    const sportPath = sport ? `/${sport}` : ''
    const response = await fetch(`https://www.espn.com${sportPath}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })
    
    if (!response.ok) throw new Error('ESPN fetch failed')
    
    const html = await response.text()
    const dom = new JSDOM(html)
    const document = dom.window.document
    
    const newsElements = document.querySelectorAll('.contentItem__content')
    
    newsElements.forEach((element, index) => {
      const titleElement = element.querySelector('h1, h2, h3')
      const summaryElement = element.querySelector('p')
      const linkElement = element.querySelector('a')
      
      if (titleElement && summaryElement) {
        const title = titleElement.textContent?.trim() || ''
        const summary = summaryElement.textContent?.trim() || ''
        const url = linkElement?.getAttribute('href') || ''
        
        if (title && summary) {
          articles.push({
            id: `espn-${index}`,
            title: rewordHeadline(title),
            summary: rewordSummary(summary),
            source: 'ESPN',
            publishedAt: new Date().toISOString(),
            sport: sport || 'general',
            importance: calculateImportance(title, summary),
            tags: extractTags(title + ' ' + summary),
            url: url.startsWith('http') ? url : `https://espn.com${url}`,
            imageUrl: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=200&fit=crop'
          })
        }
      }
    })
  } catch (error) {
    console.error('ESPN scraping error:', error)
  }
  
  return articles
}

async function scrapeTheAthletic(sport?: string | null): Promise<NewsArticle[]> {
  const articles: NewsArticle[] = []
  
  try {
    const response = await fetch('https://theathletic.com/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    })
    
    if (!response.ok) throw new Error('The Athletic fetch failed')
    
    const html = await response.text()
    const dom = new JSDOM(html)
    const document = dom.window.document
    
    const newsElements = document.querySelectorAll('article, .story-card')
    
    newsElements.forEach((element, index) => {
      const titleElement = element.querySelector('h1, h2, h3, .headline')
      const summaryElement = element.querySelector('p, .summary, .excerpt')
      const linkElement = element.querySelector('a')
      
      if (titleElement && summaryElement) {
        const title = titleElement.textContent?.trim() || ''
        const summary = summaryElement.textContent?.trim() || ''
        const url = linkElement?.getAttribute('href') || ''
        
        if (title && summary) {
          articles.push({
            id: `athletic-${index}`,
            title: rewordHeadline(title),
            summary: rewordSummary(summary),
            source: 'The Athletic',
            publishedAt: new Date().toISOString(),
            sport: sport || 'general',
            importance: calculateImportance(title, summary),
            tags: extractTags(title + ' ' + summary),
            url: url.startsWith('http') ? url : `https://theathletic.com${url}`,
            imageUrl: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=400&h=200&fit=crop'
          })
        }
      }
    })
  } catch (error) {
    console.error('The Athletic scraping error:', error)
  }
  
  return articles
}

function rewordHeadline(original: string): string {
  // AI-powered headline rewriting
  const variations = [
    (text: string) => text.replace(/says/gi, 'reports'),
    (text: string) => text.replace(/will/gi, 'expected to'),
    (text: string) => text.replace(/could/gi, 'might'),
    (text: string) => text.replace(/breaking:/gi, 'Latest:'),
    (text: string) => text.replace(/exclusive:/gi, 'Report:')
  ]
  
  let reworded = original
  const randomVariation = variations[Math.floor(Math.random() * variations.length)]
  reworded = randomVariation(reworded)
  
  return reworded
}

function rewordSummary(original: string): string {
  // AI-powered summary rewriting
  const synonyms: { [key: string]: string[] } = {
    'team': ['squad', 'franchise', 'club'],
    'player': ['athlete', 'star', 'talent'],
    'game': ['match', 'contest', 'showdown'],
    'win': ['victory', 'triumph', 'success'],
    'loss': ['defeat', 'setback', 'disappointment']
  }
  
  let reworded = original
  Object.entries(synonyms).forEach(([word, alternatives]) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi')
    if (regex.test(reworded) && Math.random() > 0.5) {
      const alternative = alternatives[Math.floor(Math.random() * alternatives.length)]
      reworded = reworded.replace(regex, alternative)
    }
  })
  
  return reworded
}

function calculateImportance(title: string, summary: string): number {
  const text = (title + ' ' + summary).toLowerCase()
  let score = 50 // Base score
  
  // High importance keywords
  const highKeywords = ['trade', 'injury', 'mvp', 'championship', 'playoff', 'record', 'suspension']
  const mediumKeywords = ['draft', 'contract', 'coach', 'rookie', 'all-star']
  const lowKeywords = ['practice', 'interview', 'social media']
  
  highKeywords.forEach(keyword => {
    if (text.includes(keyword)) score += 20
  })
  
  mediumKeywords.forEach(keyword => {
    if (text.includes(keyword)) score += 10
  })
  
  lowKeywords.forEach(keyword => {
    if (text.includes(keyword)) score -= 5
  })
  
  return Math.min(Math.max(score, 10), 100)
}

function extractTags(text: string): string[] {
  const tags: string[] = []
  const keywords = ['trade', 'injury', 'mvp', 'playoff', 'draft', 'contract', 'rookie', 'championship']
  
  keywords.forEach(keyword => {
    if (text.toLowerCase().includes(keyword)) {
      tags.push(keyword)
    }
  })
  
  return tags
}