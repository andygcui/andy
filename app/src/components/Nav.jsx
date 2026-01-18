import { Link, useLocation } from 'react-router-dom'
import { useIntro } from '../contexts/IntroContext'

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
      <div className="container mx-auto flex items-center gap-6">
        <Link
          to="/"
          className="flex items-center"
        >
          <img 
            src="/uploads/tiger.png" 
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
          to="/"
          className={`text-sm font-medium ${
            location.pathname === '/' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          home
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
          to="/travel"
          className={`text-sm font-medium ${
            location.pathname === '/travel' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          travel
        </Link>
      </div>
    </nav>
  )
}

export default Nav
