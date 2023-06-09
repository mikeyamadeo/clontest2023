'use client'
// import Image from 'next/image'
import styles from './page.module.css'
import Menu from '@ui/menu'
import { createContext, useState, useContext, useEffect } from 'react'
import '@fontsource/open-sans/400.css' // Regular weight
import '@fontsource/open-sans/700.css' // Bold weight
import '@fontsource/righteous/400.css' // Regular weight
import { getHeroList, heroConfig, getChampion } from './heroes'
import ConfettiAnimation from './confetti'
import ClaimCard from '@ui/claim-card'

export const State = createContext()

const stages = {
  petball: 'PETBALL',
  kadabra: 'KADABRA',
  heroes: 'HEROES',
  win: 'WIN',
  lose: 'LOSE'
}

const stageToBg = {
  [stages.petball]: '/bg-black.png',
  [stages.kadabra]: '/bg-purple.png',
  [stages.heroes]: '/bg-blue.png',
  [stages.win]: '/bg-champ.png',
  [stages.lose]: '/bg-black.png'

}
const StateProvider = ({ children }) => {
  const [stage, setStage] = useState(stages.petball)
  const [champ, setChampion] = useState()

  const triggerNextStage = () => {
    if (stage === stages.petball) {
      setStage(stages.kadabra)
    }
    if (stage === stages.kadabra) {
      setStage(stages.heroes)
    }
  }

  const crownChampion = (config) => {
    setChampion(config)
    setStage(stages.win)
  }

  const triggerLossState = () => {
    setStage(stages.lose)
  }

  const playAgain = () => {
    setChampion()
    setStage(stages.heroes)
  }

  return (
    <State.Provider value={{
      stage,
      triggerNextStage,
      champ,
      crownChampion,
      triggerLossState,
      playAgain,
      bg: stageToBg[stage]
    }}
    >
      {children}
    </State.Provider>
  )
}

const Petball = () => {
  const src = [
    '/petballopaque.png',
    '/petballair.png'
  ]
  const chat = [
    'Huh? Try poking it',
    'Oh my. There’s a pet in there!'
  ]
  const cta = [
    null,
    'Help Them!'
  ]
  const [stepIndex, setIndex] = useState(0)
  const toggleIndex = () => setIndex(i => i + 1)
  const { triggerNextStage } = useContext(State)

  const handle = () => {
    if (stepIndex === 0) {
      toggleIndex()
    }
  }
  return (

    <div className={styles.container}>
      <div onClick={handle}>

        <div className={styles.petballContainer}>
          <div className={styles.petball}>
            <img src={src[stepIndex]} alt={src[stepIndex]} />
          </div>
          <div className={styles.shadow} />
        </div>

      </div>
      <Menu chat={chat[stepIndex]} cta={cta[stepIndex]} action={triggerNextStage} />

    </div>
  )
}

const Kadabra = () => {
  const { triggerNextStage } = useContext(State)
  return (
    <>
      <div className={styles.container}>
        <div style={{
          position: 'absolute',
          top: '50%',
          right: '50%',
          transform: 'translateY(-300px) translateX(-100px)'
        }}
        >
          <div className={styles.levitate}>
            <img src='/petballgrass.png' alt='Grass Petball' width='100%' />
          </div>
        </div>

        <div
          className={styles.circlePath} style={{
            position: 'absolute',
            top: '50%',
            right: '50%',
            transform: 'translateY(-325px) translateX(180px)'
          }}
        >
          <div className={styles.floating}>
            <img src='/petballwater.png' alt='Water Petball' width='100%' />
          </div>
        </div>

        <div
          className={styles.zoomContainer} style={{
            position: 'absolute',
            top: '50%',
            right: '50%',
            transform: 'translateY(-5px) translateX(100px)'
          }}
        >
          <div className={styles.zoom}>
            <img src='/petballair.png' alt='Air Petball' width='100%' />
          </div>
        </div>

        <img
          className={styles.kadabra}
          src='./kadabra.gif'
          alt='Kadabra'
        />
        <Menu
          chat={`Kadabra 🥄✨, 
the most aesthetically pleasing shadow wolf alive,
has been capturing pets in shadow balls!

Something must bet done be for he catches them all!`} cta='Send Halp!' action={triggerNextStage}
        />
      </div>
    </>
  )
}

const ResponsiveGrid = ({ children }) => {
  return (
    <div className={styles.grid}>
      {children.map($ => (
        <div key={$.key} className={styles.column}>
          {$}
        </div>
      ))}

    </div>
  )
}

const TvHead = ({ isGold, ...fig }) => {
  const [showName, setShowName] = useState(false)
  const imgSrc = isGold
    ? 'gbheadgold.png'
    : fig.isDed
      ? 'gbheadbroke.png'
      : 'gbhead.png'

  return (
    <>
      <div
        className={styles.tvHeadContainer}
        onMouseEnter={() => setShowName(true)}
        onMouseLeave={() => setShowName(false)}
      >
        <div className={styles.tvScreenBg} style={{ backgroundColor: fig.bg }} />
        <div className={styles.hero}>
          <img src={fig.imgSrc} width='100%' className='heroImg' />
        </div>
        {!fig.isDed && <div className={styles.tvScreen} />}
        <div
          style={{ opacity: showName && !fig.isDed ? 1 : 0 }}
          className={styles.heroName}
        >
          {fig.name}
        </div>
        <div className={styles.tvHead}>
          <img src={imgSrc} width='100%' />
        </div>
      </div>
    </>
  )
}

const DED_THRESHOLD = 3

const states = {
  ready: 'READY',
  ded: 'DED',
  select: 'SELECT'
}
const HERO_INSTRUCTIONS = `Select A Hero!

But choose wisely... only one hero can muster the capacity to defeat the great Kadabra 🥄✨ at a time. Some never can!

Choose wrong thrice and Kadabra 🥄✨ wins!`
const Heroes = () => {
  const { crownChampion, triggerLossState } = useContext(State)
  const cta = {
    [states.ready]: 'Send Hero',
    [states.ded]: 'Select New Hero'
  }

  const [isQuesting, setIsQuesting] = useState(false)
  const [selected, setSelected] = useState(null)
  const [heroList] = useState(getHeroList())
  const [champId] = useState(getChampion())
  // const [champion, setChampion] = useState(null)
  const [deds, setDeds] = useState({})
  const addToDeds = (id) => {
    setDeds(ledger => ({
      ...ledger,
      [id]: true
    }))
  }

  const showHeroList = () => {
    setSelected()
  }
  const startQuest = () => {
    setIsQuesting(true)
  }

  const handleQuestingComplete = () => {
    if (selected.id === champId) {
      crownChampion(heroConfig[champId].champ)
    } else {
      addToDeds(selected.id)
      setSelected($ => ({
        ...heroConfig[$.id].ded,
        id: selected.id,
        isDed: true
      }))
    }
    setIsQuesting(false)
  }
  const DED_COUNT = Object.keys(deds).length

  useEffect(() => {
    if (DED_COUNT >= DED_THRESHOLD) {
      triggerLossState()
    }
  }, [DED_COUNT])

  const heroes = heroList.map(key => {
    const fig = heroConfig[key]
    const isDed = !!deds[key]
    const details = isDed ? fig.ded : fig.alive
    return {
      id: key,
      isDed,
      ...details
    }
  })

  let state = states.select
  let action = null
  if (selected) {
    const isDed = deds[selected.id]
    state = isDed ? states.ded : states.ready
    action = isDed ? showHeroList : startQuest
  }

  let chat = DED_COUNT > 0 ? `Oh dear... ${3 - DED_COUNT} more chance${DED_COUNT > 1 ? 's' : ''}! Or the pets are doomed!` : HERO_INSTRUCTIONS
  if (selected) {
    chat = selected.script
  }

  return (
    <>
      {state === states.select && (
        <div className={styles.heroContainer}>

          <ResponsiveGrid>
            {heroes.map((fig) => (
              <div
                key={fig.id}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelected(fig)}
              >
                <TvHead {...fig} />
              </div>
            ))}
          </ResponsiveGrid>
        </div>
      )}
      {(state === states.ready || state === states.ded) &&
      !isQuesting &&
       (
         <div className={styles.container}>
           <HeroQuestScreen hero={selected} onClose={showHeroList} />
         </div>
       )}

      {isQuesting && (
        <div className={styles.questContainer}>
          <Questing
            duration={2000}
            onLoadingComplete={handleQuestingComplete}
          />
        </div>
      )}

      <Menu score={DED_COUNT} chat={chat} cta={cta[state]} action={action} />
    </>
  )
}

const Questing = ({ duration = 3000, onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      if (onLoadingComplete) {
        onLoadingComplete()
      }
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onLoadingComplete])

  return (
    <div className={`container${isLoading ? '' : ' hidden'}`}>
      <div className={styles.loadingContainer}>

        <div style={{ marginRight: '24px' }}>
          <img src='https://meowpad.coolcatsnft.com/static/media/jo_loading.11d7f820bde9fa48c1ec.gif' width='150px' height='150px' />
        </div>
        <div>
          <h3 style={{ color: 'red' }}>Please Wait..</h3>
          <p>Sending hero on a quest...</p>
        </div>
      </div>
    </div>
  )
}

const HeroQuestScreen = ({ hero, onClose }) => {
  return (
    <div className={styles.heroSelectionContainer}>

      <div className={styles.selectionTitleContainter}>
        <div style={{ width: '20%' }} />
        <h1 className={styles.selectionTitle}>
          {hero.name}
        </h1>
        <div className={styles.closeIcon} onClick={onClose}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='60' height='60'>
            <path d='M18.3 5.71a.996.996 0 00-1.41 0L12 10.59 7.11 5.7A.996.996 0 105.7 7.11L10.59 12 5.7 16.89a.996.996 0 101.41 1.41L12 13.41l4.89 4.89a.996.996 0 101.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z' />
          </svg>
        </div>
      </div>

      <div className={styles.bigTvHead}>
        <TvHead {...hero} />
      </div>
    </div>
  )
}

const Champion = () => {
  const { champ, playAgain } = useContext(State)
  return (
    <div className={styles.champContainer}>
      <ConfettiAnimation />

      <ClaimCard
        {...champ}
      />

      <Menu
        showPets
        champ={champ} chat={champ.script} cta='Play Again' action={playAgain}
      />
    </div>
  )
}

const Losers = () => {
  const [claim, setClaim] = useState(false)
  const { playAgain } = useContext(State)

  const chat = claim
    ? 'The Kritten may not have been helpful but he makes for a good badge'
    : `${DED_THRESHOLD} Heroes failed to defeat Kadabra the Mighty. Those poor pets 😭

  Pro tip 1: A hero is randomly destined to "win" each round
  
  Pro tip 2: Some "heroes" will never have a chance to win
  `
  return (
    <div className={styles.container}>

      {/* <ClaimCard
        {...{
          img: '/badges/kritten.png',
          pw: 'KRITTEN',
          link:
        }}
      /> */}

      {claim
        ? (
          <ClaimCard
            {...{
              name: 'The Kritten',
              imgSrc: 'heroes/kritten.png',
              badge: {
                link: 'https://awrd.gg/4618',
                pw: 'SUSHI',
                img: '/heroes/kritten.png'
              }
            }}
          />
          )
        : (
          <>
            <div style={{
              position: 'absolute',
              top: '50%',
              right: '50%',
              transform: 'translateY(-300px) translateX(-100px)'
            }}
            >
              <div className={styles.levitate}>
                <img src='/petballgrass.png' alt='Grass Petball' width='100%' />
              </div>
            </div>
            <img
              className={styles.kadabra}
              src='./kadabra.gif'
              alt='Kadabra'
            />
          </>
          )}

      <Menu
        cta2='Claim Consolation'
        action2={() => setClaim(true)}
        chat={
        chat
        } cta='Try Again' action={playAgain}
      />
    </div>
  )
}

function Home () {
  const { stage, bg } = useContext(State)

  return (
    <>

      {stage === stages.petball && <Petball />}
      {stage === stages.kadabra && <Kadabra />}
      {stage === stages.heroes && <Heroes />}
      {stage === stages.win && <Champion />}
      {stage === stages.lose && <Losers />}

      <div className={styles.coverImageContainer}>
        <img
          className={styles.coverImage}
          src={bg}
          alt='Fracture bg'
        />
      </div>
    </>
  )
}

const Shell = () => {
  return (
    <StateProvider>
      <Home />
    </StateProvider>
  )
}

export default Shell
