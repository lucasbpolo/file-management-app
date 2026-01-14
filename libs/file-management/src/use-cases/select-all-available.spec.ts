import { selectAllAvailable } from './select-all-available';
import { FileItem } from '@monorepo-app/shared-data';

describe('selectAllAvailable', () => {
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
  ];

  it('should select all available items when none are selected', () => {
    const result = selectAllAvailable(availableItems, false);

    expect(result.size).toBe(2);
    expect(result.has('\\path1')).toBe(true);
    expect(result.has('\\path2')).toBe(true);
  });

  it('should deselect all when all are selected', () => {
    const result = selectAllAvailable(availableItems, true);

    expect(result.size).toBe(0);
  });

  it('should return empty set when available items array is empty and allSelected is false', () => {
    const result = selectAllAvailable([], false);

    expect(result.size).toBe(0);
  });

  it('should return empty set when available items array is empty and allSelected is true', () => {
    const result = selectAllAvailable([], true);

    expect(result.size).toBe(0);
  });
});
