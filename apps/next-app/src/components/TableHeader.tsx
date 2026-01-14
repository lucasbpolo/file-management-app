'use client';

import styles from './FileTable.module.css';

export function TableHeader() {
  return (
    <div className={styles.tableHeader}>
      <div className={styles.headerCell}></div>
      <div className={styles.headerCell}>Name</div>
      <div className={styles.headerCell}>Device</div>
      <div className={styles.headerCell}>Path</div>
      <div className={styles.headerCell}>Status</div>
    </div>
  );
}
