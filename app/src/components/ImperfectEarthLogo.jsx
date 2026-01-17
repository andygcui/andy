function ImperfectEarthLogo() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-lg"
    >
      <defs>
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="4"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="2"
          />
        </filter>
      </defs>
      {/* Rough, hand-drawn continents */}
      <g filter="url(#grain)">
        {/* Africa - bold, chunky strokes */}
        <path
          d="M45 35 Q50 40, 48 50 Q46 60, 50 70 Q52 75, 48 80 Q45 85, 50 90 Q52 92, 48 95"
          stroke="#0B0B0B"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M48 50 Q50 55, 52 60 Q54 65, 50 70"
          stroke="#0B0B0B"
          strokeWidth="3"
          fill="none"
        />
        
        {/* Europe - rough outline */}
        <path
          d="M50 25 Q55 28, 58 32 Q60 35, 62 38 Q64 40, 60 42 Q58 40, 55 38"
          stroke="#0B0B0B"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Americas - chunky, imperfect */}
        <path
          d="M25 30 Q28 40, 30 50 Q32 60, 30 70 Q28 80, 32 85 Q35 88, 30 90"
          stroke="#0B0B0B"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M30 50 Q32 55, 28 60 Q26 65, 30 70"
          stroke="#0B0B0B"
          strokeWidth="3"
          fill="none"
        />
        
        {/* Asia - bold marker strokes */}
        <path
          d="M65 30 Q70 35, 75 40 Q80 45, 78 50 Q76 55, 80 60 Q82 65, 78 70"
          stroke="#0B0B0B"
          strokeWidth="4.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M75 40 Q77 45, 75 50 Q73 55, 75 60"
          stroke="#0B0B0B"
          strokeWidth="3"
          fill="none"
        />
        
        {/* Australia - small rough blob */}
        <path
          d="M75 75 Q78 78, 80 80 Q82 82, 78 85 Q76 83, 75 80"
          stroke="#0B0B0B"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
      </g>
      
      {/* Ink texture overlay - rough fills */}
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="#0B0B0B"
        strokeWidth="2"
        opacity="0.3"
        strokeDasharray="2 3"
      />
      
      {/* Marker texture - visible strokes */}
      <g opacity="0.4">
        <path
          d="M45 35 Q48 38, 50 40"
          stroke="#0B0B0B"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M25 30 Q28 33, 30 35"
          stroke="#0B0B0B"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M65 30 Q68 33, 70 35"
          stroke="#0B0B0B"
          strokeWidth="1.5"
          fill="none"
        />
      </g>
    </svg>
  )
}

export default ImperfectEarthLogo
