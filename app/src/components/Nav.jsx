import { Link, useLocation } from 'react-router-dom'
import { FaGithub, FaTiktok, FaYoutube, FaSpotify, FaInstagram, FaRegEnvelope } from 'react-icons/fa'

function Nav() {
  const location = useLocation()
  const isHomePage = location.pathname === '/home'

  return (
    <nav className="py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            to="/home"
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
              }}
              onMouseLeave={(e) => {
                e.target.style.filter = 'brightness(1)'
              }}
            />
          </Link>
          <Link
            to="/edu"
            className={`text-sm font-medium ${
              location.pathname === '/edu' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            edu
          </Link>
          <Link
            to="/txt"
            className={`text-sm font-medium ${
              location.pathname === '/txt' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            txt
          </Link>
          <Link
            to="/etc"
            className={`text-sm font-medium ${
              location.pathname === '/etc' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            etc
          </Link>
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
