import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { portfolioImages as staticImages } from '../data/portfolioImages'
import { FaGithub, FaTiktok, FaYoutube, FaSpotify, FaEnvelope, FaInstagram } from 'react-icons/fa'
import { useIntro } from '../contexts/IntroContext'

function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const [images, setImages] = useState([])
  const [draggedIndex, setDraggedIndex] = useState(null)
  const [dragOverIndex, setDragOverIndex] = useState(null)
  const { showIntro, setShowIntro, paperSliding, setPaperSliding } = useIntro()
  const [tigerVisible, setTigerVisible] = useState(false)
  const [captionText, setCaptionText] = useState('')
  const [captionComplete, setCaptionComplete] = useState(false)
  const gridRef = useRef(null)
  const audioRef = useRef(null)

  // Load images from static folder on mount
  useEffect(() => {
    // Load static images from public/uploads folder
    // These are permanent and will persist across reloads
    if (staticImages && staticImages.length > 0) {
      setImages(staticImages)
    }
    
    // Optionally merge with localStorage if you want to allow custom additions
    // const savedImages = localStorage.getItem('portfolioImages')
    // if (savedImages) {
    //   try {
    //     const parsed = JSON.parse(savedImages)
    //     // Merge static images with saved custom images
    //     setImages([...staticImages, ...parsed])
    //   } catch (e) {
    //     console.error('Failed to load saved images:', e)
    //   }
    // }
  }, [])

  // Note: Images are now loaded from static files in public/uploads
  // They persist permanently and don't need localStorage
  // Uncomment below if you want to save custom additions/edits
  // useEffect(() => {
  //   localStorage.setItem('portfolioImages', JSON.stringify(images))
  // }, [images])

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
      const text = 'andy cui'
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
    // Handle intro animation skip on user interaction
    const handleInteraction = () => {
      if (showIntro && !paperSliding) {
        setPaperSliding(true)
        // Play thunk sound if not already played
        if (audioRef.current && !tigerVisible) {
          audioRef.current.play().catch(() => {})
        }
        // Hide intro after fade animation
        setTimeout(() => {
          setShowIntro(false)
          setIsVisible(true)
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

    // Listen for clicks, scrolls, and keyboard to reveal main content
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
  }, [showIntro, paperSliding, tigerVisible])

  // Trigger grid animation after intro completes
  useEffect(() => {
    if (!showIntro) {
      const gridTimer = setTimeout(() => {
        setIsVisible(true)
      }, 100)
      return () => clearTimeout(gridTimer)
    }
  }, [showIntro])


  const handleDragStart = (e, index) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e, index) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverIndex(index)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const handleDrop = (e, dropIndex) => {
    e.preventDefault()
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDragOverIndex(null)
      return
    }

    const newImages = [...images]
    const draggedImage = newImages[draggedIndex]
    
    // Remove from old position
    newImages.splice(draggedIndex, 1)
    
    // Insert at new position
    newImages.splice(dropIndex, 0, draggedImage)
    
    // Update positions
    const updatedImages = newImages.map((img, idx) => ({
      ...img,
      position: idx
    }))
    
    setImages(updatedImages)
    setDraggedIndex(null)
    setDragOverIndex(null)
  }


  // Generate grid slots (56 slots total)
  const gridSlots = Array.from({ length: 56 }, (_, i) => i)

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
        <div className="max-w-4xl mx-auto">
          <header className="text-center">
              <h1 className="text-[2.75rem] font-serif text-gray-1000 mt-40 mb-4 hover:text-gray-700 transition-colors cursor-pointer">
                ANDY CUI
              </h1>
            {/* Category Links */}
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
            </div>
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
      {/* Portfolio Grid Section */}
      <div 
        ref={gridRef}
        className={`container mx-auto px-4 pb-16 pt-4 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ marginTop: '5px' }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Note: Images are loaded from public/uploads folder */}
          {/* To add/edit images, place them in app/public/uploads and update portfolioImages.js */}

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {gridSlots.map((slotIndex) => {
              const image = images[slotIndex]
              const isDragging = draggedIndex === slotIndex
              const isDragOver = dragOverIndex === slotIndex

              return (
                <div
                  key={slotIndex}
                  className={`aspect-square rounded-lg transition-all duration-200 ${
                    isDragOver ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                  } ${
                    isDragging ? 'opacity-50 scale-95' : ''
                  } ${
                    isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                  style={{
                    transitionDelay: `${slotIndex * 50}ms`
                  }}
                  onDragOver={(e) => handleDragOver(e, slotIndex)}
                  onDrop={(e) => handleDrop(e, slotIndex)}
                  onDragEnd={handleDragEnd}
                >
                  {image ? (
                    <div className="relative w-full h-full group">
                      <img
                        src={image.src}
                        alt={`Portfolio ${slotIndex + 1}`}
                        className="w-full h-full object-cover rounded-lg cursor-move transition-all duration-300 group-hover:brightness-50"
                        draggable
                        onDragStart={(e) => handleDragStart(e, slotIndex)}
                        onDragEnd={handleDragEnd}
                        onError={(e) => {
                          console.error('Failed to load image:', image.src)
                          e.target.style.display = 'none'
                        }}
                      />
                      {/* Caption overlay */}
                      {image.caption && (
                        <div className="absolute inset-0 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                          <p className="text-white text-sm font-medium text-center break-words">
                            {image.caption}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gray-300 rounded-lg" />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
