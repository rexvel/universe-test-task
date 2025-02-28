import { useState } from 'react';

import { useSavedPDFs, useConvertToPdf } from '@/hooks';
import { ConversionForm, Layout, PDFViewer, SavedPDF, SavedPDFList } from '@/components';

const App = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>();
  const { savedPDFs, addPdf, loadSavedPDF, isReady } = useSavedPDFs();
  const { convertText } = useConvertToPdf({ addPdf, setPdfUrl });

  const handleSavedEntryClick = () => {
    // mocked handler
    // TODO: load saved pdf
  };

  return (
    <Layout>
      <main className="flex h-screen">
        <div className="w-1/2 p-4 flex flex-col">
          <ConversionForm onConvert={convertText} />
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
