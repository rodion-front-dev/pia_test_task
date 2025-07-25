import { useState, useEffect } from 'react';

import debounce from 'lodash.debounce';

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    if (value === '') {
      setDebouncedValue(value);

      return;
    }

    const handler = debounce(() => {
      setDebouncedValue(value);
    }, delay);

    handler();

    return () => handler.cancel();
  }, [value, delay]);

  return debouncedValue;
}