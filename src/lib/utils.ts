import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const encodePdfDataUrl = (pdfBase64: string): string =>
  `data:application/pdf;base64,${pdfBase64 ?? ''}`;
