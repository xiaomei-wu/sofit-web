'use client';

import Analysis from './Analysis/Analysis';
import styles from './AnalysisCard.module.css';

export default function AnalysisCard() {
  return (
    <div className={styles.card}>
      <h4>Analysis</h4>
      <div className={styles.analysis}>
        <Analysis />
      </div>
    </div>
  );
}
