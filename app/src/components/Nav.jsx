import { Link, useLocation } from 'react-router-dom'

function Nav() {
  const location = useLocation()

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="container mx-auto flex gap-6">
        <Link
          to="/"
          className={`text-sm font-medium ${
            location.pathname === '/' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={`text-sm font-medium ${
            location.pathname === '/about' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          About
        </Link>
        <Link
          to="/travel"
          className={`text-sm font-medium ${
            location.pathname === '/travel' ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Travel
        </Link>
      </div>
    </nav>
  )
}

export default Nav
