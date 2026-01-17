import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { travelData } from '../data/travelData'

// Fix Leaflet default icon
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

function TravelMap({ selectedPlace, onPlaceSelect }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])

  useEffect(() => {
    if (!mapRef.current) return

    // Initialize map with dark style
    const map = L.map(mapRef.current, {
      center: [20, 0],
      zoom: 2,
      zoomControl: false,
      attributionControl: false,
    })

    // Dark tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '',
      maxZoom: 19,
    }).addTo(map)

    mapInstanceRef.current = map

    // Custom icon - hand-painted ink droplet style
    const createCustomIcon = (place) => {
      return L.divIcon({
        className: 'custom-marker',
        html: `
          <div style="
            width: 20px;
            height: 20px;
            background: #E06B2D;
            border: 2px solid #0B0B0B;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            box-shadow: 0 2px 4px rgba(0,0,0,0.5);
            position: relative;
            animation: pulse 2s ease-in-out infinite;
          ">
            <div style="
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(45deg);
              width: 8px;
              height: 8px;
              background: #0B0B0B;
              border-radius: 50%;
            "></div>
          </div>
          <style>
            @keyframes pulse {
              0%, 100% { transform: rotate(-45deg) scale(1); }
              50% { transform: rotate(-45deg) scale(1.1); }
            }
          </style>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 20],
        popupAnchor: [0, -20],
      })
    }

    // Add markers
    travelData.forEach((place) => {
      const marker = L.marker([place.lat, place.lng], {
        icon: createCustomIcon(place),
      }).addTo(map)

      marker.bindPopup(`
        <div style="
          background: #F2EEE6;
          padding: 12px;
          border: 2px solid #0B0B0B;
          border-radius: 2px;
          font-family: sans-serif;
          color: #0B0B0B;
        ">
          <h3 style="font-weight: bold; margin-bottom: 4px;">${place.name}, ${place.country}</h3>
          ${place.date ? `<p style="font-size: 12px; color: #666; margin-bottom: 8px;">${place.date}</p>` : ''}
          <p style="font-size: 13px; line-height: 1.4;">${place.note}</p>
        </div>
      `)

      marker.on('click', () => {
        onPlaceSelect(place)
      })

      markersRef.current.push(marker)
    })

    return () => {
      map.remove()
    }
  }, [onPlaceSelect])

  // Focus on selected place
  useEffect(() => {
    if (selectedPlace && mapInstanceRef.current) {
      const place = travelData.find((p) => p.id === selectedPlace.id)
      if (place) {
        mapInstanceRef.current.setView([place.lat, place.lng], 5, {
          animate: true,
          duration: 0.5,
        })
      }
    }
  }, [selectedPlace])

  return (
    <div className="relative w-full h-[500px] rounded-sm overflow-hidden border-2 border-[#0B0B0B]">
      <div ref={mapRef} className="w-full h-full" />
      
      {/* Custom zoom controls - handmade style */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-1">
        <button
          onClick={() => mapInstanceRef.current?.zoomIn()}
          className="bg-[#F2EEE6] border-2 border-[#0B0B0B] w-10 h-10 flex items-center justify-center text-[#0B0B0B] font-bold text-lg hover:bg-[#E06B2D] hover:text-white transition-colors transform rotate-[-1deg] shadow-md"
          style={{ fontFamily: 'monospace' }}
        >
          +
        </button>
        <button
          onClick={() => mapInstanceRef.current?.zoomOut()}
          className="bg-[#F2EEE6] border-2 border-[#0B0B0B] w-10 h-10 flex items-center justify-center text-[#0B0B0B] font-bold text-lg hover:bg-[#E06B2D] hover:text-white transition-colors transform rotate-[1deg] shadow-md"
          style={{ fontFamily: 'monospace' }}
        >
          −
        </button>
      </div>
    </div>
  )
}

export default TravelMap
