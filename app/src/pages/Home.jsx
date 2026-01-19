import { useState, useEffect } from 'react'

function Home() {
  const [headingText, setHeadingText] = useState('')
  const [headingComplete, setHeadingComplete] = useState(false)

  // Preload images for smooth transitions
  useEffect(() => {
    const preloadImages = [
      '/uploads/me.png', // Edu page image
      '/uploads/tiger.png', // Stamp animation
      '/uploads/header.png' // Header icon
    ]
    
    preloadImages.forEach(src => {
      const img = new Image()
      img.src = src
    })
  }, [])

  // Typewriter effect for heading
  useEffect(() => {
    let typingInterval = null
    const text = 'ac49'
    let currentIndex = 0

    // Start typing after a brief delay
    const typingTimer = setTimeout(() => {
      typingInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setHeadingText(text.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(typingInterval)
          setHeadingComplete(true)
        }
      }, 80) // Same typing speed as stamp animation
    }, 100)

    return () => {
      clearTimeout(typingTimer)
      if (typingInterval) {
        clearInterval(typingInterval)
      }
    }
  }, [])

  return (
    <>
    <div className="h-screen bg-white relative overflow-hidden flex flex-col">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
          <header className="text-center">
              <div className="group relative inline-block">
                <p className="absolute bottom-full left-0 mb-2 ml-4 text-sm text-gray-600 font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  andy.cui <span className='text-orange-700'>[at]</span> princeton <span className='text-orange-700'>[dot]</span> edu
                </p>
                <h1 className="text-[2.75rem] font-serif text-gray-1000 mb-4 hover:text-gray-700 transition-colors cursor-pointer font-mono">
                  {headingText}
                  {headingComplete && (
                    <span 
                      className="inline-block ml-1 animate-pulse"
                      style={{ animation: 'blink 1s infinite' }}
                    >
                      |
                    </span>
                  )}
                </h1>
              </div>
              {/* <p className="text-gray-600 font-mono">andy.cui@princeton.edu</p> */}
            {/* Category Links
            <div className="flex justify-center items-center gap-6 mb-8">
              <Link
                to="/edu"
                className="text-gray-1000 hover:text-gray-800 transition-colors text-sm font-medium"
              >
                edu
              </Link>
              <Link
                to="/txt"
                className="text-gray-1000 hover:text-gray-800 transition-colors text-sm font-medium"
              >
                txt
              </Link>
              <Link
                to="/etc"
                className="text-gray-1000 hover:text-gray-800 transition-colors text-sm font-medium"
              >
                etc
              </Link>
            </div> */}
          </header>
        </div>
      </div>
      <div className="mt-auto text-center pb-8">
        <p className="text-gray-600">:)</p>
      </div>
    </div>
    </>
  )
}

export default Home
