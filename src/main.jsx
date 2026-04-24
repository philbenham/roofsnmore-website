import React from 'react'
import ReactDOM from 'react-dom/client'
import { DirectionA } from './components/direction-a'
import './index.css'

const PALETTE = {
  bg: '#eaf0f7',
  ink: '#0b1a33',
  surface: '#ffffff',
  secondary: '#1866C8',
  accent: 'oklch(0.63 0.19 67)',
}
const FONT_PAIR = {
  display: "'Space Grotesk', 'Inter', sans-serif",
  body: "'Manrope', 'Inter', sans-serif",
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <DirectionA palette={PALETTE} fontPair={FONT_PAIR} heroVariant="split" />
)
