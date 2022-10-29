import React, {useEffect, useState, useRef, useCallback} from 'react';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

export const PdfViewer = props => {
  const canvasRef = useRef();
  pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

  const [pdfRef, setPdfRef] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const renderPage = useCallback(
    (pageNum, pdf = pdfRef) => {
      pdf &&
        pdf.getPage(pageNum).then(function (page) {
          const viewport = page.getViewport({scale: 1.5});
          const canvas = canvasRef.current;
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          const renderContext = {
            canvasContext: canvas.getContext('2d'),
            viewport: viewport,
          };
          page.render(renderContext);
        });
    },
    [pdfRef],
  );

  useEffect(() => {
    renderPage(currentPage, pdfRef);
  }, [pdfRef, currentPage, renderPage]);

  useEffect(() => {
    const loadingTask = pdfjsLib.getDocument(props.url);
    loadingTask.promise.then(
      loadedPdf => {
        setPdfRef(loadedPdf);
      },
      function (reason) {
        console.error(reason);
      },
    );
  }, [props.url]);

  const canvasStyle = {
    maxHeight: '100%',
  };

  return <canvas style={canvasStyle} ref={canvasRef}></canvas>;
};
