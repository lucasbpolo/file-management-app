'use client';

import { FileItem } from '@monorepo-app/shared-data';
import { StatusBadge } from './StatusBadge';
import styles from './FileTable.module.css';

interface FileTableRowProps {
  item: FileItem;
  isSelected: boolean;
  onItemSelect: (path: string, isAvailable: boolean) => void;
  style: React.CSSProperties;
  measureRef: (element: HTMLElement | null) => void;
  index: number;
}

export function FileTableRow({
  item,
  isSelected,
  onItemSelect,
  style,
  measureRef,
  index,
}: FileTableRowProps) {
  const isAvailable = item.status === 'available';

  return (
    <div
      ref={measureRef}
      data-index={index}
      className={`${styles.tableRow} ${isSelected ? styles.selected : ''}`}
      style={style}
    >
      <div className={styles.cell}>
        <input
          type="checkbox"
          checked={isSelected}
          disabled={!isAvailable}
          onChange={() => onItemSelect(item.path, isAvailable)}
          aria-label={`Select ${item.name}`}
          className={styles.checkbox}
        />
      </div>
      <div className={styles.cell}>{item.name}</div>
      <div className={styles.cell}>{item.device}</div>
      <div className={styles.cell}>{item.path}</div>
      <div className={styles.cell}>
        <StatusBadge status={item.status} />
      </div>
    </div>
  );
}
