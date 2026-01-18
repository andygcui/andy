import { Link, useLocation } from 'react-router-dom'
import { useIntro } from '../contexts/IntroContext'
import { FaGithub, FaTiktok, FaYoutube, FaSpotify, FaInstagram, FaRegEnvelope } from 'react-icons/fa'

function Nav() {
  const location = useLocation()
  const { showIntro, paperSliding } = useIntro()

  // Show header tiger when:
  // - Not on home page (always show)
  // - On home page but intro is done or paper is sliding (fade in)
  const isHomePage = location.pathname === '/'
  const showHeaderTiger = !isHomePage || !showIntro || paperSliding

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center"
          >
            <img 
              src="/uploads/header.png" 
              alt="home" 
              className="h-8 w-auto cursor-pointer"
              style={{ 
                filter: 'brightness(1)',
                opacity: showHeaderTiger ? 1 : 0,
                transition: 'opacity 0.6s ease-out, filter 0.2s ease-in-out'
              }}
              onMouseEnter={(e) => {
                if (showHeaderTiger) {
                  e.target.style.filter = 'brightness(1.5)'
                }
              }}
              onMouseLeave={(e) => {
                if (showHeaderTiger) {
                  e.target.style.filter = 'brightness(1)'
                }
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
        {/* Social Links */}
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
          <a
            href="https://www.youtube.com/@andycui"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="YouTube"
          >
            <FaYoutube size={18} />
          </a>
          <a
            href="https://open.spotify.com/user/fgdbobbt7vmocnt73ukp0fqcr?si=5116222092fa473d"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Spotify"
          >
            <FaSpotify size={18} />
          </a>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=andy.cui@princeton.edu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Gmail"
          >
            <FaRegEnvelope size={18} />
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Nav
