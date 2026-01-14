'use client';

import styles from './FileTable.module.css';

interface FileTableErrorProps {
  error: string;
}

export function FileTableError({ error }: FileTableErrorProps) {
  return (
    <div className={styles.error} role="alert">
      <p>Error loading data: {error}</p>
    </div>
  );
}
