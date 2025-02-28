import React, { AriaRole } from 'react';
import { PdfFileData } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components';
import { formatDate } from '@/lib/utils';

interface SavedPDFItemProps {
  entry: PdfFileData;
  onClick: (entry: PdfFileData) => void;
  role?: AriaRole;
}

export const SavedPDFItem: React.FC<SavedPDFItemProps> = ({ entry, onClick }) => {
  const displayedDate = formatDate(entry.creationDate);

  return (
    <Card
      onClick={() => onClick(entry)}
      tabIndex={0}
      aria-label={`Open PDF file preview: ${entry.name}`}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(entry);
          e.preventDefault();
        }
      }}
      className="cursor-pointer hover:shadow-md transition-shadow duration-200"
    >
      <CardHeader>
        <CardTitle className="text-lg">{entry.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">Created: {displayedDate}</p>
      </CardContent>
    </Card>
  );
};
