//@ts-nocheck
import { FC, useEffect, useState } from 'react';
import { Document, Page } from 'react-pdf';

import { calculateContainerHeight, encodePdfDataUrl, getViewportHeight } from '@/lib/utils';
import { Card, CardContent } from '@/components';
import { DEFAULT_PAGE_NUMBER } from '@/constants';
import { Nullish } from '@/types';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

type Props = {
  pdfUrl: string | Nullish;
  isLoading?: boolean;
};

export const PDFViewer: FC<Props> = ({ pdfUrl = '', isLoading = false }) => {
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [pdfWidth, setPdfWidth] = useState(window.innerWidth < 768 ? 300 : 400);

  const containerHeight = calculateContainerHeight(viewportHeight);

  useEffect(() => {
    const handleResize = () => {
      const viewportHeight = getViewportHeight();
      setViewportHeight(viewportHeight);
      setPdfWidth(viewportHeight < 768 ? 300 : 400);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center">
        <Card className={`w-full ${containerHeight} flex items-center justify-center`}>
          <CardContent>
            <p className="text-gray-500 text-center">Converting your text to PDF...</p>
            <div className="mt-4 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!pdfUrl) {
    return (
      <div className="w-full flex justify-center">
        <Card className={`w-full ${containerHeight} flex items-center justify-center`}>
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

  return (
    <div
      className={`flex flex-col items-center md:h-auto md:overflow-visible ${containerHeight} overflow-auto`}
    >
      <Document
        loading={<div className="text-center py-4">Loading PDF...</div>}
        file={file}
        options={options}
      >
        <div className="border border-gray-200 rounded-md overflow-hidden w-full max-w-[320px] md:max-w-[490px]">
          <Page
            pageNumber={DEFAULT_PAGE_NUMBER}
            width={pdfWidth}
            className="mx-auto"
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </div>
      </Document>
    </div>
  );
};
