import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const encodePdfDataUrl = (pdfBase64: string): string =>
  `data:application/pdf;base64,${pdfBase64 ?? ''}`;

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
};

export const getViewportHeight = () => {
  if (window) {
    const viewportHeight = window.innerHeight;
    return viewportHeight;
  }
};

export const calculateContainerHeight = (viewportHeight: number) => {
  return viewportHeight < 700
    ? 'h-[250px]'
    : viewportHeight < 900
      ? 'h-[350px] md:h-[450px]'
      : 'h-[400px] md:h-[600px]';
};
