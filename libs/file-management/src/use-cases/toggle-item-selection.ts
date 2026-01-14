/**
 * Toggles the selection state of a single item
 * Returns a new Set with the item added if not present, or removed if present
 */
export function toggleItemSelection(
  currentSelection: Set<string>,
  itemPath: string,
  isAvailable: boolean,
): Set<string> {
  if (!isAvailable) {
    return currentSelection;
  }

  const next = new Set(currentSelection);

  if (next.has(itemPath)) {
    next.delete(itemPath);
  } else {
    next.add(itemPath);
  }

  return next;
}
