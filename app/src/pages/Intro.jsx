import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function Intro() {
  const navigate = useNavigate()
  const [tigerVisible, setTigerVisible] = useState(false)
  const [captionText, setCaptionText] = useState('')
  const [captionComplete, setCaptionComplete] = useState(false)
  const [paperSliding, setPaperSliding] = useState(false)
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
  }, [])

  useEffect(() => {
    // Handle intro animation skip - navigate to /edu
    const handleInteraction = () => {
      if (!paperSliding) {
        setPaperSliding(true)
        // Play thunk sound if not already played
        if (audioRef.current && !tigerVisible) {
          audioRef.current.play().catch(() => {})
        }
        // Navigate to /edu after fade animation
        setTimeout(() => {
          navigate('/edu')
        }, 600)
      }
    }

    // Handle keyboard events (spacebar)
    const handleKeyDown = (e) => {
      if (!paperSliding && e.key === ' ') {
        e.preventDefault() // Prevent spacebar from scrolling
        handleInteraction()
      }
    }

    // Listen for clicks, scrolls, and keyboard - all navigate to /edu
    if (!paperSliding) {
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
  }, [paperSliding, tigerVisible, navigate])

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Optional thunk sound */}
      <audio ref={audioRef} preload="auto">
        <source src="/thunk.mp3" type="audio/mpeg" />
        <source src="/thunk.ogg" type="audio/ogg" />
      </audio>

      {/* Stamp Impression Intro Animation */}
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
              if (!paperSliding) {
                setPaperSliding(true)
                if (audioRef.current && !tigerVisible) {
                  audioRef.current.play().catch(() => {})
                }
                setTimeout(() => {
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
    </div>
  )
}

export default Intro
