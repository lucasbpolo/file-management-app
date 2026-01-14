export type FileStatus = 'available' | 'scheduled';

export interface FileItem {
  name: string;
  device: string;
  path: string;
  status: FileStatus;
}
