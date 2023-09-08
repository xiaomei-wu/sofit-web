import Settings from '@/assets/icons/setting.svg';
import RandomAvatar from '../RandomAvatar/RandomAvatar';
import Searchbar from '../Searchbar/Searchbar';
import styles from './NavBar.module.css';

const NavBar = () => {
  return (
    <div className={styles.navbar}>
      <Searchbar />
      <div className={styles.settings}>
        <Settings height={30} width={30} />
        <RandomAvatar />
      </div>
    </div>
  );
};

export default NavBar;
