function PlacePopup({ place }) {
  if (!place) return null

  return (
    <div className="bg-[#F2EEE6] paper-texture p-4 rounded-sm shadow-lg border-2 border-[#0B0B0B] transform rotate-[-0.5deg] relative">
      {/* Torn paper effect - rough edges */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-2 h-2 bg-[#0B0B0B] rounded-full"></div>
        <div className="absolute top-2 right-0 w-1 h-1 bg-[#0B0B0B] rounded-full"></div>
        <div className="absolute bottom-0 left-2 w-1.5 h-1.5 bg-[#0B0B0B] rounded-full"></div>
      </div>
      
      <h3 className="font-bold text-[#0B0B0B] text-lg mb-1">
        {place.name}, {place.country}
      </h3>
      {place.date && (
        <p className="text-sm text-[#0B0B0B]/70 mb-2">{place.date}</p>
      )}
      <p className="text-sm text-[#0B0B0B] leading-relaxed mb-3">
        {place.note}
      </p>
      {place.photoUrl && (
        <div className="w-full h-24 bg-gray-300 rounded border border-[#0B0B0B]/20">
          <img
            src={place.photoUrl}
            alt={place.name}
            className="w-full h-full object-cover rounded"
          />
        </div>
      )}
    </div>
  )
}

export default PlacePopup
