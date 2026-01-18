function About() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              about
            </h1>
            <p>
                coming soon!
            </p>
            {/* Worm GIF */}
            <div className="flex justify-center mt-4">
              <img 
                src="/uploads/worm.gif" 
                alt="coming soon" 
                className="max-w-xs scale-60"
                style={{ transform: 'scale(0.6)' }}
              />
            </div>
          </header>
        </div>
      </div>
    </div>
  )
}

export default About
