import { useState, useEffect, useRef } from 'react';
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
  const isMountedRef = useRef(true);
  const abortControllerRef = useRef<AbortController | null>(null);
  const readerRef = useRef<ReadableStreamDefaultReader<Uint8Array> | null>(
    null,
  );

  useEffect(() => {
    isMountedRef.current = true;
    abortControllerRef.current = new AbortController();

    const fetchData = async () => {
      try {
        if (!isMountedRef.current) return;

        setLoading(true);
        setError(null);

        const response = await fetch('/api/data', {
          signal: abortControllerRef.current?.signal,
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const reader = response.body?.getReader();

        if (!reader) {
          throw new Error('No response body');
        }

        readerRef.current = reader;

        const decoder = new TextDecoder();
        const allData: FileItem[] = [];

        while (true) {
          if (!isMountedRef.current) {
            reader.cancel();
            return;
          }

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

                if (isMountedRef.current) {
                  setData([...allData]);
                }
              } catch {
                // Skip invalid JSON
              }
            }
          }
        }

        if (isMountedRef.current) {
          setLoading(false);
        }
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }

        if (isMountedRef.current) {
          setError(err instanceof Error ? err.message : 'Unknown error');
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup: cancel reader and abort fetch
    return () => {
      isMountedRef.current = false;

      if (readerRef.current) {
        readerRef.current.cancel();
      }

      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return { data, loading, error };
}
