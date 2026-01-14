'use client';

import styles from './FileTable.module.css';

interface StatusBadgeProps {
  status: 'available' | 'scheduled';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`${styles.status} ${
        status === 'available' ? styles.available : styles.scheduled
      }`}
    >
      {status}
    </span>
  );
}
