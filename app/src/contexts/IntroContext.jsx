import { createContext, useContext, useState } from 'react'

const IntroContext = createContext()

export function IntroProvider({ children }) {
  const [showIntro, setShowIntro] = useState(true)
  const [paperSliding, setPaperSliding] = useState(false)

  return (
    <IntroContext.Provider value={{ showIntro, setShowIntro, paperSliding, setPaperSliding }}>
      {children}
    </IntroContext.Provider>
  )
}

export function useIntro() {
  return useContext(IntroContext)
}
