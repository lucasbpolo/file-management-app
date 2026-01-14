import { FileItem } from './types';
import { generateMockData } from './mock-data';

/**
 * Simulates a streaming API that returns file data in chunks
 * @param chunkSize Number of items to return per chunk
 * @param delayMs Delay between chunks in milliseconds
 * @returns Async generator that yields chunks of FileItem arrays
 */
export async function* getDataStream(
  chunkSize = 50,
  delayMs = 100,
): AsyncGenerator<FileItem[], void, unknown> {
  const allData = generateMockData(500);
  const totalChunks = Math.ceil(allData.length / chunkSize);

  for (let i = 0; i < totalChunks; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, allData.length);
    const chunk = allData.slice(start, end);

    await new Promise((resolve) => setTimeout(resolve, delayMs));

    yield chunk;
  }
}

/**
 * Non-streaming version that returns all data at once
 * Useful for testing and non-streaming scenarios
 */
export async function getData(): Promise<FileItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return generateMockData(500);
}
