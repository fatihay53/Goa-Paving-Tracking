import React, {useEffect, useState} from "react";
import {Button} from "primereact/button";
import {Toolbar} from "primereact/toolbar";
import {Dialog} from "primereact/dialog";
import FileInputComponent from "react-file-input-previews-base64";
import {toast} from "react-toastify";
import './pdf.css';
import GeneralUtils from "../../../utils/GeneralUtils";
import AttachmentService from "../../../services/AttachmentService";
import { InputTextarea } from 'primereact/inputtextarea';
import {AccordionTab,Accordion} from "primereact/accordion";
import './accordion.css';
import CommentsService from "../../../services/CommentService";
import DateUtil from "../../../utils/DateUtil";

export default function PdfArea({selectedId,setSelectedFiles,setNewFiles}) {

    const [showDialog, setShowDialog] = useState(false);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [showCommentsDialog, setShowCommentsDialog] = useState(false);
    const attachmentService = new AttachmentService();
    const commentsService = new CommentsService();

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
            findComments();
        }
    }, []);


    const [files, setFiles] = useState([]);

    useEffect(()=>{
        setSelectedFiles(files);
    },[files])

    const saveComment=()=>{
        commentsService.save({
            comment,
            estimateTemplateId: selectedId,
            userId : JSON.parse(localStorage.getItem('user')).userId
        }).then(res=>{
            if (res.status == 200) {
                toast.success('Comment saved succesfully.');
                setComment('')
                findComments();
            }
        })
    }

    const findComments=()=>{
        commentsService.findComments({estimateTemplateId:selectedId}).then(res => {
            if (res.status == 200) {
                let data = res.data;
                if (!GeneralUtils.isNullOrEmpty(data) && data.length > 0) {
                    setComments(data);
                }
            }
        })
    }

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

    const renderComments = () =>{
        return(
            <div>
                <div className="card">
                    <h5>Comment</h5>
                    <InputTextarea value={comment} onChange={(e) => setComment(e.target.value)} rows={5} cols={30} />
                    <div>
                        <Button style={{marginBottom:'1em'}}
                                onClick={saveComment} label="Submit"
                            className="p-button-success mr-2"/>
                    </div>
                    <div className="accordion-demo">
                        <div className="card">
                            <Accordion>
                                {
                                    comments.length > 0 &&
                                    comments.map(elem=>{
                                        let header = elem.name + '' + elem.surname + (!GeneralUtils.isNullOrEmpty(elem.employee_type) ? ' - ' + elem.employee_type : '') + (!GeneralUtils.isNullOrEmpty(elem.created_date) ? ' - ' +  DateUtil.getDateFormat(new Date(elem.created_date),'2','-') : '') ;
                                        return <AccordionTab header={header}>
                                            <p>{elem.comment}</p>
                                        </AccordionTab>
                                    })
                                }
                            </Accordion>
                        </div>
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

    const getCommentsDialog = () => {
        return (
            <div className="dialog-demo">
                <div className="card">
                    <Dialog visible={showCommentsDialog} onHide={() => setShowCommentsDialog(false)} maximizable
                            breakpoints={{'960px': '75vw'}} style={{minHeight: '30em', width: '50vw'}}
                            baseZIndex={1501}
                    >
                        {renderComments()}
                    </Dialog>
                </div>
            </div>
        )
    }



    const rightContents = (
        <React.Fragment>
            {selectedId&&<Button onClick={() => setShowCommentsDialog(true)} icon="pi pi-comments"
                    style={{marginRight: '2px', fontSize: '2rem'}}
                    className="p-button-success mr-2"/>}
            <Button onClick={() => setShowDialog(true)} icon="pi pi-file"
                    style={{marginRight: '2px', fontSize: '2rem'}}
                    className="p-button-danger mr-2"/>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <Toolbar right={rightContents}/>
            {showDialog && getDialog()}
            {showCommentsDialog && getCommentsDialog()}
        </React.Fragment>
    )

}