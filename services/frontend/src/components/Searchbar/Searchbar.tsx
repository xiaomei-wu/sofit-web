import styles from './Searchbar.module.css';

const Searchbar = () => {
  return (
    <form action="#" className={styles.search}>
      <input name="search" placeholder=" Search for something..." type="text" />
    </form>
  );
};

export default Searchbar;
