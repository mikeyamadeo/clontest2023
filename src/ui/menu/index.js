'use client'
import Image from 'next/image'
import styles from './style.module.css'

import React, { useState, useEffect } from 'react'

// const ChatBubble = ({ text }) => {
//   return (
//     <div className={styles.chat}>
//       <p>{text}</p>
//     </div>
//   )
// }
const Button = ({ text, onClick }) => {
  return (
    <button className={styles.cta} onClick={onClick}>
      {text}
    </button>
  )
}

const Menu = ({ cta, chat, action, score }) => {
  return (
    <>
      {chat && <ChatBubble text={'  ' + chat} />}
      <div className={styles.container}>
        <div className={styles.section}>
          {score > 0 && (
            <div className={styles.scoreboardContainer}>
              <div>
                <Image
                  src='/shadowwolf.png'
                  alt='Shadow Wolf Kadabra'
                  width={90}
                  height={90}
                  priority
                />
              </div>
              <div className={styles.score}>
                <div>
                  Wins
                </div>
                <div className={styles.scoreCount}>
                  {score}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={styles.section}>
          <Image
            src='/bluecatlogo.png'
            alt='Blue Cat Logo'
            width={100}
            height={93}
            priority
          />
        </div>
        <div className={styles.section}>
          {cta && <Button text={cta} onClick={action} />}
        </div>
      </div>
    </>
  )
}

export default Menu

const useTypingEffect = (text, typingSpeed = 50) => {
  const [currentText, setCurrentText] = useState('')

  useEffect(() => {
    let index = 0
    setCurrentText('')

    const typeNextCharacter = () => {
      if (index < text.length) {
        setCurrentText((prevText) => prevText + text.charAt(index))
        index++
        setTimeout(typeNextCharacter, typingSpeed)
      }
    }

    // Call the function initially without any delay
    typeNextCharacter()

    // Cleanup function to clear any pending timeouts
    return () => {
      const maxTimeouts = 1000
      for (let i = 0; i < maxTimeouts; i++) {
        clearTimeout(i)
      }
    }
  }, [text, typingSpeed])

  return currentText
}

const ChatBubble = ({ text, typingSpeed = 50 }) => {
  const currentText = useTypingEffect(text, typingSpeed)
  return (
    <div
      className={styles.chat}
    >
      <p>
        {currentText}
      </p>
    </div>
  )
}
