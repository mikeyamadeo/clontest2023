import React from 'react'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'

const ContinuousConfetti = () => {
  const { width, height } = useWindowSize()

  return (
    <Confetti
      width={width}
      height={height}
      numberOfPieces={300}
      recycle
      gravity={0.15}
      initialVelocityY={10}
    />
  )
}

export default ContinuousConfetti
