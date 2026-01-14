'use client';

import { useRef, useCallback } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { FileItem } from '@monorepo-app/shared-data';
import { formatSelectedForDownload } from '@monorepo-app/file-management';
import { useSelection } from '../hooks/useSelection';
import { SelectAllControl } from './SelectAllControl';
import { DownloadSelectedButton } from './DownloadSelectedButton';
import { TableHeader } from './TableHeader';
import { FileTableRow } from './FileTableRow';
import { FileTableError } from './FileTableError';
import { FileTableLoading } from './FileTableLoading';
import { FileTableEmpty } from './FileTableEmpty';
import styles from './FileTable.module.css';

interface FileTableProps {
  data: FileItem[];
  loading?: boolean;
  error?: string | null;
}

export function FileTable({ data, loading, error }: FileTableProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const {
    selectedItems,
    allAvailableSelected,
    someAvailableSelected,
    selectedCount,
    handleSelectAll,
    handleItemSelect,
  } = useSelection(data);

  const handleDownload = useCallback(() => {
    const message = formatSelectedForDownload(data, selectedItems);

    if (message) {
      alert(message);
    }
  }, [data, selectedItems]);

  const virtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 10,
  });

  if (error) {
    return <FileTableError error={error} />;
  }

  if (loading && data.length === 0) {
    return <FileTableLoading />;
  }

  if (!loading && data.length === 0) {
    return <FileTableEmpty />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <SelectAllControl
          allAvailableSelected={allAvailableSelected}
          someAvailableSelected={someAvailableSelected}
          selectedCount={selectedCount}
          onSelectAll={handleSelectAll}
        />
        <DownloadSelectedButton
          selectedCount={selectedCount}
          onDownload={handleDownload}
        />
      </div>

      <div
        ref={parentRef}
        className={styles.tableContainer}
        role="table"
        aria-label="File items table"
      >
        <TableHeader />

        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualRow) => {
            const item = data[virtualRow.index];
            const isSelected = selectedItems.has(item.path);

            return (
              <FileTableRow
                key={item.path}
                item={item}
                isSelected={isSelected}
                onItemSelect={handleItemSelect}
                index={virtualRow.index}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                measureRef={(el) => {
                  virtualizer.measureElement(el);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
