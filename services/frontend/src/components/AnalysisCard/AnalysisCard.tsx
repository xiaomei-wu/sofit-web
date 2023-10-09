'use client';

import Analysis from './Analysis/Analysis';
import styles from './AnalysisCard.module.css';

const AnalysisCard = () => {
  return (
    <div className={styles.card}>
      <h4>Analysis</h4>
      <div>
        <Analysis />
      </div>
    </div>
  );
};

export default AnalysisCard;
