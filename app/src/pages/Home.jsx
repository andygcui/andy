import { useState, useEffect, useRef } from 'react'
import ImageCropModal from '../components/ImageCropModal'
import { uploadImage, deleteImage } from '../utils/uploadImage'

function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const [images, setImages] = useState([])
  const [draggedIndex, setDraggedIndex] = useState(null)
  const [dragOverIndex, setDragOverIndex] = useState(null)
  const [cropModal, setCropModal] = useState({ isOpen: false, imageSrc: null, imageIndex: null })
  const gridRef = useRef(null)
  const fileInputRef = useRef(null)

  // Load images from localStorage on mount
  useEffect(() => {
    const savedImages = localStorage.getItem('portfolioImages')
    if (savedImages) {
      try {
        const parsed = JSON.parse(savedImages)
        console.log('Loaded images from localStorage:', parsed.length)
        setImages(parsed)
      } catch (e) {
        console.error('Failed to load saved images:', e)
      }
    } else {
      console.log('No saved images found in localStorage')
    }
  }, [])

  // Save images to localStorage whenever they change
  useEffect(() => {
    if (images.length >= 0) { // Save even if empty array
      localStorage.setItem('portfolioImages', JSON.stringify(images))
      console.log('Saved images to localStorage:', images.length)
    }
  }, [images])

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

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      const file = files[0] // Process one at a time
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (event) => {
          // Find next available slot
          const nextIndex = images.length < 60 ? images.length : null
          if (nextIndex !== null) {
            setCropModal({
              isOpen: true,
              imageSrc: event.target.result,
              imageIndex: nextIndex,
              initialCaption: ''
            })
          }
        }
        reader.readAsDataURL(file)
      }
    }
    // Reset input so same file can be selected again
    e.target.value = ''
  }

  const handleEdit = (e, index) => {
    e.stopPropagation()
    const image = images[index]
    if (image) {
      setCropModal({
        isOpen: true,
        imageSrc: image.src,
        imageIndex: index,
        initialCaption: image.caption || ''
      })
    }
  }

  const handleCropSave = async (croppedImageSrc, caption = '') => {
    const currentIndex = cropModal.imageIndex
    let oldImageUrl = null
    
    // Get old image URL if updating existing image
    if (currentIndex !== null && currentIndex < images.length) {
      oldImageUrl = images[currentIndex].src
    }
    
    try {
      // Upload cropped image to server with caption
      const { url: imageUrl, caption: savedCaption } = await uploadImage(croppedImageSrc, caption)
      
      if (currentIndex !== null && currentIndex < images.length) {
        // Update existing image
        setImages((prev) => {
          const updated = [...prev]
          updated[currentIndex] = {
            ...updated[currentIndex],
            src: imageUrl,
            caption: savedCaption
          }
          return updated
        })
        
        // Delete old image from server if it's a server URL
        if (oldImageUrl && oldImageUrl.startsWith('http')) {
          deleteImage(oldImageUrl).catch(console.error)
        }
      } else {
        // New image
        const newImage = {
          id: Date.now() + Math.random(),
          src: imageUrl,
          caption: savedCaption,
          position: images.length
        }
        setImages((prev) => [...prev, newImage])
      }
      
      setCropModal({ isOpen: false, imageSrc: null, imageIndex: null, initialCaption: '' })
    } catch (error) {
      console.error('Error uploading image:', error)
      alert(`Failed to upload image: ${error.message || 'Please try again.'}`)
    }
  }

  const handleCropClose = () => {
    setCropModal({ isOpen: false, imageSrc: null, imageIndex: null, initialCaption: '' })
  }

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

  const handleDelete = async (e, index) => {
    e.stopPropagation()
    const image = images[index]
    
    // Delete from server if it's a server URL
    if (image && image.src && image.src.startsWith('http')) {
      try {
        await deleteImage(image.src)
      } catch (error) {
        console.error('Error deleting image from server:', error)
      }
    }
    
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  // Generate grid slots (60 slots total)
  const gridSlots = Array.from({ length: 60 }, (_, i) => i)

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              andy cui
            </h1>
            <p className="text-xl text-gray-600">
              student; 
            </p>
          </header>
        </div>
      </div>

      {/* Portfolio Grid Section */}
      <div 
        ref={gridRef}
        className={`container mx-auto px-4 py-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="max-w-6xl mx-auto">
          {/* Upload Button */}
          <div className="mb-8 flex justify-center">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              Upload Images
            </button>
          </div>

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
                      <button
                        onClick={(e) => handleEdit(e, slotIndex)}
                        className="absolute top-2 left-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-600 text-xs z-10"
                        title="Edit/Crop image"
                      >
                        ✎
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, slotIndex)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10"
                        title="Delete image"
                      >
                        ×
                      </button>
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

      {/* Crop Modal */}
      {cropModal.isOpen && (
        <ImageCropModal
          imageSrc={cropModal.imageSrc}
          onClose={handleCropClose}
          onSave={handleCropSave}
          aspectRatio={1}
          initialCaption={cropModal.initialCaption || ''}
        />
      )}
    </div>
  )
}

export default Home
