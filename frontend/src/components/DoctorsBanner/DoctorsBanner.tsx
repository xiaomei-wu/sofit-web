import Image from 'next/image';
import styles from './DoctorsBanner.module.css';

export default function DoctorsBanner() {
  return (
    <div className={styles.card}>
      <Image alt="card-icon" height={35} src={'/avatars/bear.png'} width={35} />
      <Image alt="card-icon" height={35} src={'/avatars/cat.png'} width={35} />
      <Image alt="card-icon" height={35} src={'/avatars/fox.png'} width={35} />
      <Image alt="card-icon" height={35} src={'/avatars/lion.png'} width={35} />
    </div>
  );
}
