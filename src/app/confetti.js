// ConfettiAnimation.js
import React, { useState, useEffect } from 'react'
import Confetti from 'react-dom-confetti'

const confettiConfig = {
  angle: 90,
  spread: 360,
  startVelocity: 45,
  elementCount: 150,
  decay: 0.9,
  dragFriction: 0.1,
  duration: 40000,
  stagger: 0,
  width: '10px',
  height: '10px',
  perspective: '500px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a']
}

const ConfettiAnimation = () => {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setIsAnimating(true)
  }, [])

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}>
      <Confetti active={isAnimating} config={confettiConfig} />
    </div>
  )
}

export default ConfettiAnimation
