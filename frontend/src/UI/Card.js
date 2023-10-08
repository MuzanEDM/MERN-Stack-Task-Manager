
import styles from './Card.module.css'
// ṛeusable card Component
const Card=(props)=>{

    return(
<div className={`${styles.Card} ${props.className}`}>{props.children}</div>
    )
}

export default Card;