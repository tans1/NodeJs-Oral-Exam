import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

function Reading() {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  const totalPageNumber = 2;
  const pages = [];
  for (var i = 1; i <= totalPageNumber; i++) {
    pages.push(
      <div key={i} className="border-2 border-gray-600 mb-3">
        <Document file={"http://localhost:5000/questions/pdf"}>
          <Page pageNumber={i} scale={1.1} />
        </Document>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center mt-10">
      <div>{pages}</div>
    </div>
  );
}

export default Reading;
