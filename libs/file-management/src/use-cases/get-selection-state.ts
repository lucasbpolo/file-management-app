import { FileItem } from '@monorepo-app/shared-data';

export interface SelectionStateResult {
  allAvailableSelected: boolean;
  someAvailableSelected: boolean;
  selectedCount: number;
}

/**
 * Calculates the selection state based on available items and selected paths
 */
export function getSelectionState(
  availableItems: FileItem[],
  selectedPaths: Set<string>,
): SelectionStateResult {
  const allAvailableSelected =
    availableItems.length > 0 &&
    availableItems.every((item) => selectedPaths.has(item.path));

  const someAvailableSelected =
    availableItems.some((item) => selectedPaths.has(item.path)) &&
    !allAvailableSelected;

  const selectedCount = selectedPaths.size;

  return {
    allAvailableSelected,
    someAvailableSelected,
    selectedCount,
  };
}
