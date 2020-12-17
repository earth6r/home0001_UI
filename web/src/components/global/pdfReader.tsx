
import React, { useState, useEffect, useRef } from "react";
// import { Document, Page, pdfjs } from 'react-pdf';
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;




const PdfReader = ({ file }) => {

	const [numPages, setNumPages] = useState(null);
	const [showPdf, setShowPdf] = useState(false);
	const [pageNumber, setPageNumber] = useState(1);
	const [pdfHeight, setPdfHeight] = useState(1584);

 //  	function onDocumentLoadSuccess({ numPages }) {
	// 	setNumPages(numPages);
	// }
	//   useEffect(() =>{
	//   	let height = window.innerHeight - 40;
	//   	setPdfHeight(height)

	//   })

  return (
    <span>
         pdf reader disabled
    </span>
  );
};

export default PdfReader;
