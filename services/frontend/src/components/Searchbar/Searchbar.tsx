import styles from './Searchbar.module.css'

const Searchbar = () => {
  return (
        <form action="#" className={styles.search}>
            <input type="text"
                   placeholder=" Search for something..."
                   name="search" />
        </form>
)
}

export default Searchbar