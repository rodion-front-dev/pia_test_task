import { useMemo } from 'react';

type FilterConfig<T> = {
  data: T[] | undefined;
  filterValue: string | null;
  filterKeys: string[]; // Now accepts an array of keys
};

export const useFilteredData = <T extends Record<string, unknown>>({
  data,
  filterValue,
  filterKeys
}: FilterConfig<T>) => {
  return useMemo(() => {
    const items = data ?? [];

    if (!filterValue) {
      return items;
    }

    const normalizedFilter = filterValue.toLowerCase().trim();

    return items.filter((item) => {
      if (filterKeys.length === 0) {
        return Object.values(item).some(value =>
          String(value).toLowerCase().trim().includes(normalizedFilter)
        );
      }

      return filterKeys.some(key => {
        const value = key.split('.').reduce<unknown>((obj, k) => {
          if (typeof obj === 'object' && obj !== null && k in obj) {
            return (obj as Record<string, unknown>)[k];
          }

          return undefined;
        }, item);

        return String(value).toLowerCase().trim().includes(normalizedFilter);
      });
    });
  }, [data, filterValue, filterKeys]);
};