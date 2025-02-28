import { useState } from 'react';
import { convertToPdf } from '@/api';

interface UseConvertToPdfProps {
  addPdf: (pdf: any) => Promise<void>;
  setPdfUrl: (url: string | null) => void;
}

export const useConvertToPdf = ({ addPdf, setPdfUrl }: UseConvertToPdfProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const convertText = async (text: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const pdfUrl = await convertToPdf(text);

      if (!pdfUrl) {
        throw new Error('Failed to convert text to PDF');
      }

      await addPdf({
        text,
        pdfUrl,
        creationDate: new Date().toISOString(),
        name: 'Saved PDF file',
      });

      setPdfUrl(pdfUrl);
    } catch (error) {
      console.error('Error converting to PDF:', error);
      setError(error instanceof Error ? error.message : 'Failed to convert text to PDF');
    } finally {
      setIsLoading(false);
    }
  };

  return { convertText, isLoading, error };
};
