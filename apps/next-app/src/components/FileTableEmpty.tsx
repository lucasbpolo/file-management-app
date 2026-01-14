'use client';

import styles from './FileTable.module.css';

export function FileTableEmpty() {
  return (
    <div className={styles.empty} role="status">
      <p>No data available</p>
    </div>
  );
}
