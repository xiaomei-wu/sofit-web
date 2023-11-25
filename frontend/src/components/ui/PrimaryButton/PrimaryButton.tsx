'use client';

import { Button } from 'antd';
import { ReactNode } from 'react';
import styles from './PrimaryButton.module.css';

type PrimaryButtonType = {
  children: ReactNode;
  htmlType?: 'button' | 'submit' | 'reset' | undefined;
  onClick?: () => void;
};

export default function PrimaryButton({
  children,
  onClick,
  htmlType = 'button'
}: PrimaryButtonType) {
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
