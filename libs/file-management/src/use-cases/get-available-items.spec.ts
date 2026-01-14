import { getAvailableItems } from './get-available-items';
import { FileItem } from '@monorepo-app/shared-data';

describe('getAvailableItems', () => {
  const mockItems: FileItem[] = [
    {
      name: 'file1.exe',
      device: 'Device1',
      path: '\\Device\\HarddiskVolume1\\file1.exe',
      status: 'available',
    },
    {
      name: 'file2.exe',
      device: 'Device2',
      path: '\\Device\\HarddiskVolume1\\file2.exe',
      status: 'scheduled',
    },
    {
      name: 'file3.exe',
      device: 'Device3',
      path: '\\Device\\HarddiskVolume1\\file3.exe',
      status: 'available',
    },
  ];

  it('should filter only available items', () => {
    const result = getAvailableItems(mockItems);

    expect(result).toHaveLength(2);
    expect(result[0].status).toBe('available');
    expect(result[1].status).toBe('available');
    expect(result[0].name).toBe('file1.exe');
    expect(result[1].name).toBe('file3.exe');
  });

  it('should return empty array when no available items', () => {
    const scheduledItems: FileItem[] = [
      {
        name: 'file1.exe',
        device: 'Device1',
        path: '\\Device\\HarddiskVolume1\\file1.exe',
        status: 'scheduled',
      },
    ];

    const result = getAvailableItems(scheduledItems);

    expect(result).toHaveLength(0);
  });

  it('should return all items when all are available', () => {
    const allAvailable: FileItem[] = [
      {
        name: 'file1.exe',
        device: 'Device1',
        path: '\\Device\\HarddiskVolume1\\file1.exe',
        status: 'available',
      },
      {
        name: 'file2.exe',
        device: 'Device2',
        path: '\\Device\\HarddiskVolume1\\file2.exe',
        status: 'available',
      },
    ];

    const result = getAvailableItems(allAvailable);

    expect(result).toHaveLength(2);
    expect(result).toEqual(allAvailable);
  });
});
