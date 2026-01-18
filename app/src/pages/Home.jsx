import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useIntro } from '../contexts/IntroContext'

function Home() {
  const navigate = useNavigate()
  const { showIntro, setShowIntro, paperSliding, setPaperSliding } = useIntro()
  const [tigerVisible, setTigerVisible] = useState(false)
  const [captionText, setCaptionText] = useState('')
  const [captionComplete, setCaptionComplete] = useState(false)
  const [headingText, setHeadingText] = useState('')
  const [headingComplete, setHeadingComplete] = useState(false)
  const audioRef = useRef(null)

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

  // Stamp impression animation sequence
  useEffect(() => {
    if (!showIntro) return

    let typingInterval = null

    // Start tiger ink bleed animation after a brief delay
    const tigerTimer = setTimeout(() => {
      setTigerVisible(true)
      // Play thunk sound when stamp hits
      if (audioRef.current) {
        audioRef.current.play().catch(() => {
          // Ignore audio play errors (user interaction required)
        })
      }
    }, 200)

    // Start label-maker typing animation after tiger appears
    const captionTimer = setTimeout(() => {
      const text = 'ac49'
      let currentIndex = 0
      typingInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setCaptionText(text.slice(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(typingInterval)
          setCaptionComplete(true)
        }
      }, 80) // Typing speed
    }, 800)

    return () => {
      clearTimeout(tigerTimer)
      clearTimeout(captionTimer)
      if (typingInterval) {
        clearInterval(typingInterval)
      }
    }
  }, [showIntro])

  useEffect(() => {
    // Handle intro animation skip - navigate to /edu
    const handleInteraction = () => {
      if (showIntro && !paperSliding) {
        setPaperSliding(true)
        // Play thunk sound if not already played
        if (audioRef.current && !tigerVisible) {
          audioRef.current.play().catch(() => {})
        }
        // Navigate to /edu after fade animation
        setTimeout(() => {
          setShowIntro(false)
          navigate('/edu')
        }, 600)
      }
    }

    // Handle keyboard events (spacebar)
    const handleKeyDown = (e) => {
      if (showIntro && !paperSliding && e.key === ' ') {
        e.preventDefault() // Prevent spacebar from scrolling
        handleInteraction()
      }
    }

    // Listen for clicks, scrolls, and keyboard - all navigate to /edu
    if (showIntro && !paperSliding) {
      window.addEventListener('click', handleInteraction, { once: true })
      window.addEventListener('scroll', handleInteraction, { once: true })
      window.addEventListener('touchstart', handleInteraction, { once: true })
      window.addEventListener('keydown', handleKeyDown, { once: true })
    }

    return () => {
      window.removeEventListener('click', handleInteraction)
      window.removeEventListener('scroll', handleInteraction)
      window.removeEventListener('touchstart', handleInteraction)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [showIntro, paperSliding, tigerVisible, navigate])

  // Typewriter effect for heading when intro is done
  useEffect(() => {
    if (showIntro) return

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
  }, [showIntro])

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Optional thunk sound */}
      <audio ref={audioRef} preload="auto">
        <source src="/thunk.mp3" type="audio/mpeg" />
        <source src="/thunk.ogg" type="audio/ogg" />
      </audio>

      {/* Stamp Impression Intro Animation */}
      {showIntro && (
        <div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #faf9f6 0%, #f5f4f1 100%)',
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0),
              radial-gradient(circle at 2px 2px, rgba(0,0,0,0.02) 1px, transparent 0)
            `,
            backgroundSize: '20px 20px, 40px 40px',
            opacity: paperSliding ? 0 : 1,
            transition: paperSliding ? 'opacity 0.6s ease-out' : 'none',
            pointerEvents: paperSliding ? 'none' : 'auto'
          }}
        >
          {/* Tiger Stamp with Ink Bleed Animation */}
          <div 
            className="relative flex flex-col items-center justify-center"
            style={{
              transform: paperSliding ? 'scale(0.9)' : 'scale(1)',
              opacity: paperSliding ? 0 : 1,
              transition: paperSliding ? 'transform 0.6s ease-out, opacity 0.6s ease-out' : 'none'
            }}
          >
            <img 
              src="/uploads/tiger.png" 
              alt="princeton tiger" 
              className="max-w-xs md:max-w-sm cursor-pointer"
              onClick={() => {
                if (showIntro && !paperSliding) {
                  setPaperSliding(true)
                  if (audioRef.current && !tigerVisible) {
                    audioRef.current.play().catch(() => {})
                  }
                  setTimeout(() => {
                    setShowIntro(false)
                    navigate('/edu')
                  }, 600)
                }
              }}
              style={{ 
                transform: tigerVisible 
                  ? 'scale(1) translate(0, 0)' 
                  : 'scale(1.05) translate(0, 0)',
                opacity: tigerVisible ? 1 : 0,
                filter: 'contrast(1.1) brightness(0.95)',
                transition: tigerVisible 
                  ? 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease-out, filter 0.2s ease-in-out' 
                  : 'none',
                animation: tigerVisible ? 'inkBleed 0.4s ease-out' : 'none'
              }}
              onMouseEnter={(e) => {
                if (tigerVisible && !paperSliding) {
                  e.target.style.filter = 'contrast(1.1) brightness(1.5)'
                }
              }}
              onMouseLeave={(e) => {
                if (tigerVisible && !paperSliding) {
                  e.target.style.filter = 'contrast(1.1) brightness(0.95)'
                }
              }}
            />
            
            {/* Label-maker caption */}
            <div 
              className="mt-6 text-sm font-mono tracking-wider text-gray-700"
              style={{
                opacity: captionText.length > 0 ? 1 : 0,
                transition: 'opacity 0.2s ease-in'
              }}
            >
              <span className="inline-block">
                {captionText}
                {captionComplete && (
                  <span 
                    className="inline-block ml-1 animate-pulse"
                    style={{ animation: 'blink 1s infinite' }}
                  >
                    |
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
      )}
      <div className={`container mx-auto px-4 py-16 ${showIntro ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} style={{ transition: 'opacity 0.3s' }}>
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

      {!showIntro && (
        <>
          {/* Category Circles */}
          {/* To add images: Replace the inner div with: <img src="/path/to/image.jpg" alt="edu" className="w-full h-full object-cover" /> */}
          {/* <div className="flex justify-center items-center gap-8 mb-12">
            <Link to="/edu" className="group">
              <img 
                src="/uploads/backpack.png" 
                alt="edu" 
                className="transition-all duration-200 hover:scale-110 cursor-pointer"
                style={{ width: '120px', height: '120px' }}
              />
            </Link>
            <Link to="/txt" className="group">
              <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden transition-all duration-200 hover:scale-110 cursor-pointer">
                
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                  .txt
                </div>
              </div>
            </Link>
            <Link to="/etc" className="group">
              <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden transition-all duration-200 hover:scale-110 cursor-pointer">
                
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                  etc.
                </div>
              </div>
            </Link>
          </div> */}

          {/* <p className="text-center font-mono text-sm text-gray-600" style={{ marginTop: '40px' }}> a few of my favorite memories </p> */}
        </>
      )}
    </div>
  )
}

export default Home
