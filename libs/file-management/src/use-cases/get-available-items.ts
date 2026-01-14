import { FileItem } from '@monorepo-app/shared-data';

/**
 * Filters file items to only include available items
 */
export function getAvailableItems(items: FileItem[]): FileItem[] {
  return items.filter((item) => item.status === 'available');
}
