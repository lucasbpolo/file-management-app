import { useState, useEffect } from 'react';
import { FileItem } from '@monorepo-app/shared-data';

interface UseFileDataResult {
  data: FileItem[];
  loading: boolean;
  error: string | null;
}

export function useFileData(): UseFileDataResult {
  const [data, setData] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/data');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        const allData: FileItem[] = [];

        if (!reader) {
          throw new Error('No response body');
        }

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const jsonStr = line.slice(6);
              if (jsonStr === '[DONE]') {
                continue;
              }
              try {
                const chunkData: FileItem[] = JSON.parse(jsonStr);
                allData.push(...chunkData);
                setData([...allData]);
              } catch (e) {
                // Skip invalid JSON
              }
            }
          }
        }

        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}
