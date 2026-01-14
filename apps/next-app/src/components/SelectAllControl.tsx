'use client';

import styles from './FileTable.module.css';

interface SelectAllControlProps {
  allAvailableSelected: boolean;
  someAvailableSelected: boolean;
  selectedCount: number;
  onSelectAll: () => void;
}

export function SelectAllControl({
  allAvailableSelected,
  someAvailableSelected,
  selectedCount,
  onSelectAll,
}: SelectAllControlProps) {
  return (
    <div className={styles.selectAllContainer}>
      <input
        type="checkbox"
        id="select-all"
        checked={allAvailableSelected}
        ref={(el) => {
          if (el) {
            el.indeterminate = someAvailableSelected;
          }
        }}
        onChange={onSelectAll}
        aria-label="Select all available items"
        className={styles.checkbox}
      />
      <label htmlFor="select-all" className={styles.selectAllLabel}>
        {selectedCount === 0
          ? 'No items selected'
          : `${selectedCount} item${selectedCount !== 1 ? 's' : ''} selected`}
      </label>
    </div>
  );
}
