import React from 'react';
import { PdfFileData } from '@/types';
import { SavedPDFItem } from './SavedPDFItem';

interface SavedPDFListProps {
  savedPdfData: PdfFileData[];
  onEntryClick: (pdf: PdfFileData) => void;
}

export const SavedPDFList: React.FC<SavedPDFListProps> = ({ savedPdfData, onEntryClick }) => {
  return (
    <>
      <div className="flex flex-col items-start">
        {savedPdfData.map((pdfData: PdfFileData) => (
          <SavedPDFItem key={pdfData.id} entry={pdfData} onClick={onEntryClick} />
        ))}
      </div>
    </>
  );
};
