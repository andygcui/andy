import { useState } from 'react'
import TravelCardGrid from '../components/TravelCardGrid'
import PlacePopup from '../components/PlacePopup'

function Travel() {
  const [selectedPlace, setSelectedPlace] = useState(null)

  const handlePlaceSelect = (place) => {
    setSelectedPlace(place)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              travel
            </h1>
            <p className="text-gray-600">
              around the world
            </p>
          </header>

          {/* Selected Place Popup */}
          {selectedPlace && (
            <div className="mb-8 max-w-md mx-auto">
              <PlacePopup place={selectedPlace} />
            </div>
          )}

          {/* Worm GIF */}
          <div className="flex justify-center">
              <img 
                src="/uploads/worm.gif" 
                alt="coming soon" 
                className="max-w-xs scale-60"
                style={{ transform: 'scale(0.6)' }}
              />
            </div>
            

          {/* Travel Cards Grid */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Recent Trips
            </h2>
            <TravelCardGrid onCardClick={handlePlaceSelect} />
          </section>
        </div>
      </div>
    </div>
  )
}

export default Travel
