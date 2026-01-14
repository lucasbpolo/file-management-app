'use client';

import styles from './FileTable.module.css';

interface DownloadSelectedButtonProps {
  selectedCount: number;
  onDownload: () => void;
}

export function DownloadSelectedButton({
  selectedCount,
  onDownload,
}: DownloadSelectedButtonProps) {
  const isDisabled = selectedCount === 0;

  return (
    <button
      onClick={() => {
        if (!isDisabled) {
          onDownload();
        }
      }}
      disabled={isDisabled}
      className={`${styles.downloadLink} ${isDisabled ? styles.disabled : ''}`}
      aria-label={`Download ${selectedCount} selected item${selectedCount !== 1 ? 's' : ''}`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.downloadIcon}
      >
        <path
          d="M8 10L8 2M8 10L5 7M8 10L11 7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 12L2 13C2 13.5523 2.44772 14 3 14L13 14C13.5523 14 14 13.5523 14 13L14 12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Download Selected
    </button>
  );
}
