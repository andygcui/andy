import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Edu from './pages/Edu'
import Travel from './pages/Travel'
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
            <Route path="/travel" element={<Travel />} />
          </Routes>
        </div>
      </Router>
    </IntroProvider>
  )
}

export default App
