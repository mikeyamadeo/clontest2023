'use client'
export const heroConfig = {
  bun: {
    alive: {
      name: 'Bun',
      imgSrc: 'heroes/bun.png',
      script: 'Oh wow. Have you seen the Cool Score on this face face rilla? Seems Promising'
    },
    ded: {
      name: 'Jail Bun Bait',
      imgSrc: 'heroes/bun-ded.png',
      script: 'On the way to confront Kadabra and rescue the pets, Ser "Dirty" Buns was pulled over and arrested for repeated indecent nipple exposure. Turns out you can\'t save pets from jail'
    },
    champ: {
      name: 'Bunner',
      imgSrc: 'heroes/bun-champ.png',
      script: 'Kadabra had our Dirty boi against the ropes... until ser buns saw the poor pets in their balls... which sent him in to an ever mounting rage leading to his evolution and victory over the great wizard.'
    }
  },
  tasty: {
    alive: {
      name: 'Tasty Snacks',
      imgSrc: 'heroes/tasty.png',
      script: 'No one has played this role so well since Heath Ledger. I like our chances.'
    },
    ded: {
      name: 'Ded Snax',
      imgSrc: 'heroes/tasty-ded.png',
      script: 'Kadabra turned Tasty into a baja blast and started sucking out his noggin'
    },
    champ: {
      name: 'Tasty Snacks',
      imgSrc: 'heroes/tasty.png',
      script: 'Some say they hadn\'t seen such bravery since Tasty drummed up the Cool Cat community to bring the Macy\'s day parade. This same courage and bravery earned pets freedom from Kadabra the cursed.'
    }
  },
  elu: {
    alive: {
      name: 'Elu',
      imgSrc: 'heroes/elu.png',
      script: 'This boy tends to do what he puts his mind to. I like our chances'
    },
    ded: {
      name: 'Elost',
      imgSrc: 'heroes/elu-ded.png',
      script: 'As Elu was about to be Abra Kadabra\'d he screamed "WHAT IS DEAD CAN NEVER DIE!!!" As prophesied, what should have killed him resulted in Elu turning into the character he poured his soul into. Impressed by these turn of events, Kadabra granted him the power to be whatever he wanted in the afterlife.'
    },
    champ: {
      name: 'Elu',
      imgSrc: 'heroes/elu-champ.png',
      script: 'Elu summoned his chonky ghost boy fren who put the great kadabra to sleep long enough for the pets to be recovered.'
    }
  },
  lynq: {
    alive: {
      name: 'Lynq',
      imgSrc: 'heroes/lynq.png',
      script: 'Lynq the Lore Master! He must know some deep magic to help recover these pets!'
    },
    ded: {
      name: 'Lynq',
      imgSrc: 'heroes/lynq-ded.png',
      script: 'Turns out Kadabra wasn\'t on any of Lynqs maps! Something about about spoon interferance. Lynq was caught so off guard that he was unable to stop the spell that turned him into a frog.'
    },
    champ: {
      name: 'Lynq',
      imgSrc: 'heroes/lynq.png',
      script: 'Lynq challenged Kadabra to a Lore Off and... was declined. But Kadabra loves frogs so after a long discussion about $pepe total market cap and animated baby froggos Kadabra just let Lynq have the pets 🤷‍♀️'
    }
  },
  nftnick: {
    alive: {
      name: 'NFT Nick',
      imgSrc: 'heroes/nftnick.png',
      script: 'The hero nobody wants but unfortunately the web 3 space deserves'
    },
    ded: {
      name: 'NFT Nick',
      imgSrc: 'heroes/nftnick.png',
      script: 'NFT Nick got acquired OANN. Except they quickly let him go due to unreliable reporting'
    }
  },
  goodknight: {
    alive: {
      name: 'The Good Knight',
      imgSrc: 'heroes/goodknight.png',
      script: 'This should be good'
    },
    ded: {
      name: 'The Dead Knight',
      imgSrc: 'heroes/goodknight-ded.png',
      script: 'It is good night to The Good Knight. The brave soul got hit by an Avada Kadabra and was roasted in his armor. RIP Townhall Threads.'
    },
    champ: {
      name: 'The Great Knight',
      imgSrc: 'heroes/goodknight.png',
      script: 'With the might of the Cool Cats counsel at his back, The Great Knight struck Kadabra down with a fierce quote tweet that left the grand wizard no choice but to delete twitter and relinquish the pets.'
    }
  }
}

const potentialChamps = [
  'bun',
  'elu',
  'tasty',
  'lynq',
  'goodknight'
  // 'schmitty'
  // 'clon',
]

const alwaysLosers = [
  // 'kritten',
  'nftnick'
]

const currentTimestamp = new Date()
const seed = currentTimestamp.setSeconds(0, 0)

export const getHeroList = () => shuffleArray([
  ...potentialChamps,
  ...alwaysLosers
], seed)

function selectRandomString (strings) {
  const randomIndex = Math.floor(Math.random() * strings.length)
  return strings[randomIndex]
}

export const getChampion = () => {
  return selectRandomString(potentialChamps)
}

function mulberry32 (seed) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function shuffleArray (array, seed) {
  const shuffledArray = [...array]
  const random = mulberry32(seed)

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }

  return shuffledArray
}
