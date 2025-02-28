import { useState, useEffect, useCallback } from 'react';
import { useIndexedDB } from '@/hooks';
import { indexedDbConfig } from '@/constants';
import { PdfFileData } from '@/types';

export const useSavedPDFs = () => {
  const { add, getAll, isReady } = useIndexedDB<PdfFileData>(indexedDbConfig);
  const [savedPDFs, setSavedPDFs] = useState<PdfFileData[]>([]);

  const loadSavedPDF = useCallback(async () => {
    if (isReady) {
      try {
        const pdfList = await getAll();
        setSavedPDFs(pdfList);
      } catch (error) {
        console.error('Error loading saved pdf files:', error);
      }
    }
  }, [isReady, getAll]);

  useEffect(() => {
    loadSavedPDF();
  }, [loadSavedPDF]);

  const addPdf = async (pdfData: PdfFileData) => {
    await Promise.all([add(pdfData), loadSavedPDF()]);
  };

  return {
    savedPDFs,
    addPdf,
    isReady,
  };
};
