import React from 'react'
import { Routes, Route } from 'react-router-dom'
import StructuredHomePage from './pages/StructuredHomePage'
import SimpleStatePage from './pages/SimpleStatePage'
import SimpleAboutPage from './pages/SimpleAboutPage'

function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Routes>
        <Route path="/" element={<StructuredHomePage />} />
        <Route path="/state/:stateCode" element={<SimpleStatePage />} />
        <Route path="/about" element={<SimpleAboutPage />} />
        <Route path="*" element={<StructuredHomePage />} />
      </Routes>
    </div>
  )
}

export default App
