import { useEffect, useState } from 'react';

export interface Debounce {
  value: string;
  delay?: number;
}

export const useDebounce = ({ value, delay }: Debounce) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
