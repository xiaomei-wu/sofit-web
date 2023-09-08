import React from 'react';
import styles from './NavBar.module.css'
import Searchbar from '../Searchbar/Searchbar';
import RandomAvatar from '../RandomAvatar/RandomAvatar';
import Settings from '../../assets/icons/setting.svg'

const NavBar = () => {
  return (
    <div className={styles.navbar}>
      <Searchbar />
      <div className={styles.settings}>
        <Settings width={30} height={30}/>
        <RandomAvatar />
      </div>
     
    </div>

  );
};

export default NavBar;
