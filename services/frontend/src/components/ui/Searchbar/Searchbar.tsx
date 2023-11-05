import styles from './Searchbar.module.css';

export default function Searchbar() {
  return (
    <form action="#" className={styles.search}>
      <input name="search" placeholder=" Search for something..." type="text" />
    </form>
  );
}
