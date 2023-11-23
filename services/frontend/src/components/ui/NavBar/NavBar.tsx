'use client';

import Settings from '@/assets/icons/setting.svg';
import dynamic from 'next/dynamic';
import Searchbar from '../Searchbar/Searchbar';
import styles from './NavBar.module.css';

const NoSSRRandomAvatar = dynamic(
  () => import('../RandomAvatar/RandomAvatar'),
  {
    ssr: false
  }
);

export default function NavBar() {
  return (
    <div className={styles.navbar}>
      <Searchbar />
      <div className={styles.settings}>
        <Settings height={30} width={30} />
        <NoSSRRandomAvatar />
      </div>
    </div>
  );
}
