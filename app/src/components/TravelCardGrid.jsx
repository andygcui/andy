import { travelData } from '../data/travelData'

function TravelCardGrid({ onCardClick }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
      {travelData.map((place) => (
        <div
          key={place.id}
          onClick={() => onCardClick(place)}
          className="bg-[#F2EEE6] paper-texture p-4 border-2 border-[#0B0B0B] cursor-pointer transform transition-all duration-300 ease-out hover:translate-y-[-4px] hover:shadow-lg"
          style={{
            transform: `rotate(${Math.random() * 2 - 1}deg)`,
          }}
        >
          {/* Polaroid-style photo placeholder */}
          <div className="w-full h-32 bg-gray-300 border border-[#0B0B0B]/30 mb-3 flex items-center justify-center">
            {place.photoUrl ? (
              <img
                src={place.photoUrl}
                alt={place.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-[#0B0B0B]/40 text-xs">📷</span>
            )}
          </div>
          
          {/* Caption */}
          <p className="text-sm font-semibold text-[#0B0B0B] mb-1">
            {place.name}
          </p>
          <p className="text-xs text-[#0B0B0B]/70">{place.country}</p>
        </div>
      ))}
    </div>
  )
}

export default TravelCardGrid
