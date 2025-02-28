import { useState } from 'react';

import { useSavedPDFs, useConvertToPdf } from '@/hooks';
import { ConversionForm, Layout, PDFViewer, SavedPDF, SavedPDFList } from '@/components';

const App = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>();
  const { savedPDFs, addPdf } = useSavedPDFs();
  const { convertText, isLoading, error } = useConvertToPdf({ addPdf, setPdfUrl });

  const handleSavedEntryClick = ({ pdfUrl }: any) => {
    setPdfUrl(pdfUrl);
  };

  return (
    <Layout>
      <main className="flex items-center justify-center h-screen">
        <div className="w-1/2 p-4 flex flex-col">
          <ConversionForm onConvert={convertText} isLoading={isLoading} apiError={error} />
          <SavedPDF savedPdfData={savedPDFs} className="mt-4">
            <SavedPDFList savedPdfData={savedPDFs} onEntryClick={handleSavedEntryClick} />
          </SavedPDF>
        </div>
        <PDFViewer pdfUrl={pdfUrl} />
      </main>
    </Layout>
  );
};

export default App;
