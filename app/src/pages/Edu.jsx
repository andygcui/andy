function Edu() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-16">
            <h1 className="text-[2.75rem] font-serif text-gray-900 mb-4">
              .edu
            </h1>
            <p className="text-gray-600">
              i am a financial engineering student @ princeton who enjoys studying algorithms, statistics & probability; web & app development; and doing transformer-based AI research.
            </p>

            <div className="flex justify-center" style={{ marginTop: '-50px' }}>
                 <img src="/uploads/me.png" 
                 alt="me"
                 className="max-w-xs scale-40" 
                 style={{ transform: 'scale(0.4)' }}></img>
            </div>

            <p className="text-gray-600 text-center" style={{ marginTop: '40px' }}>[projects here]</p>
          
          </header>
        </div>
      </div>
    </div>
  )
}

export default Edu
