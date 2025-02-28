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
  const hasDocuments = savedPdfData.length > SAVED_DOCS_EMPTY_LENGTH;

  return (
    <section className="p-2 md:p-4 order-4 md:order-2" aria-labelledby="saved-documents-title">
      <article>
        <h2 id="saved-documents-title" className="text-xl font-semibold mb-3">
          Saved Documents
        </h2>
        <Card className={className}>
          <CardHeader>
            <CardTitle>Saved PDFs</CardTitle>
            <CardDescription aria-live="polite">
              {!hasDocuments
                ? 'No saved pdf files so far.'
                : `${savedPdfData.length} saved document(s)`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {hasDocuments && (
              <div role="list" aria-label="List of saved PDF documents">
                {children}
              </div>
            )}
          </CardContent>
        </Card>
      </article>
    </section>
  );
};
