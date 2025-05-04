import { DiscountType } from "@/types/checkout";
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

export function capitalizeFirstLetter(string: string) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const calculateDiscountedPrice = (
  amount: number,
  price: number,
  discount: DiscountType
) => {
  if (discount.code === "percent") {
    return amount * price * (1 - discount.amount);
  }
  return amount * price - discount.amount;
};
