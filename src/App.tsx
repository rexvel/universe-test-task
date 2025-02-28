import { useState } from 'react';

import { useSavedPDFs, useConvertToPdf } from './hooks';
import { ConversionForm, Layout, PDFViewer, SavedPDFItem } from './components';

const App = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>();
  const { savedPDFs, addPdf, loadSavedPDF, isReady } = useSavedPDFs();
  const { convertText } = useConvertToPdf({ addPdf, setPdfUrl });

  return (
    <Layout>
      <main className="flex h-screen">
        <div className="w-1/2 p-4 flex flex-col">
          <ConversionForm onConvert={convertText} />
        </div>
        {savedPDFs.length > 0 && <SavedPDFItem entry={savedPDFs[0]} />}

        <PDFViewer pdfUrl={pdfUrl} />
      </main>
    </Layout>
  );
};

export default App;
