import { toggleItemSelection } from './toggle-item-selection';

describe('toggleItemSelection', () => {
  it('should add item when not in selection', () => {
    const currentSelection = new Set<string>();
    const result = toggleItemSelection(currentSelection, '\\path1', true);

    expect(result.size).toBe(1);
    expect(result.has('\\path1')).toBe(true);
  });

  it('should remove item when already in selection', () => {
    const currentSelection = new Set(['\\path1', '\\path2']);
    const result = toggleItemSelection(currentSelection, '\\path1', true);

    expect(result.size).toBe(1);
    expect(result.has('\\path1')).toBe(false);
    expect(result.has('\\path2')).toBe(true);
  });

  it('should not modify selection when item is not available', () => {
    const currentSelection = new Set(['\\path1']);
    const result = toggleItemSelection(currentSelection, '\\path2', false);

    expect(result.size).toBe(1);
    expect(result.has('\\path1')).toBe(true);
    expect(result.has('\\path2')).toBe(false);
  });

  it('should return new Set instance (immutability)', () => {
    const currentSelection = new Set(['\\path1']);
    const result = toggleItemSelection(currentSelection, '\\path2', true);

    expect(result).not.toBe(currentSelection);
    expect(currentSelection.size).toBe(1);
    expect(result.size).toBe(2);
  });
});
