'use client';

import styles from './FileTable.module.css';

export function FileTableLoading() {
  return (
    <div className={styles.loading} role="status" aria-live="polite">
      <div className={styles.spinner}></div>
    </div>
  );
}
