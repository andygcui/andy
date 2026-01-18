import { useState } from 'react'
import TravelCardGrid from '../components/TravelCardGrid'
import PlacePopup from '../components/PlacePopup'

function Etc() {
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
            <h1 className="text-[2.75rem] font-serif text-gray-900 mb-4">
              etc.
            </h1>
            <p className="text-gray-600">
              favorite cities: cusco, peru // lucerne, switzerland // new york, usa // chengdu, china // paris, france // kyoto, japan // providenciales, turks and caicos 
            </p>
          </header>

          {/* Worm GIF */}
          <div className="flex justify-center">
              <img 
                src="/uploads/worm.gif" 
                alt="coming soon" 
                className="max-w-xs scale-60"
                style={{ transform: 'scale(0.6)', marginTop: '-100px' }}
              />
            </div>


        
        </div>
      </div>
    </div>
  )
}

export default Etc
