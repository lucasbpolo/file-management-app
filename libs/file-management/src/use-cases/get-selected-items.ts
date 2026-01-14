import { FileItem } from '@monorepo-app/shared-data';

/**
 * Gets the file items that are currently selected
 */
export function getSelectedItems(
  items: FileItem[],
  selectedPaths: Set<string>,
): FileItem[] {
  return items.filter((item) => selectedPaths.has(item.path));
}
