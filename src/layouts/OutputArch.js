import React from "react";
import '../styles/outputArch.css';

function OutputArch({selectedModels, pdfUrl}) {

    const handleDownloadClick = () => {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.setAttribute('download', 'output.txt');
        document.body.appendChild(link);
        link.click();
    }
    return (
        <div className="OutputArch">
            {Array.isArray(selectedModels) && selectedModels.map((model, index) => (
                <React.Fragment key={index}>
                    <div className="sampleModelTxt" style={{top:`${39.37 + index * 15}vw`}}>{model+" Output"}</div>
                    <div className="outputArchBox" style={{top:`${41.09 + index * 15}vw`}}>
                        <object data={pdfUrl} type="text/plain" width="100%" height="100%">
                            <p>Alternative text - include a link <a href={pdfUrl}>to the PDF!</a></p>
                        </object>
                    </div>
                    <svg className="downloadArrow" style={{top:`${52.60 + index * 15}vw`}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" onClick={handleDownloadClick}>
                        <path d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.979 19.804 4.587 19.412C4.195 19.02 3.99934 18.5493 4 18V15H6V18H18V15H20V18C20 18.55 19.804 19.021 19.412 19.413C19.02 19.805 18.5493 20.0007 18 20H6Z" fill="#0B5E97"/>
                    </svg>
                    <div className="downloadTxt" style={{top:`${52.65 + index * 15}vw`}}>Download</div>
                </React.Fragment>
            ))}
        </div>
    );
}


export default OutputArch;