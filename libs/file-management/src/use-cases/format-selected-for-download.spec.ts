import { formatSelectedForDownload } from './format-selected-for-download';
import { FileItem } from '@monorepo-app/shared-data';

describe('formatSelectedForDownload', () => {
  const items: FileItem[] = [
    {
      name: 'file1.exe',
      device: 'Device1',
      path: '\\Device\\HarddiskVolume1\\file1.exe',
      status: 'available',
    },
    {
      name: 'file2.exe',
      device: 'Device2',
      path: '\\Device\\HarddiskVolume2\\file2.exe',
      status: 'available',
    },
    {
      name: 'file3.exe',
      device: 'Device3',
      path: '\\Device\\HarddiskVolume3\\file3.exe',
      status: 'scheduled',
    },
  ];

  it('should format selected items correctly', () => {
    const selectedPaths = new Set([
      '\\Device\\HarddiskVolume1\\file1.exe',
      '\\Device\\HarddiskVolume2\\file2.exe',
    ]);

    const result = formatSelectedForDownload(items, selectedPaths);

    expect(result).toContain(
      'Path: \\Device\\HarddiskVolume1\\file1.exe, Device: Device1',
    );
    expect(result).toContain(
      'Path: \\Device\\HarddiskVolume2\\file2.exe, Device: Device2',
    );

    expect(result.split('\n')).toHaveLength(2);
  });

  it('should return empty string when no items are selected', () => {
    const selectedPaths = new Set<string>();

    const result = formatSelectedForDownload(items, selectedPaths);

    expect(result).toBe('');
  });

  it('should only include selected items', () => {
    const selectedPaths = new Set(['\\Device\\HarddiskVolume1\\file1.exe']);

    const result = formatSelectedForDownload(items, selectedPaths);

    expect(result).toContain('file1.exe');
    expect(result).not.toContain('file2.exe');
    expect(result).not.toContain('file3.exe');
    expect(result.split('\n')).toHaveLength(1);
  });

  it('should handle single item selection', () => {
    const selectedPaths = new Set(['\\Device\\HarddiskVolume2\\file2.exe']);

    const result = formatSelectedForDownload(items, selectedPaths);

    expect(result).toBe(
      'Path: \\Device\\HarddiskVolume2\\file2.exe, Device: Device2',
    );
  });
});
