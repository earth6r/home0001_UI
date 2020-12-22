
import React, { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;




const PdfReader = ({ file }) => {
	// return(
	// 	<div></div>
	// 	)
	const [numPages, setNumPages] = useState(null);
	const [showPdf, setShowPdf] = useState(false);
	const [pageNumber, setPageNumber] = useState(1);
	const [pdfHeight, setPdfHeight] = useState(1584);
  	// const { file } = props;
  	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}
	  useEffect(() =>{
	  	let height = window.innerHeight - 40;
	  	setPdfHeight(height)

	  })

  return (
    <>
           			<div onClick={()=> setShowPdf(true)} className="block overflow-hidden relative">
                  	<Document loading=" "  options={{loading: " "}} className="py2 block pointer-events-none relative" onLoadSuccess={onDocumentLoadSuccess} onLoadError={console.error} file={file}>
                      <Page pageNumber={1} />
                   </Document>
      
                   </div>
                   { showPdf &&
						<div className={`lightbox-pdf py-2`}>
	  
	                    <Document loading=" " options={{loading: " "}} className={`py-2`} onLoadSuccess={onDocumentLoadSuccess} onLoadError={console.error} file={file}>
	                      <Page height={pdfHeight}  loading=" "  pageNumber={pageNumber} />
	                    </Document>
	                  

	                   	{pageNumber > 1 &&
	                   		<div className=" inline-block cursor-pointer left-arrow" onClick={()=>setPageNumber(pageNumber-1)}>←</div>
	                   	}
	                     {pageNumber < numPages &&
	                     <div className=" inline-block cursor-pointer right-arrow" onClick={()=>setPageNumber(pageNumber+1)}>→</div>
	                 	}
	                 	<div onClick={()=> setShowPdf(false)} className="pdf-close cursor-pointer uppercase text-desktopCaption underline fixed"><svg viewBox="0 0 72.18 72.18"><defs></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><line className="cls-1" x1="0.71" y1="71.47" x2="71.47" y2="0.71"/><line className="cls-1" x1="71.47" y1="71.47" x2="0.71" y2="0.71"/></g></g></svg></div>
	                    </div>
                   }
                  
    </>
  );
};

export default PdfReader;
