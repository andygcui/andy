import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { portfolioImages as staticImages } from '../data/portfolioImages'
import { FaGithub, FaTiktok, FaYoutube, FaSpotify, FaEnvelope, FaInstagram } from 'react-icons/fa'

function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const [images, setImages] = useState([])
  const [draggedIndex, setDraggedIndex] = useState(null)
  const [dragOverIndex, setDragOverIndex] = useState(null)
  const gridRef = useRef(null)

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (gridRef.current) {
      observer.observe(gridRef.current)
    }

    return () => {
      if (gridRef.current) {
        observer.unobserve(gridRef.current)
      }
    }
  }, [])


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
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <header className="text-center">
            <Link to="/about">
              <h1 className="text-5xl font-bold text-gray-900 mb-6 hover:text-gray-700 transition-colors cursor-pointer">
                andy cui
              </h1>
            </Link>
            {/* Social Links */}
            <div className="flex justify-center items-center gap-6">
              <a
                href="https://github.com/andygcui"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900 transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={24} />
              </a>
              <a
                href="https://www.tiktok.com/@andy_cui"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900 transition-colors"
                aria-label="TikTok"
              >
                <FaTiktok size={24} />
              </a>
              <a
                href="https://www.youtube.com/@andycui"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900 transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube size={24} />
              </a>
              <a
                href="https://open.spotify.com/user/fgdbobbt7vmocnt73ukp0fqcr?si=5116222092fa473d"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900 transition-colors"
                aria-label="Spotify"
              >
                <FaSpotify size={24} />
              </a>
              <a
                href="https://www.instagram.com/_andycui"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="mailto:andy.cui@princeton.edu"
                className="text-gray-700 hover:text-gray-900 transition-colors"
                aria-label="Email"
              >
                <FaEnvelope size={24} />
              </a>
            </div>
          </header>
        </div>
      </div>

      <div className="flex justify-center" style={{ marginTop: '5px', marginBottom: '60px' }}>
              <img 
                src="/uploads/tiger.png" 
                alt="princeton tiger" 
                className="max-w-xs scale-70"
                style={{ transform: 'scale(0.7)' }}
              />
            </div>


    <p className="text-center text-gray-600"> my favorite memories </p>
      {/* Portfolio Grid Section */}
      <div 
        ref={gridRef}
        className={`container mx-auto px-4 py-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
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
