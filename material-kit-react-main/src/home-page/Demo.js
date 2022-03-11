import React, {useState} from 'react';
import FileInputComponent from 'react-file-input-previews-base64'
import './main.css'

const type = "pdf";
const file = "./cv.pdf";
const fileType = ['application/pdf'];

export default function Demo() {

    const [pdfFile, setPdfFile] = useState(null);
    const [files, setFiles] = useState([]);
    const [pdfFileError, setPdfFileError] = useState('');
    const [viewPdf, setViewPdf] = useState(null);

    const onError = (e) => {
        console.log(e, "error in file-viewer");
    };

    const handlePdfFileChange = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && fileType.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsDataURL(selectedFile);
                setPdfFile(selectedFile.name);
                reader.onloadend = (e) => {
                    //setPdfFile(e.target.result);
                    //setPdfFile(selectedFile.name);
                    setPdfFileError('');
                }
            } else {
                setPdfFile(null);
                setPdfFileError('Please select valid pdf file');
            }
        } else {
            console.log('select your file');
        }
    }

    const handlePdfFileSubmit = (e) => {
        e.preventDefault();
        if (pdfFile !== null) {
            setViewPdf(pdfFile);
        } else {
            setViewPdf(null);
        }
    }

    const base64toBlob = (data) => {
        // Cut the prefix `data:application/pdf;base64` from the raw base 64
        const base64WithoutPrefix = data.substr('data:application/pdf;base64,'.length);

        const bytes = atob(base64WithoutPrefix);
        let length = bytes.length;
        let out = new Uint8Array(length);

        while (length--) {
            out[length] = bytes.charCodeAt(length);
        }

        return new Blob([out], {type: 'application/pdf'});
    };

    function downloadPDF(pdf) {
        const linkSource = pdf;
        const downloadLink = document.createElement("a");
        const fileName = "vct_illustration.pdf";

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    }

    return (
        <div>
            <FileInputComponent
                labelText="Select file"
                labelStyle={{fontSize: 14}}
                multiple={true}
                imagePreview={false}
                callbackFunction={(file_arr) => {
                    setFiles(file_arr);
                }}
                textBoxVisible={true}
                accept="application/pdf,image/*"
            />

            <div>
                <div className="flex-container">
                    {files.map(elem => {
                        return <div>
                            <div className="topArea">
                                {elem.name}
                            </div>
                            <div className="bottomArea">
                                <span onClick={()=>downloadPDF(elem.base64)} style={{marginLeft:'1em',border:'1px solid back'}}><i className="fa fa-download fa-2x"></i></span>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    );
};
