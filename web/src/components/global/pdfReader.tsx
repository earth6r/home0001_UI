
import React, { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;




const PdfReader = ({ file }) => {

	const [numPages, setNumPages] = useState(null);
	const [showPdf, setShowPdf] = useState(false);
	const [pageNumber, setPageNumber] = useState(1);
  	// const { file } = props;
  	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}

  return (
    <>
           			<div onClick={()=> setShowPdf(true)} className="block overflow-hidden relative">
                  	<Document className="py2 block pointer-events-none relative" onLoadSuccess={onDocumentLoadSuccess} onLoadError={console.error} file={file}>
                      <Page pageNumber={1} />
                   </Document>
      
                   </div>
                   { showPdf &&
						<div className={`lightbox-pdf py-2`}>
	  
	                    <Document className={`py-2`} onLoadSuccess={onDocumentLoadSuccess} onLoadError={console.error} file={file}>
	                      <Page pageNumber={pageNumber} />
	                    </Document>
	                  

	                   	{pageNumber > 1 &&
	                   		<div className=" inline-block cursor-pointer left-arrow" onClick={()=>setPageNumber(pageNumber-1)}>←</div>
	                   	}
	                     {pageNumber < numPages &&
	                     <div className=" inline-block cursor-pointer right-arrow" onClick={()=>setPageNumber(pageNumber+1)}>→</div>
	                 	}
	                 	<div onClick={()=> setShowPdf(false)} className="pdf-close cursor-pointer uppercase text-desktopCaption underline fixed">close</div>
	                    </div>
                   }
                  
    </>
  );
};

export default PdfReader;
