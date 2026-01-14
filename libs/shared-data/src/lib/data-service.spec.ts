import { getData, getDataStream } from './data-service';
import { FileItem } from './types';

describe('data-service', () => {
  describe('getData', () => {
    it('should return an array of FileItem', async () => {
      const data = await getData();

      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      expect(data[0]).toHaveProperty('name');
      expect(data[0]).toHaveProperty('device');
      expect(data[0]).toHaveProperty('path');
      expect(data[0]).toHaveProperty('status');
    });

    it('should return 500 items by default', async () => {
      const data = await getData();

      expect(data.length).toBe(500);
    });

    it('should have valid status values', async () => {
      const data = await getData();

      data.forEach((item: FileItem) => {
        expect(['available', 'scheduled']).toContain(item.status);
      });
    });
  });

  describe('getDataStream', () => {
    it('should yield chunks of FileItem arrays', async () => {
      const chunks: FileItem[][] = [];

      for await (const chunk of getDataStream(50, 10)) {
        chunks.push(chunk);
      }

      expect(chunks.length).toBeGreaterThan(0);
      expect(chunks[0].length).toBe(50);
    });

    it('should yield all data eventually', async () => {
      const allItems: FileItem[] = [];

      for await (const chunk of getDataStream(50, 10)) {
        allItems.push(...chunk);
      }

      expect(allItems.length).toBe(500);
    });
  });
});
