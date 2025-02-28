import React, { ReactNode } from 'react';
import { PdfFileData } from '@/types';
import { SAVED_DOCS_EMPTY_LENGTH } from '@/constants';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components';

interface SavedPDFProps {
  savedPdfData: PdfFileData[];
  children: ReactNode;
  className?: string;
}

export const SavedPDF: React.FC<SavedPDFProps> = ({ savedPdfData, children, className }) => {
  return (
    <section className="p-2 md:p-4 order-4 md:order-2">
      <article>
        <h2 className="text-xl font-semibold mb-3">Saved Documents</h2>
        <Card className={className}>
          <CardHeader>
            <CardTitle>Saved PDFs</CardTitle>
            <CardDescription>
              {savedPdfData.length === SAVED_DOCS_EMPTY_LENGTH
                ? 'No saved pdf files so far.'
                : `${savedPdfData.length} saved document(s)`}
            </CardDescription>
          </CardHeader>
          <CardContent>{savedPdfData.length > SAVED_DOCS_EMPTY_LENGTH && children}</CardContent>
        </Card>
      </article>
    </section>
  );
};
