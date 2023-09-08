'use client';

import styles from './ActivityCard.module.css';
import Analysis from './Analysis/Analysis';

const ActicityCard = () => {
  return (
    <div className={styles.card}>
      <h4>Activity</h4>
      <div>
        <Analysis />
      </div>
    </div>
  );
};

export default ActicityCard;
