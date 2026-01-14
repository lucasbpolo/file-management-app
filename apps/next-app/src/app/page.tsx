import Link from 'next/link';
import styles from './page.module.css';

export default function Index() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>File Management Application</h1>
        <div className={styles.description}>
          <p>
            This application demonstrates a clean architecture implementation
            with a shared business logic layer that could be used by multiple
            frontend applications.
          </p>
          <p>
            The application features a virtualized table with hundreds of file
            items, accessible selection controls, and streaming data loading for
            optimal performance.
          </p>
        </div>
        <div className={styles.links}>
          <Link href="/table" className={styles.link}>
            View Table
          </Link>
        </div>
      </div>
    </div>
  );
}
