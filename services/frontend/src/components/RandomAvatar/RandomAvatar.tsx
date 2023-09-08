import Image from '../../../node_modules/next/image';
import styles from './RandomAvatar.module.css'

const RandomAvatar = () => {
  return <Image src="/og" alt="avatar" width={40} height={40} className={styles.avatar}/>;
}

export default RandomAvatar