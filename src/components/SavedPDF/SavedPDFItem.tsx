import React from 'react';
import { PdfFileData } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components';
import { formatDate } from '@/lib/utils';

interface SavedPDFItemProps {
  entry: PdfFileData;
  onClick: (entry: PdfFileData) => void;
}

export const SavedPDFItem: React.FC<SavedPDFItemProps> = ({ entry, onClick }) => {
  const displayedDate = formatDate(entry.creationDate);

  return (
    <Card onClick={() => onClick(entry)} className="w-full mb-4 last:mb-0">
      <CardHeader>
        <CardTitle className="text-lg">{entry.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">Created: {displayedDate}</p>
      </CardContent>
    </Card>
  );
};
