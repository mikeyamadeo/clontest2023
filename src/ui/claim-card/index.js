import styles from './card.module.css'

const Card = ({ badge, name }) => {
  return (
    <div className={styles.card}>
      <img className={styles.image} src={badge.img} alt=' badge' />
      <a
        className={styles.button}
        href={badge.link}
        target='_blank'
        rel='noopener noreferrer'
      >
        Claim Badge
      </a>
      <p className={styles.instructions}>
        Use passcode: <strong>{badge.pw}</strong> to claim the <b>{name} Hero badge</b>.
        "Play Again" to <i>collect them all</i>
      </p>
    </div>
  )
}

export default Card
