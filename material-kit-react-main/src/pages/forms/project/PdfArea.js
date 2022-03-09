import React, {useEffect, useState} from "react";
import {Button} from "primereact/button";
import {Toolbar} from "primereact/toolbar";
import {Dialog} from "primereact/dialog";
import FileInputComponent from "react-file-input-previews-base64";
import {toast} from "react-toastify";
import './pdf.css';
import GeneralUtils from "../../../utils/GeneralUtils";
import AttachmentService from "../../../services/AttachmentService";

export default function PdfArea({selectedId,setSelectedFiles,setNewFiles}) {

    const [showDialog, setShowDialog] = useState();
    const attachmentService = new AttachmentService();

    useEffect(() => {
        if (!GeneralUtils.isNullOrEmpty(selectedId)){
            attachmentService.findAll({id:selectedId}).then(res => {
                if (res.status == 200) {
                    if (!GeneralUtils.isNullOrEmpty(res.data) && res.data.length > 0) {
                        let result = [];
                        res.data.map(elem => {
                            result.push({
                                name: elem.name,
                                type: elem.type,
                                data: GeneralUtils.arrayBufferToBase64(elem.data.data)
                            })
                        })
                        setFiles(result);
                    }
                }
            })
        }
    }, []);


    const [files, setFiles] = useState([]);

    useEffect(()=>{
        setSelectedFiles(files);
    },[files])

    function downloadPDF(pdf) {
        const linkSource = pdf.data;
        const fileName = pdf.name;
        const downloadLink = document.createElement("a");

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    }

    const selectedFiles = (file_arr) => {
        if (file_arr.length > 3) {
            setFiles([]);
            return toast.warning("You can select max 3 files one time.");
        } else {
            let newFiles = [];
            file_arr.map(elem=>{
                let filteredArr = files.filter(a=> a.name == elem.name);
                if (filteredArr.length >0){
                    return toast.warning("You cannot upload files with the same name -> Filename = "+elem.name)
                }else{
                    newFiles.push({
                        name: elem.name,
                        data: elem.base64,
                        type: elem.type
                    })
                }
            })

            setFiles(files => [...files, ...newFiles]);
            setNewFiles(newFiles);
        }
    }

    const clearFiles = () => {
        setFiles([]);
        selectedFiles([]);
    }

    const uploadPdf = () => {
        return (
            <div>
                <div style={{display: 'flex'}}>
                    <FileInputComponent
                        labelText="Select file/files"
                        labelStyle={{fontSize: 14}}
                        multiple={true}
                        imagePreview={false}
                        callbackFunction={(file_arr) => {
                            selectedFiles(file_arr);
                        }}
                        style={{flex: 1}}
                        textBoxVisible={true}
                        accept="application/pdf,image/*"
                    />
                    {/*<div style={{flex: 1, display: 'flex', justifyContent: 'end'}}><Button onClick={clearFiles}
                                                                                           className="p-button-warning"
                                                                                           label="Clear Files"
                                                                                           icon="pi pi-trash"/>
                    </div>*/}
                </div>
                <div>
                    <div className="flex-container">
                        {files.length > 0 && files.map(elem => {
                            return <div>
                                <div className="topArea">
                                    {elem.name}
                                </div>
                                <div className="bottomArea">
                                    <span onClick={() => downloadPDF(elem)}
                                          style={{marginLeft: '1em', border: '1px solid back'}}><i
                                        className="fa fa-download fa-2x"></i></span>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        )
    }

    const getDialog = () => {
        return (
            <div className="dialog-demo">
                <div className="card">
                    <Dialog visible={showDialog} onHide={() => setShowDialog(false)} maximizable
                            breakpoints={{'960px': '75vw'}} style={{minHeight: '30em', width: '50vw'}}
                            baseZIndex={1501}
                    >
                        {uploadPdf()}
                    </Dialog>
                </div>
            </div>
        )
    }

    const rightContents = (
        <React.Fragment>
            <Button onClick={() => setShowDialog(true)} icon="pi pi-file-pdf"
                    style={{marginRight: '2px', fontSize: '2rem'}}
                    className="p-button-danger mr-2"/>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <Toolbar right={rightContents}/>
            {getDialog()}
        </React.Fragment>
    )

}