import { convertToPdf } from '@/api';

interface UseConvertToPdfProps {
  addPdf: (pdf: any) => Promise<void>;
  setPdfUrl: (url: string | null) => void;
}

export const useConvertToPdf = ({ addPdf, setPdfUrl }: UseConvertToPdfProps) => {
  const convertText = async (text: string) => {
    try {
      const pdfUrl = await convertToPdf(text);
      await addPdf({
        text,
        pdfUrl,
        creationDate: new Date().toISOString(),
        name: 'Saved PDF file',
      });
      setPdfUrl(pdfUrl);
    } catch (error) {
      console.error('Error converting to PDF:', error);
    }
  };

  return { convertText };
};
