import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

function Intro() {
  const [tigerVisible, setTigerVisible] = useState(false)
  const [captionText, setCaptionText] = useState('')
  const [captionComplete, setCaptionComplete] = useState(false)
  const [paperSliding, setPaperSliding] = useState(false)
  const [tigerClicked, setTigerClicked] = useState(false)
  const [showLinks, setShowLinks] = useState(false)
  const [linkVisible, setLinkVisible] = useState([false, false, false])
  const [hoverLinkVisible, setHoverLinkVisible] = useState([false, false, false])
  const [isHovering, setIsHovering] = useState(false)
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)
  const [isHoverAnimatingOut, setIsHoverAnimatingOut] = useState(false)
  const [tigerBright, setTigerBright] = useState(false)
  const hoverTimeoutRef = useRef(null)
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


  return (
    <>
    <div className="h-screen bg-white relative overflow-hidden flex flex-col">
      {/* Optional thunk sound */}
      <audio ref={audioRef} preload="auto">
        <source src="/thunk.mp3" type="audio/mpeg" />
        <source src="/thunk.ogg" type="audio/ogg" />
      </audio>

      {/* Stamp Impression Intro Animation */}
      <div 
        className="fixed inset-0 z-50"
        style={{
          background: 'linear-gradient(135deg, #faf9f6 0%, #f5f4f1 100%)',
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0),
            radial-gradient(circle at 2px 2px, rgba(0,0,0,0.02) 1px, transparent 0)
          `,
          backgroundSize: '20px 20px, 40px 40px',
          opacity: paperSliding ? 0 : 1,
          transition: paperSliding ? 'opacity 0.6s ease-out' : 'none',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Tiger Stamp with Ink Bleed Animation */}
        <div 
          style={{
            opacity: paperSliding ? 0 : 1,
            transition: paperSliding ? 'opacity 0.6s ease-out' : 'none',
            pointerEvents: 'auto',
            position: 'absolute',
            top: 'calc(50% - 30px)',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {/* Tiger image - fixed position */}
          <div 
            style={{ 
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              marginTop: tigerClicked ? '0' : '0',
              width: '220px', // Adjust width to change hitbox size (make smaller than image)
              height: '180px', // Adjust height to change hitbox size (make smaller than image)
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden', // Prevent image parts outside container from triggering hover
              cursor: 'default'
            }}
            onClick={() => {
              if (captionComplete) {
                if (tigerClicked) {
                  // Toggle back to ac49 - animate out in reverse order (slide up)
                  setIsAnimatingOut(true)
                  setIsHovering(false) // Reset hover immediately so ac49 can show after animation
                  setTigerBright(false) // Start dimming tiger immediately
                  setLinkVisible([true, true, false]) // Hide last link first
                  setTimeout(() => setLinkVisible([true, false, false]), 100) // Hide second
                  setTimeout(() => setLinkVisible([false, false, false]), 200) // Hide first
                  setTimeout(() => {
                    setTigerClicked(false)
                    setShowLinks(false)
                    setIsAnimatingOut(false)
                  }, 400)
                } else {
                  // Toggle to links - immediately show them, cancel any hover animation
                  setIsHovering(false) // Stop hover state
                  setHoverLinkVisible([false, false, false]) // Cancel hover animation
                  setTigerClicked(true)
                  setTigerBright(true) // Make tiger bright
                  setShowLinks(true)
                  setLinkVisible([true, true, true]) // Show all links instantly
                }
              }
            }}
            onMouseEnter={() => {
              if (tigerVisible && !paperSliding && !tigerClicked) {
                if (hoverTimeoutRef.current) {
                  clearTimeout(hoverTimeoutRef.current)
                  hoverTimeoutRef.current = null
                }
                setIsHovering(true)
                // Animate hover links in
                setTimeout(() => setHoverLinkVisible([true, false, false]), 100)
                setTimeout(() => setHoverLinkVisible([true, true, false]), 250)
                setTimeout(() => setHoverLinkVisible([true, true, true]), 400)
              }
            }}
            onMouseLeave={() => {
              if (tigerVisible && !paperSliding && !tigerClicked) {
                hoverTimeoutRef.current = setTimeout(() => {
                  // Start reverse animation
                  setIsHoverAnimatingOut(true)
                  setHoverLinkVisible([true, true, false]) // Hide last link first
                  setTimeout(() => setHoverLinkVisible([true, false, false]), 100) // Hide second
                  setTimeout(() => setHoverLinkVisible([false, false, false]), 200) // Hide first
                  setTimeout(() => {
                    setIsHovering(false)
                    setIsHoverAnimatingOut(false)
                  }, 400)
                }, 500) // 0.5 second delay before collapsing
              }
            }}
          >
            <img 
              src="/uploads/tiger.png" 
              alt="princeton tiger" 
              className="max-w-xs md:max-w-sm"
              style={{ 
                transform: tigerVisible 
                  ? 'scale(1) translate(0, 0)' 
                  : 'scale(1.05) translate(0, 0)',
                opacity: tigerVisible ? 1 : 0,
                filter: (isHovering || tigerBright) ? 'contrast(1.1) brightness(1.5)' : 'contrast(1.1) brightness(0.95)',
                transition: tigerVisible 
                  ? 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease-out, filter 0.2s ease-in-out' 
                  : 'none',
                animation: tigerVisible ? 'inkBleed 0.4s ease-out' : 'none',
                display: 'block',
                pointerEvents: 'none' // Prevent image from capturing hover events
              }}
            />
          </div>
          
          {/* Label-maker caption or Navigation Links - positioned below tiger */}
          <div 
            className="text-sm font-mono tracking-wider text-gray-700 text-center"
            style={{
              position: 'absolute',
              top: 'calc(50% + 120px)',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%'
            }}
          >
            {tigerClicked ? (
              <div
                className="flex flex-col items-center"
                style={{
                  gap: '0.75rem'
                }}
              >
                <Link 
                  to="/home" 
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                  style={{
                    opacity: isAnimatingOut ? 0 : (linkVisible[0] ? 1 : 0),
                    transform: isAnimatingOut ? 'translateY(-10px)' : (linkVisible[0] ? 'translateY(0)' : 'translateY(-10px)'),
                    transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
                  }}
                >
                  home
                </Link>
                <Link 
                  to="/txt/jan26" 
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                  style={{
                    opacity: isAnimatingOut ? 0 : (linkVisible[1] ? 1 : 0),
                    transform: isAnimatingOut ? 'translateY(-10px)' : (linkVisible[1] ? 'translateY(0)' : 'translateY(-10px)'),
                    transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
                  }}
                >
                  january
                </Link>
                <Link 
                  to="/txt/2025" 
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                  style={{
                    opacity: isAnimatingOut ? 0 : (linkVisible[2] ? 1 : 0),
                    transform: isAnimatingOut ? 'translateY(-10px)' : (linkVisible[2] ? 'translateY(0)' : 'translateY(-10px)'),
                    transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
                  }}
                >
                  2025 notes
                </Link>
              </div>
            ) : (
              <>
                {isHovering ? (
                  <div
                    className="flex flex-col items-center"
                    style={{
                      gap: '0.75rem'
                    }}
                    onMouseEnter={() => {
                      if (hoverTimeoutRef.current) {
                        clearTimeout(hoverTimeoutRef.current)
                        hoverTimeoutRef.current = null
                      }
                      setIsHovering(true)
                    }}
                    onMouseLeave={() => {
                      hoverTimeoutRef.current = setTimeout(() => {
                        // Start reverse animation
                        setIsHoverAnimatingOut(true)
                        setHoverLinkVisible([true, true, false]) // Hide last link first
                        setTimeout(() => setHoverLinkVisible([true, false, false]), 100) // Hide second
                        setTimeout(() => setHoverLinkVisible([false, false, false]), 200) // Hide first
                        setTimeout(() => {
                          setIsHovering(false)
                          setIsHoverAnimatingOut(false)
                        }, 400)
                      }, 500)
                    }}
                  >
                    <Link 
                      to="/home" 
                      className="text-gray-700 hover:text-gray-900 transition-colors"
                      style={{
                        opacity: isHoverAnimatingOut ? 0 : (hoverLinkVisible[0] ? 1 : 0),
                        transform: isHoverAnimatingOut ? 'translateY(-10px)' : (hoverLinkVisible[0] ? 'translateY(0)' : 'translateY(-10px)'),
                        transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
                      }}
                    >
                      home
                    </Link>
                    <Link 
                      to="/txt/jan26" 
                      className="text-gray-700 hover:text-gray-900 transition-colors"
                      style={{
                        opacity: isHoverAnimatingOut ? 0 : (hoverLinkVisible[1] ? 1 : 0),
                        transform: isHoverAnimatingOut ? 'translateY(-10px)' : (hoverLinkVisible[1] ? 'translateY(0)' : 'translateY(-10px)'),
                        transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
                      }}
                    >
                      january
                    </Link>
                    <Link 
                      to="/txt/2025" 
                      className="text-gray-700 hover:text-gray-900 transition-colors"
                      style={{
                        opacity: isHoverAnimatingOut ? 0 : (hoverLinkVisible[2] ? 1 : 0),
                        transform: isHoverAnimatingOut ? 'translateY(-10px)' : (hoverLinkVisible[2] ? 'translateY(0)' : 'translateY(-10px)'),
                        transition: 'opacity 0.3s ease-out, transform 0.3s ease-out'
                      }}
                    >
                      2025 notes
                    </Link>
                  </div>
                ) : (
                  <div
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
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="mt-auto text-center pb-8">
        <p className="text-gray-600 ">:)</p>
      </div>
    </div>
    </>
  )
}

export default Intro
