import React, {useEffect, useState} from "react";
import AttachmentService from "../../services/AttachmentService";
import FileInputComponent from "react-file-input-previews-base64";
import {toast} from "react-toastify";
import {Button} from "primereact/button";
import GeneralUtils from "../../utils/GeneralUtils";
import CertificateService from "../../services/CertificateService";

export default function UploadCertificate({certificates,isShow}){
    const [userId,setUserId] = useState({});
    const certificateService = new CertificateService();

    useEffect(()=>{
        let userId = JSON.parse(localStorage.getItem('user'))?.userId;
        setUserId(userId);
        if  (!GeneralUtils.isNullOrEmpty(certificates)&&isShow){
            setFiles(files => [...files, ...certificates]);
        }
    },[])

    useEffect(()=>{
        if  (!GeneralUtils.isNullOrEmpty(certificates)&&isShow){
            setFiles(files => [...files, ...certificates]);
        }
    },[certificates])

    const [files, setFiles] = useState([]);

    const saveForm=()=>{
        if (files.length > 0){
            certificateService.save({files:files,id:userId}).then(res=>{
               if (res.status == 200){
                   setFiles([]);
                   return toast.success('Certificate saved succesfully.');
               }
           })
        }else{
            return toast.warning('Please select file.')
        }
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
        }
    }

    function downloadPDF(pdf) {
        const linkSource = pdf.data;
        const fileName = pdf.name;
        const downloadLink = document.createElement("a");

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    }

    const uploadPdf = () => {
        return (
            <div>
                {!isShow&&<div style={{display: 'flex'}}>
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
                </div>}
                {!isShow&&<div style={{flex: 1, display: 'flex'}}><Button onClick={saveForm}
                                                                className="p-button-success"
                                                                label="Submit"/>                   </div>}
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

    return(uploadPdf())
}