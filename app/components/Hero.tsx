export default function Hero() {
  return (
    <div className="hero-bg text-white py-32 px-8 text-center relative">
      <div className="hero-overlay absolute inset-0 z-10"></div>
      <div className="relative z-20">
        <h1 className="text-5xl font-bold mb-4 text-shadow-lg">
          Welcome to BallTalk
        </h1>
        <p className="text-xl text-shadow-md">
          Your go-to hub for real fan takes, debates, and predictions across all sports
        </p>
      </div>
    </div>
  )
}