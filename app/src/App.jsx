import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Edu from './pages/Edu'
import Txt from './pages/Txt'
import Dec2025 from './pages/months/Dec2025'
import Jan2026 from './pages/months/Jan2026'
import Etc from './pages/Etc'
import Nav from './components/Nav'
import { IntroProvider } from './contexts/IntroContext'
import './App.css'

function App() {
  return (
    <IntroProvider>
      <Router>
        <div className="App">
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edu" element={<Edu />} />
            <Route path="/txt" element={<Txt />} />
            <Route path="/txt/dec2025" element={<Dec2025 />} />
            <Route path="/txt/jan2026" element={<Jan2026 />} />
            <Route path="/etc" element={<Etc />} />
          </Routes>
        </div>
      </Router>
    </IntroProvider>
  )
}

export default App
