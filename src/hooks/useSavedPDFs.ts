//@ts-nocheck
import { useState, useEffect, useCallback } from 'react';

export const useSavedPDFs = () => {
  const [savedPDFs, setSavedPDFs] = useState<[]>([]);
  const [isReady, setIsReady] = useState(true);

  const loadSavedPDF = useCallback(async () => {
    try {
      const pdfList = [];
      setSavedPDFs(pdfList);
    } catch (error) {
      console.error('Error loading saved pdf files:', error);
    }
  }, []);

  useEffect(() => {
    loadSavedPDF();
  }, [loadSavedPDF]);

  const addPdf = async (pdfData: any) => {
    setSavedPDFs(prev => [...prev, pdfData]);
  };

  return {
    savedPDFs,
    addPdf,
    loadSavedPDF,
    isReady,
  };
};
