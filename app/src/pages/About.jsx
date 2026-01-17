function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              about me
            </h1>
          </header>

          <main className="bg-white rounded-lg shadow-lg p-8">
            <p className="text-gray-600 leading-relaxed">
              about{' '}
              <code className="bg-gray-100 px-2 py-1 rounded">app/src/pages/</code> folder!
            </p>
          </main>
        </div>
      </div>
    </div>
  )
}

export default About
