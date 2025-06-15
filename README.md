# BallTalk - Interactive Sports Fan Platform

A comprehensive sports discussion platform where fans can engage in meaningful conversations, participate in quizzes, ask questions, and build their reputation as sports experts.

## 🚀 Features

- **Team-Specific Communities** - Dedicated spaces for each team's fanbase
- **Interactive Discussions** - Upvoting, downvoting, and threaded conversations
- **Q&A System** - Quora-style questions with expert verification
- **Interactive Quizzes** - Test your sports knowledge
- **Live Chat** - Real-time discussions during games
- **Reputation System** - Build credibility through quality contributions
- **AI-Powered Content** - Smart sports analysis and recommendations

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Real-time**: Socket.io
- **Deployment**: Vercel/Netlify

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd balltalk
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API keys
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

### Deployment

#### Option 1: Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set environment variables in Vercel dashboard
   - Deploy!

#### Option 2: Netlify

1. **Build for static export**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `out` folder to Netlify
   - Or connect your GitHub repository

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Sports APIs
ESPN_API_KEY=your_espn_api_key
THE_ATHLETIC_API_KEY=your_athletic_api_key

# AI Features
OPENAI_API_KEY=your_openai_api_key
```

### Database Setup

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Copy URL and anon key to `.env.local`

2. **Run Database Migrations**
   ```sql
   -- Users table (extends Supabase auth.users)
   CREATE TABLE user_profiles (
     id UUID REFERENCES auth.users(id) PRIMARY KEY,
     username TEXT UNIQUE NOT NULL,
     avatar_url TEXT,
     reputation INTEGER DEFAULT 0,
     verified BOOLEAN DEFAULT FALSE,
     favorite_teams TEXT[],
     expertise TEXT[],
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Posts table
   CREATE TABLE posts (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     title TEXT NOT NULL,
     content TEXT NOT NULL,
     author_id UUID REFERENCES user_profiles(id),
     sport TEXT NOT NULL,
     team TEXT,
     category TEXT NOT NULL,
     upvotes INTEGER DEFAULT 0,
     downvotes INTEGER DEFAULT 0,
     tags TEXT[],
     is_hot BOOLEAN DEFAULT FALSE,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Enable RLS
   ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
   ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
   ```

## 📱 Features Roadmap

### Phase 1: Core Platform ✅
- [x] User authentication
- [x] Discussion forums
- [x] Q&A system
- [x] Interactive quizzes
- [x] Reputation system

### Phase 2: Enhanced Features 🚧
- [ ] Real-time chat with WebSockets
- [ ] Push notifications
- [ ] Mobile app (React Native)
- [ ] Advanced analytics

### Phase 3: Monetization 💰
- [ ] Premium subscriptions
- [ ] Sponsored content
- [ ] Fantasy sports integration
- [ ] Merchandise partnerships

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.balltalk.com](https://docs.balltalk.com)
- **Discord**: [Join our community](https://discord.gg/balltalk)
- **Email**: support@balltalk.com

---

Built with ❤️ by the BallTalk team