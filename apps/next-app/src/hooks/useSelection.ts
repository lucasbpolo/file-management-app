'use client';

import { useState, useCallback, useMemo } from 'react';
import { FileItem } from '@monorepo-app/shared-data';
import {
  getAvailableItems,
  getSelectionState,
  selectAllAvailable,
  toggleItemSelection,
} from '@monorepo-app/file-management';

interface UseSelectionResult {
  selectedItems: Set<string>;
  availableItems: FileItem[];
  allAvailableSelected: boolean;
  someAvailableSelected: boolean;
  selectedCount: number;
  handleSelectAll: () => void;
  handleItemSelect: (path: string, isAvailable: boolean) => void;
}

export function useSelection(data: FileItem[]): UseSelectionResult {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const availableItems = useMemo(() => getAvailableItems(data), [data]);

  const { allAvailableSelected, someAvailableSelected, selectedCount } =
    useMemo(
      () => getSelectionState(availableItems, selectedItems),
      [availableItems, selectedItems],
    );

  const handleSelectAll = useCallback(() => {
    const newSelection = selectAllAvailable(
      availableItems,
      allAvailableSelected,
    );
    setSelectedItems(newSelection);
  }, [allAvailableSelected, availableItems]);

  const handleItemSelect = useCallback((path: string, isAvailable: boolean) => {
    setSelectedItems((prev) => toggleItemSelection(prev, path, isAvailable));
  }, []);

  return {
    selectedItems,
    availableItems,
    allAvailableSelected,
    someAvailableSelected,
    selectedCount,
    handleSelectAll,
    handleItemSelect,
  };
}
