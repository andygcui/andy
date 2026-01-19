import { useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaGithub, FaTiktok, FaYoutube, FaSpotify, FaInstagram, FaRegEnvelope } from 'react-icons/fa'

function Nav() {
  const location = useLocation()
  const isHomePage = location.pathname === '/home'
  const isIntroPage = location.pathname === '/'
  const [isTigerHovered, setIsTigerHovered] = useState(false)
  const collapseTimeoutRef = useRef(null)

  // Determine current page name
  const getCurrentPage = () => {
    if (location.pathname === '/home' || location.pathname === '/') return 'home'
    if (location.pathname.startsWith('/edu')) return 'edu'
    if (location.pathname.startsWith('/txt')) return 'txt'
    if (location.pathname.startsWith('/etc')) return 'etc'
    return ''
  }

  const currentPage = getCurrentPage()

  const handleMouseEnter = () => {
    if (collapseTimeoutRef.current) {
      clearTimeout(collapseTimeoutRef.current)
      collapseTimeoutRef.current = null
    }
    setIsTigerHovered(true)
  }

  const handleMouseLeave = () => {
    collapseTimeoutRef.current = setTimeout(() => {
      setIsTigerHovered(false)
    }, 500) // 0.5 second delay before collapsing
  }

  return (
    <nav className="py-7">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            to="/home"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img 
              src="/uploads/header.png" 
              alt="home" 
              className="h-6 w-auto cursor-pointer"
              style={{ 
                filter: 'brightness(1)',
                transition: 'filter 0.2s ease-in-out'
              }}
              onMouseEnter={(e) => {
                e.target.style.filter = 'brightness(1.5)'
                handleMouseEnter()
              }}
              onMouseLeave={(e) => {
                e.target.style.filter = 'brightness(1)'
              }}
            />
          </Link>
          {/* On intro page, show all links always */}
          {isIntroPage ? (
            <>
              <Link
                to="/edu"
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                edu
              </Link>
              <Link
                to="/txt"
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                txt
              </Link>
              <Link
                to="/etc"
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                etc
              </Link>
            </>
          ) : (
            <>
              {/* Current page - always visible when not hovered */}
              {currentPage !== 'home' && !isTigerHovered && (
                <Link
                  to={location.pathname.startsWith('/edu') ? '/edu' : location.pathname.startsWith('/txt') ? '/txt' : '/etc'}
                  className="text-sm font-medium text-gray-900 whitespace-nowrap"
                >
                  {currentPage}
                </Link>
              )}
              {/* All links - expand on hover */}
              <div 
                className="flex items-center gap-6 overflow-hidden transition-all duration-300 ease-in-out"
                style={{
                  maxWidth: isTigerHovered ? '500px' : '0px',
                  opacity: isTigerHovered ? 1 : 0,
                  gap: isTigerHovered ? '1.5rem' : '0'
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to="/edu"
                  className={`text-sm font-medium whitespace-nowrap ${
                    currentPage === 'edu' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  edu
                </Link>
                <Link
                  to="/txt"
                  className={`text-sm font-medium whitespace-nowrap ${
                    currentPage === 'txt' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  txt
                </Link>
                <Link
                  to="/etc"
                  className={`text-sm font-medium whitespace-nowrap ${
                    currentPage === 'etc' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  etc
                </Link>
              </div>
            </>
          )}
        </div>
        {/* Social Links - Only show on home page */}
        {isHomePage && (
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/andygcui"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="https://www.instagram.com/_andycui"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="https://www.tiktok.com/@andy_cui"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="TikTok"
            >
              <FaTiktok size={18} />
            </a>
            {/* <a
              href="https://www.youtube.com/@andycui"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="YouTube"
            >
              <FaYoutube size={18} />
            </a> */}
            <a
              href="https://open.spotify.com/user/fgdbobbt7vmocnt73ukp0fqcr?si=5116222092fa473d"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Spotify"
            >
              <FaSpotify size={18} />
            </a>
            {/* <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=andy.cui@princeton.edu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Gmail"
            >
              <FaRegEnvelope size={18} />
            </a> */}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Nav
