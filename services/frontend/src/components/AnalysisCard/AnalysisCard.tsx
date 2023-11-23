'use client';

import dynamic from 'next/dynamic';
import styles from './AnalysisCard.module.css';

const DynamicAnalysis = dynamic(() => import('./Analysis/Analysis'), {
  loading: () => <p>Loading...</p>
});

export default function AnalysisCard() {
  return (
    <div className={styles.card}>
      <h4>Analysis</h4>
      <div className={styles.analysis}>
        <DynamicAnalysis />
      </div>
    </div>
  );
}
