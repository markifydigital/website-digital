'use client';

import { db } from './firebase';
import { useEffect, useState, useMemo } from 'react';
import { CollectionReference, onSnapshot } from 'firebase/firestore';

export function useFirestore() {
  return db;
}

export function useMemoFirebase<T>(fn: () => T, deps: any[]) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(fn, deps);
}

export function useCollection<T>(ref: CollectionReference) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(ref, (snap) => {
      setData(
        snap.docs.map((d) => ({ id: d.id, ...d.data() } as T))
      );
      setIsLoading(false);
    });

    return () => unsub();
  }, [ref]);

  return { data, isLoading };
}
