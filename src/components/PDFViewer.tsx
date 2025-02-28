import { FC } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { encodePdfDataUrl } from '@/lib/utils';
import { Card, CardContent } from '@/components';
import { DEFAULT_PAGE_NUMBER } from '@/constants';
import { Nullish } from '@/types';

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

type Props = {
  pdfUrl: string | Nullish;
};

export const PDFViewer: FC<Props> = ({ pdfUrl = '' }) => {
  if (!pdfUrl) {
    return (
      <div className="w-1/2 p-4 flex justify-center">
        <Card className="w-full h-[500px] flex items-center justify-center">
          <CardContent>
            <p className="text-gray-500 text-center">
              Select or create a PDF file to preview its content
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
  const file = encodePdfDataUrl(pdfUrl);

  // TODO memo options
  return (
    <div className="flex flex-col items-center  h-[600px]">
      <Document
        loading={<div className="text-center py-4">Loading PDF...</div>}
        file={file}
        options={options}
      >
        <div className="border border-gray-200 rounded-md overflow-hidden w-[490px]">
          <Page
            pageNumber={DEFAULT_PAGE_NUMBER}
            width={400}
            className="mx-auto"
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </div>
      </Document>
    </div>
  );
};
