/**
 * Selection entity - represents the state of selected file items
 */
export interface SelectionState {
  selectedPaths: Set<string>;
  totalCount: number;
}

/**
 * Creates a new empty selection state
 */
export function createEmptySelection(): SelectionState {
  return {
    selectedPaths: new Set<string>(),
    totalCount: 0,
  };
}
