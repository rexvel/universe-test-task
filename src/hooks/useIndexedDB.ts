import { useState, useEffect, useCallback, useMemo } from 'react';
import Dexie from 'dexie';

const dbInstances: Record<string, Dexie> = {};

interface UseIndexedDBOptions {
  dbName: string;
  storeName: string;
  version?: number;
}

export function useIndexedDB<T extends object>({
  dbName,
  storeName,
  version = 1,
}: UseIndexedDBOptions) {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const db = useMemo(() => {
    if (!dbInstances[dbName]) {
      const database = new Dexie(dbName);

      database.version(version).stores({
        [storeName]: '++id',
      });

      dbInstances[dbName] = database;
    }

    return dbInstances[dbName];
  }, [dbName, storeName, version]);

  useEffect(() => {
    let isMounted = true;

    const initDb = async () => {
      try {
        if (db.isOpen()) {
          if (isMounted) {
            setIsReady(true);
            setError(null);
          }
        } else {
          await db.open();
          if (isMounted) {
            setIsReady(true);
            setError(null);
          }
        }
      } catch (err) {
        console.error('Failed to open DB:', err);
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to open database'));
          setIsReady(false);
        }
      }
    };

    initDb();

    return () => {
      isMounted = false;
    };
  }, [db]);

  const add = useCallback(
    async (item: T) => {
      if (!isReady) throw new Error('Database not ready');
      return await db.table(storeName).add(item);
    },
    [db, isReady, storeName],
  );

  const getAll = useCallback(async () => {
    if (!isReady) throw new Error('Database not ready');
    return await db.table(storeName).toArray();
  }, [db, isReady, storeName]);

  const getById = useCallback(
    async (id: number) => {
      if (!isReady) throw new Error('Database not ready');
      return await db.table(storeName).get(id);
    },
    [db, isReady, storeName],
  );

  const update = useCallback(
    async (id: number, changes: Partial<T>) => {
      if (!isReady) throw new Error('Database not ready');
      return await db.table(storeName).update(id, changes);
    },
    [db, isReady, storeName],
  );

  const remove = useCallback(
    async (id: number) => {
      if (!isReady) throw new Error('Database not ready');
      return await db.table(storeName).delete(id);
    },
    [db, isReady, storeName],
  );

  return {
    add,
    getAll,
    getById,
    update,
    remove,
    isReady,
    error,
  };
}
