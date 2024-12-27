import styles from './Header.module.css'
import mealsImage from '../../assets/img.png'
import CardButton from './HeaderCardButton'

const Header=props=>{
    return (
        <>
        <header className={styles.header}>
            <h1>Meals</h1>
            <CardButton/>
        </header>
        <div className={styles['main-image']}>
            <img src={mealsImage} alt='a table of meals'/>
        </div>
        </>
    )
}

export default Header