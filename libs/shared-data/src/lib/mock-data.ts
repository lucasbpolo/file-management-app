import { FileItem } from './types';

const fileNames = [
  'smss.exe',
  'netsh.exe',
  'uxtheme.dll',
  'aries.sys',
  'cryptbase.dll',
  '7za.exe',
  'kernel32.dll',
  'ntdll.dll',
  'user32.dll',
  'gdi32.dll',
  'advapi32.dll',
  'msvcrt.dll',
  'ws2_32.dll',
  'ole32.dll',
  'oleaut32.dll',
  'shell32.dll',
  'shlwapi.dll',
  'comctl32.dll',
  'wininet.dll',
  'urlmon.dll',
  'crypt32.dll',
  'secur32.dll',
  'wldap32.dll',
  'netapi32.dll',
  'iphlpapi.dll',
  'dhcpcsvc.dll',
  'dnsapi.dll',
  'rasapi32.dll',
  'winmm.dll',
  'version.dll',
];

const devices = [
  'Mario',
  'Luigi',
  'Peach',
  'Daisy',
  'Yoshi',
  'Toad',
  'Wario',
  'Waluigi',
  'Rosalina',
  'Bowser',
];

const volumes = ['HarddiskVolume1', 'HarddiskVolume2', 'HarddiskVolume3'];

const paths = [
  'Windows\\System32',
  'Windows\\System',
  'Windows',
  'Program Files',
  'Program Files (x86)',
  'temp',
];

const statuses: FileItem['status'][] = ['available', 'scheduled'];

function generateFileItem(index: number): FileItem {
  const baseName = fileNames[index % fileNames.length];
  const device = devices[index % devices.length];
  const volume = volumes[index % volumes.length];
  const pathSegment = paths[index % paths.length];
  const status = statuses[index % 2];

  const nameBase = baseName.split('.')[0];
  const nameExt = baseName.split('.')[1] || 'exe';
  const uniqueName = `${nameBase}_${index}.${nameExt}`;

  const uniquePath = `\\Device\\${volume}\\${pathSegment}\\${uniqueName}`;

  return {
    name: uniqueName,
    device,
    path: uniquePath,
    status,
  };
}

export function generateMockData(count = 500): FileItem[] {
  return Array.from({ length: count }, (_, i) => generateFileItem(i));
}
