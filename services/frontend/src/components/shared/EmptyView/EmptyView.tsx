import Image from 'next/image';
import styles from './EmptyView.module.css';

export default function EmptyView({ image }: { image: string }) {
  return (
    <div className={styles.flex}>
      {image && (
        <Image src={image} width={500} height={400} alt="empty-image" />
      )}
    </div>
  );
}
