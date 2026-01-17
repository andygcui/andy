import { useState } from 'react'
import ImperfectEarthLogo from '../components/ImperfectEarthLogo'
import TravelMap from '../components/TravelMap'
import TravelCardGrid from '../components/TravelCardGrid'
import PlacePopup from '../components/PlacePopup'
import './Travel.css'

function Travel() {
  const [selectedPlace, setSelectedPlace] = useState(null)

  const handlePlaceSelect = (place) => {
    setSelectedPlace(place)
  }

  return (
    <div className="travel-page min-h-screen bg-[#111] relative">
      {/* Film grain overlay */}
      <div className="grain-overlay"></div>
      
      <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
        {/* Header */}
        <header className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-6">
            <div className="flex-shrink-0">
              <ImperfectEarthLogo />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-black text-[#F2EEE6] mb-2 tracking-tight" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', letterSpacing: '-0.02em' }}>
                Places I've Traveled
              </h1>
              <p className="text-sm md:text-base text-[#F2EEE6]/70">
                Click a pin to see what I did there.
              </p>
            </div>
          </div>
        </header>

        {/* Map Section */}
        <section className="mb-8">
          <TravelMap
            selectedPlace={selectedPlace}
            onPlaceSelect={handlePlaceSelect}
          />
        </section>

        {/* Selected Place Popup */}
        {selectedPlace && (
          <div className="mb-8 max-w-md">
            <PlacePopup place={selectedPlace} />
          </div>
        )}

        {/* Travel Cards Grid */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-[#F2EEE6] mb-4">
            Recent Trips
          </h2>
          <TravelCardGrid onCardClick={handlePlaceSelect} />
        </section>
      </div>
    </div>
  )
}

export default Travel
