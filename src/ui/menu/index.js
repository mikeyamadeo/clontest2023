'use client'
import Image from 'next/image'
import styles from './style.module.css'
import React, { useState, useEffect } from 'react'

const Button = ({ text, onClick }) => {
  return (
    <button className={styles.cta} onClick={onClick}>
      {text}
    </button>
  )
}

const Menu = ({ cta, chat, action, score, showPets }) => {
  return (
    <>
      {chat && <ChatBubble text={'  ' + chat} />}

      <div className={styles.container}>

        <div className={styles.section}>
          {showPets && (
            <div className={styles.petContainer}>
              <div className={styles.jumping}>
                <img width='69px' src='/petwater.png' />
              </div>
              <div className={styles.jumping}>
                <img width='69px' src='/petgrass.png' />
              </div>
              <div className={styles.jumping}>
                <img width='69px' src='/petair.png' />
              </div>
            </div>
          )}
          {score > -1 && (
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
                <div style={{ textAlign: 'center' }}>
                  Heroes Dusted
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

const useTypingEffect = (text, typingSpeed = 100, delayBeforeTyping = 0) => {
  const [displayText, setDisplayText] = useState('')

  useEffect(() => {
    let timeouts = []
    let cursor = 0

    const clearAllTimeouts = () => {
      timeouts.forEach((timeout) => clearTimeout(timeout))
      timeouts = []
    }

    const type = () => {
      if (cursor < text.length) {
        setDisplayText((prevDisplayText) => prevDisplayText + text.charAt(cursor))
        cursor += 1
        timeouts.push(setTimeout(type, typingSpeed))
      }
    }

    clearAllTimeouts()
    setDisplayText('')
    timeouts.push(setTimeout(type, delayBeforeTyping))

    return () => clearAllTimeouts()
  }, [text, typingSpeed, delayBeforeTyping])

  return displayText
}

const ChatBubble = ({ text, typingSpeed = 40 }) => {
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
