import { FileItem } from '@monorepo-app/shared-data';

/**
 * Toggles selection of all available items
 * Returns a new Set with all available item paths if none selected, or empty set if all selected
 */
export function selectAllAvailable(
  availableItems: FileItem[],
  allAvailableSelected: boolean,
): Set<string> {
  if (allAvailableSelected) {
    return new Set<string>();
  } else {
    return new Set(availableItems.map((item) => item.path));
  }
}
