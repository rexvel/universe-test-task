import React from 'react';
import { PdfFileData } from '@/types';
import { SavedPDFItem } from './SavedPDFItem';
import { ScrollArea } from '../common/scroll-area';

interface SavedPDFListProps {
  savedPdfData: PdfFileData[];
  onEntryClick: (pdf: PdfFileData) => void;
}

export const SavedPDFList: React.FC<SavedPDFListProps> = ({ savedPdfData, onEntryClick }) => {
  return (
    <ScrollArea
      className="h-[200px] rounded-md border p-4 flex-start"
      aria-label="Scrollable list of saved PDFs"
    >
      <div className="flex flex-col items-start" role="list">
        {savedPdfData.map((pdfData: PdfFileData) => (
          <div key={pdfData.id} className="w-full mb-4" role="listitem">
            <SavedPDFItem entry={pdfData} onClick={onEntryClick} />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
