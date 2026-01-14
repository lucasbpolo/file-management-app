import { FileItem } from '@monorepo-app/shared-data';

/**
 * Formats selected file items for download/export
 * Returns a formatted string with path and device information
 */
export function formatSelectedForDownload(
  items: FileItem[],
  selectedPaths: Set<string>,
): string {
  const selected = items.filter((item) => selectedPaths.has(item.path));

  if (selected.length === 0) {
    return '';
  }

  return selected
    .map((item) => `Path: ${item.path}, Device: ${item.device}`)
    .join('\n');
}
