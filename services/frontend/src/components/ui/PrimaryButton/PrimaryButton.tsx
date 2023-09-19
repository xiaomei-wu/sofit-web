'use client';

import { Button } from 'antd';
import styles from './PrimaryButton.module.css';

export default function PrimaryButton({ children, onClick, htmlType }) {
  return (
    <Button
      className={styles.primary}
      type="primary"
      onClick={onClick}
      htmlType={htmlType}
    >
      {children}
    </Button>
  );
}
