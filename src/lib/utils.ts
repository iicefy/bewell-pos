import { clsx, type ClassValue } from "clsx";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function useDebounce<T>(
  value: T,
  delay?: number,
  callback?: () => void
): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const searchRef = useRef(value);

  useEffect(() => {
    if (searchRef.current === value) {
      return;
    }

    const handler = setTimeout(() => {
      callback?.();
      setDebouncedValue(value);
      searchRef.current = value;
    }, delay || 500);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay, callback]);

  return debouncedValue;
}
