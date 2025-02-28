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
      <main className="flex flex-col md:grid md:grid-cols-2 gap-6 min-h-screen p-4">
        <div className="flex flex-col gap-6 order-1 md:order-1">
          <section className="p-2 md:p-4">
            <article>
              <h2 className="text-xl font-semibold mb-3">Convert Text to PDF</h2>
              <ConversionForm onConvert={convertText} isLoading={isLoading} apiError={error} />
            </article>
          </section>

          <section className="p-2 md:p-4 order-3 md:hidden">
            <h2 className="text-xl font-semibold mb-3">PDF Preview</h2>
            <PDFViewer pdfUrl={pdfUrl} isLoading={isLoading} />
          </section>

          <section className="p-2 md:p-4 order-4 md:order-2">
            <article>
              <h2 className="text-xl font-semibold mb-3">Saved Documents</h2>
              <SavedPDF savedPdfData={savedPDFs}>
                <SavedPDFList savedPdfData={savedPDFs} onEntryClick={handleSavedEntryClick} />
              </SavedPDF>
            </article>
          </section>
        </div>

        <section className="p-2 md:p-4 order-2 hidden md:block md:order-2">
          <h2 className="text-xl font-semibold mb-3">PDF Preview</h2>
          <PDFViewer pdfUrl={pdfUrl} isLoading={isLoading} />
        </section>
      </main>
    </Layout>
  );
};

export default App;
