'use client';

import { FileTable } from '../../components/FileTable';
import { useFileData } from '../../hooks/useFileData';
import styles from './page.module.css';

export default function TablePage() {
  const { data, loading, error } = useFileData();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <h1 className={styles.title}>File Management Table</h1>
        <FileTable data={data} loading={loading} error={error} />
      </div>
    </div>
  );
}
