'use client'

import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import LeagueCarousel from './components/LeagueCarousel'
import SportsFeed from './components/SportsFeed'
import Footer from './components/Footer'

export default function Home() {
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    // Check for logged in user on page load
    const userData = localStorage.getItem('ballTalkUser')
    if (userData) {
      const user = JSON.parse(userData)
      setCurrentUser(user)
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

  return (
    <div className="min-h-screen">
      <Navigation 
        currentUser={currentUser} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
      />
      <Hero />
      <LeagueCarousel />
      <SportsFeed />
      <Footer />
    </div>
  )
}