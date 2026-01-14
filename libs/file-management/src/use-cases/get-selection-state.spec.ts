import { getSelectionState } from './get-selection-state';
import { FileItem } from '@monorepo-app/shared-data';

describe('getSelectionState', () => {
  const availableItems: FileItem[] = [
    {
      name: 'file1.exe',
      device: 'Device1',
      path: '\\path1',
      status: 'available',
    },
    {
      name: 'file2.exe',
      device: 'Device2',
      path: '\\path2',
      status: 'available',
    },
    {
      name: 'file3.exe',
      device: 'Device3',
      path: '\\path3',
      status: 'available',
    },
  ];

  it('should return all selected when all available items are selected', () => {
    const selectedPaths = new Set(['\\path1', '\\path2', '\\path3']);

    const result = getSelectionState(availableItems, selectedPaths);

    expect(result.allAvailableSelected).toBe(true);
    expect(result.someAvailableSelected).toBe(false);
    expect(result.selectedCount).toBe(3);
  });

  it('should return some selected when some available items are selected', () => {
    const selectedPaths = new Set(['\\path1', '\\path2']);

    const result = getSelectionState(availableItems, selectedPaths);

    expect(result.allAvailableSelected).toBe(false);
    expect(result.someAvailableSelected).toBe(true);
    expect(result.selectedCount).toBe(2);
  });

  it('should return none selected when no items are selected', () => {
    const selectedPaths = new Set<string>();

    const result = getSelectionState(availableItems, selectedPaths);

    expect(result.allAvailableSelected).toBe(false);
    expect(result.someAvailableSelected).toBe(false);
    expect(result.selectedCount).toBe(0);
  });

  it('should return false for allAvailableSelected when available items array is empty', () => {
    const selectedPaths = new Set(['\\path1']);

    const result = getSelectionState([], selectedPaths);

    expect(result.allAvailableSelected).toBe(false);
    expect(result.someAvailableSelected).toBe(false);
    expect(result.selectedCount).toBe(1);
  });
});
