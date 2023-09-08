import Image from 'next/image';
import styles from './RandomAvatar.module.css';

const RandomAvatar = () => {
  return (
    <Image
      alt="avatar"
      className={styles.avatar}
      height={40}
      src="/og"
      width={40}
    />
  );
};

export default RandomAvatar;
