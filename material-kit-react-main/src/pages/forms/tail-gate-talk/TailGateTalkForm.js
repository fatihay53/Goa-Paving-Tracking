import './tail-gate-talk-form.css';
import logo from '../../../goa_logo.png';
import MDialog from "../../../components/mcomponents/MDialog";
import React, {useEffect, useRef, useState} from "react";
import SelectEmployee from "../../../components/mcomponents/SelectEmployee";
import TailGateTalkFormService from "../../../services/TailGateTalkFormService";
import {toast} from "react-toastify";
import AttendeesService from "../../../services/AttendeesService";
import MailService from "../../../services/MailService";
import LoadingScreen from "react-loading-screen";
import {Button} from "primereact/button";
import SelectSubject from "../../../components/mcomponents/SelectSubject";
import MSignaturePad from "../../../components/mcomponents/MSignaturePad";
import GeneralUtils from "../../../utils/GeneralUtils";
import SelectProject from "../../../components/mcomponents/SelectProject";
import {Calendar} from "primereact/calendar";

export default function TailGateTalkForm({selectedData, isShow}) {

    const [showDialog, setShowDialog] = useState(false);
    const [attendees, setAttendees] = useState([]);
    const [showedHtml, setShowedHtml] = useState({});
    const [subject, setSubject] = useState({});
    const [project, setProject] = useState({});

    const tailGateTalkFormService = new TailGateTalkFormService();
    const attendeesService = new AttendeesService();
    const mailService = new MailService();

    const [submitted, setSubmitted] = useState(false);

    const refSignaturePad = useRef();
    const [touchedSignature, setTouchedSignature] = useState(false);

    let initialState = isShow ? selectedData : {
        date: new Date(),
        location: '',
        foremanId: '',
        employeeSuggestions: '',
        signature: '',
        title: '',
        subject : ''
    };

    const [form, setForm] = useState(initialState);

    const [foreman, setForeman] = useState(
        !GeneralUtils.isNullOrEmpty(selectedData)&&!GeneralUtils.isNullOrEmpty(selectedData.foremanId) ?
            {id:selectedData.foremanId,name:selectedData.foremanName,surname:selectedData.foremanSurname} : {}
    );

    useEffect(() => {
        getAttendees();
    }, []);

    const getAttendees =()=>{
        if (isShow) {
            let formId = selectedData.id;
            //let userId = JSON.parse(localStorage.getItem('user')).userId;
            attendeesService.findAttendees({formId: formId,formType:'TAIL_GATE_TALK_FORM'}).then(res => {
                if (res.status == 200) {
                    setAttendees(res.data);
                }
            })
        }
    }

    async function saveForm() {

        if ((GeneralUtils.isNullOrEmpty(form.date)) ||
            (form.location === null || form.location === '' || form.location === undefined) ||
            (form.foremanId === null || form.foremanId === '' || form.foremanId === undefined) ||
            (project.id === null || project.id === '' || project.id === undefined) ||
            (form.title === null || form.title === '') ||
            (subject.header === null || subject.header === '' || subject.header === undefined)
        ) {
            return toast.warning("Please check required fields!")
        }

        if (!touchedSignature){
            return toast.warning("Please fill signature.");
        }

        if (attendees.length == 0) {
            return toast.warning("Please add participant!")
        }

        const signature = refSignaturePad.current.getSignature();

        setSubmitted(true);
        refSignaturePad.current.clearSignature();
        await tailGateTalkFormService.save({...form,signature:signature,subject:subject.header,estimateTemplateId: project.id,}).then(async res => {
            if (res.status == 200) {
                let insertId = res.data.insertId;
                await attendeesService.save({attendees: attendees, formId: insertId,formType:'TAIL_GATE_TALK_FORM'}).then(res => {
                    if (res.status == 200) {
                        var millisecondsToWait = 1000;
                        setTimeout(function () {
                            toast.success("Saved succesfully!");
                            setSubmitted(false);
                            setAttendees([]);
                            setSubject({});
                            setProject({});
                            setForeman({})
                            setForm({
                                date: new Date(),
                                location: '',
                                foremanId:'',
                                employeeSuggestions: '',
                                signature: '',
                                title: '',
                            });
                        }, millisecondsToWait);

                        mailService.sendMail({attendees: attendees, formId: insertId,formType:'TAIL_GATE_TALK_FORM'});
                    }
                })
            }
        })
    }

    function onChangeLocation(e) {
        const signature = refSignaturePad.current.getSignature();

        setForm({...form, location: e.target.value, signature});
    }

    function onChangeEmployeeSuggestions(e) {
        const signature = refSignaturePad.current.getSignature();

        setForm({...form, employeeSuggestions: e.target.value, signature});
    }

    function onChangeTitle(e) {
        const signature = refSignaturePad.current.getSignature();

        setForm({...form, title: e.target.value, signature});
    }

    const selectProject = () => {
        setShowDialog(true);
        setShowedHtml(<SelectProject setShowDialog={(showDialog) => setShowDialog(showDialog)}
                                     setSelections={(selections) => {
                                         setProject(selections);
                                         setShowDialog(false)
                                     }}/>);
    }

    const selectForeman = () => {
        setShowDialog(true);
        setShowedHtml(<SelectEmployee restriction="findAllForemans" selectionMode="single"
                                      setSelections={(selections) => {setForm({...form,foremanId:selections.id}); setForeman({...selections}); setShowDialog(false);}}/>);
    }

    const addCrews = () => {
        setShowDialog(true);
        setShowedHtml(<SelectEmployee
        setSelections={(selections) => setAttendees(selections)}/>);
    }

    const selectSubject=()=>{
        setShowDialog(true);
        setShowedHtml(<SelectSubject setShowDialog={(showDialog)=>setShowDialog(showDialog)} setSelections={(selections) => setSubject(selections)}/>);
    }

    let formReturn = <form style={{backgroundColor:'#f3f3fe'}} class="jotform-form" name="form_220115730197045" id="220115730197045" accept-charset="utf-8"
                           autocomplete="on"
                           onSubmit={(event) => event.preventDefault()}>

        <div role="main" className="form-all">
            <ul className="form-section page-section">
                <li className="form-line" data-type="control_image" id="id_17">
                    <div id="cid_17" className="form-input-wide" data-layout="full">
                        <div style={{textAlign: 'center'}}>
                            <img alt="" className="form-image" style={{border: 0}}
                                 src={logo}
                                 height="144px" width="150px" data-component="image"/>
                        </div>
                    </div>
                </li>
                <li id="cid_1" className="form-input-wide" data-type="control_head">
                    <div className="form-header-group  header-large">
                        <div className="header-text httac htvam">
                            <h1 id="header_1" className="form-header" data-component="header">
                                TailGate Talk Sheet
                            </h1>
                        </div>
                    </div>
                </li>
                <li
                    className="form-line form-line-column form-col-2 jf-required"
                    data-type="control_datetime"
                    id="id_18"
                >
                    <label className="form-label form-label-top form-label-auto" id="label_5" htmlFor="input_5">
                        Date
                        <span className="form-required">
            *
          </span>
                    </label>
                    <div className="p-fluid grid formgrid">
                        <Calendar id="icon" value={isShow ? new Date(form.date) : form.date} onChange={(e) => setForm({date:e.value})}
                                  dateFormat={GeneralUtils.DATE_FORMAT_CALENDAR}
                                  showIcon/>
                    </div>
                </li>
                <li className="form-line form-line-column form-col-2 jf-required" data-type="control_textbox"
                    id="id_5">
                    <label className="form-label form-label-top form-label-auto" id="label_5" htmlFor="input_5">
                        Location
                        <span className="form-required">
            *
          </span>
                    </label>
                    <div id="cid_5" className="form-input-wide jf-required" data-layout="half">
                        <input type="text" id="input_5" name="q5_typeA" data-type="input-textbox"
                               className="form-textbox  "
                               style={{width: '310px'}}
                               size="310"
                               value={form.location}
                               onChange={onChangeLocation}
                               data-component="textbox" aria-labelledby="label_5" required=""/>
                    </div>
                </li>
                <li className="form-line jf-required" data-type="control_fullname" id="id_3">
                    <label className="form-label form-label-top form-label-auto" id="label_3" htmlFor="first_3">
                        Foreman
                        <span className="form-required">
            *
          </span>
                    </label>
                    <div id="cid_3" className="form-input-wide jf-required" data-layout="full">
                        <div data-wrapper-react="true">
            <span className="form-sub-label-container" style={{verticalAlign:'top'}} data-input-type="first">
              <input type="text" id="first_3" name="q3_name[first]" className="form-textbox  " disabled={true}
                     data-defaultvalue="" autoComplete="section-input_3 given-name" size="10" value={foreman?.name ? foreman.name : ''}
                     data-component="first" aria-labelledby="label_3 sublabel_3_first" required=""/>
              <label className="form-sub-label" htmlFor="first_3" id="sublabel_3_first" style={{minHeight:'13px'}}
                     aria-hidden="false"> First Name </label>
            </span>
                            <span className="form-sub-label-container" style={{verticalAlign:'top'}}
                                  data-input-type="last">
              <input type="text" id="last_3" name="q3_name[last]" className="form-textbox  " disabled={true}
                     data-defaultvalue="" autoComplete="section-input_3 family-name" size="15" value={foreman?.surname ? foreman?.surname :''}
                     data-component="last" aria-labelledby="label_3 sublabel_3_last" required=""/>
              <label className="form-sub-label" htmlFor="last_3" id="sublabel_3_last" style={{minHeight:'13px'}}
                     aria-hidden="false"> Last Name </label>
            </span>
                            <span className="form-sub-label-container" style={{verticalAlign:'top'}} data-input-type="first">

                        <button id="input_10"
                                onClick={selectForeman}
                                className="form-submit-button-simple_orange submit-button jf-form-buttons jsTest-submitField"
                                data-component="button" data-content="">
                                Select Foreman
                            </button>
            </span>
                        </div>
                    </div>
                </li>
                <li className="form-line fixed-width jf-required" data-type="control_textbox" id="id_8">
                    <label className="form-label form-label-top form-label-auto" id="label_8" htmlFor="input_8">
                        Job Number
                        <span className="form-required">
            *
          </span>
                    </label>
                    <div id="cid_8" style={{display: 'flex'}} className="form-input-wide jf-required"
                         data-layout="half">
                        <input type="text" id="input_8" name="q8_typeA8" data-type="input-textbox"
                               className="form-textbox  " data-defaultvalue=""
                               style={{width: '520px'}}
                               disabled={true}
                               size="520"
                               value={project.project_name ? project.project_name : selectedData?.project_name ? selectedData?.project_name : ''}
                               data-component="textbox" aria-labelledby="label_8" required=""/>
                        {!isShow && <Button onClick={selectProject} icon="pi pi-search"
                                            className="p-button-sm p-button-rounded p-button-text"/>}

                    </div>
                </li>
                <li className="form-line fixed-width jf-required" data-type="control_textbox" id="id_8">
                    <label className="form-label form-label-top form-label-auto" id="label_8" htmlFor="input_8">
                        Talk Subject
                        <span className="form-required">
            *
          </span>
                    </label>
                    <div id="cid_8" style={{display:'flex'}} className="form-input-wide jf-required" data-layout="half">
                        <input type="text" id="input_8" name="q8_typeA8" data-type="input-textbox"
                               className="form-textbox  " data-defaultvalue=""
                               style={{width: '520px'}}
                               disabled={true}
                               size="520"
                               value={subject.header ? subject.header : selectedData?.subject ? selectedData?.subject : ''}
                               data-component="textbox" aria-labelledby="label_8" required=""/>
                        {!isShow&&<Button  onClick={selectSubject} icon="pi pi-search" className="p-button-sm p-button-rounded p-button-text"/>}

        </div>
                </li>
                <li className="form-line jf-required" data-type="control_matrix" id="id_9">

                    <label className="form-label form-label-top form-label-auto" id="label_9" htmlFor="input_9">
                        Attending
                        <span className="form-required">
                        *
                      </span>
                    </label>
                    <div id="cid_9" className="form-input-wide jf-required" data-layout="full">
                        <table summary="" aria-labelledby="label_9" cellPadding="4" cellSpacing="0"
                               className="form-matrix-table" data-component="matrix">
                            <tr className="form-matrix-tr form-matrix-header-tr">

                                <th scope="col"
                                    className="form-matrix-headers form-matrix-column-headers form-matrix-column_0">
                                    <label id="label_9_col_0"> Full Name </label>
                                </th>
                                <th scope="col"
                                    className="form-matrix-headers form-matrix-column-headers form-matrix-column_0">
                                    <label id="label_9_col_0"> Employee Type </label>
                                </th>
                                <th scope="col"
                                    className="form-matrix-headers form-matrix-column-headers form-matrix-column_1">
                                    <label id="label_9_col_1"> Initials
                                        <Button style={{float: 'right'}} onClick={getAttendees} icon="pi pi-refresh" className="p-button-sm p-button-rounded p-button-text"/> </label>
                                </th>
                            </tr>
                            {attendees.length > 0 && attendees.map(elem => {
                                return (
                                    <tr className="form-matrix-tr form-matrix-value-tr"
                                        aria-labelledby="label_9 label_9_row_0">
                                        <td className="form-matrix-values">
                                            <input type="text" id="input_9_0_0"
                                                   disabled={true}
                                                   className="form-textbox" size="5"
                                                   name="q9_crewAttending[0][]"
                                                   style={{width: '100%', boxSizing: 'border-box'}}
                                                   value={elem.name+' '+elem.surname}
                                                   aria-labelledby="label_9_col_0 label_9_row_0"/>
                                        </td>
                                        <td className="form-matrix-values">
                                            <input type="text"
                                                   disabled={true}
                                                   className="form-textbox" size="5"
                                                   style={{width: '100%', boxSizing: 'border-box'}}
                                                   value={elem?.employee_type}
                                                   aria-labelledby="label_9_col_0 label_9_row_0"/>
                                        </td>
                                        <td className="form-matrix-values">
                                            <img height={50} src={GeneralUtils.arrayBufferToBase64(elem.signature?.data)}/>
                                        </td>
                                    </tr>
                                )
                            })}

                        </table>
                    </div>
                </li>
                <li className="form-line" data-type="control_button" id="id_10">
                    {!isShow && <div id="cid_10" className="form-input-wide" data-layout="full">
                        <div data-align="center"
                             className="form-buttons-wrapper form-buttons-center   jsTest-button-wrapperField">
                            <button id="input_10"
                                    onClick={addCrews}
                                    className="form-submit-button-simple_orange submit-button jf-form-buttons jsTest-submitField"
                                    data-component="button" data-content="">
                                Add Attendee
                            </button>
                        </div>
                    </div>}
                </li>
                <li className="form-line" data-type="control_divider" id="id_25">
                    <div id="cid_25" className="form-input-wide" data-layout="full">
                        <div className="divider" aria-label="Divider" data-component="divider"
                             style={{
                                 borderBottomWidth: '1px',
                                 borderBottomStyle: 'solid',
                                 borderColor: '#ecedf3',
                                 height: '1px',
                                 marginLeft: '0px',
                                 marginRight: '0px',
                                 marginTop: '5px',
                                 marginBottom: '5px'
                             }}>
                        </div>
                    </div>
                </li>
                <li className="form-line" data-type="control_textarea" id="id_13">
                    <label className="form-label form-label-top form-label-auto" id="label_13"
                           htmlFor="input_13"> Employee Suggestions </label>
                    <div id="cid_13" className="form-input-wide" data-layout="full">
                            <textarea id="input_13" className="form-textarea" name="q13_typeA13"
                                      value={form.employeeSuggestions}
                                      onChange={onChangeEmployeeSuggestions}
                                      style={{width: '648px', height: '163px'}} data-component="textarea"
                                      aria-labelledby="label_13"></textarea>
                    </div>
                </li>
                <li className="form-line form-line-column form-col-1 jf-required" data-type="control_signature"
                    id="id_14">
                    <label className="form-label form-label-top form-label-auto" id="label_14" htmlFor="input_14">
                        Signature
                        <span className="form-required">
            *
          </span>
                    </label>
                    {isShow ? <img src={GeneralUtils.arrayBufferToBase64(selectedData.signature.data)}/> :
                        <div id="cid_14" className="form-input-wide jf-required" data-layout="half">
                            <div id="cid_7" className="form-input-wide jf-required" data-layout="half">
                                <MSignaturePad ref={refSignaturePad} setTouchedSignature={setTouchedSignature}/>
                            </div>
                        </div>}
                </li>
                <li className="form-line form-line-column form-col-2 jf-required" data-type="control_textbox"
                    id="id_15">
                    <label className="form-label form-label-top form-label-auto" id="label_15" htmlFor="input_15">
                        Title
                        <span className="form-required">
            *
          </span>
                    </label>
                    <div id="cid_15" className="form-input-wide jf-required" data-layout="half">
                        <input type="text" id="input_15" name="q15_typeA15" data-type="input-textbox"
                               className="form-textbox  " data-defaultvalue=""
                               style={{width: '310px'}}
                               size="310"
                               value={form.title}
                               onChange={onChangeTitle}
                               data-component="textbox" aria-labelledby="label_15" required=""/>
                    </div>
                </li>
                <li className="form-line" data-type="control_button" id="id_2">
                    {!isShow&&<div id="cid_2" className="form-input-wide" data-layout="full">
                        <div data-align="auto"
                             className="form-buttons-wrapper form-buttons-auto   jsTest-button-wrapperField">
                            <button id="input_2" type="submit"
                                    onClick={saveForm}
                                    className="submit-button jf-form-buttons jsTest-submitField"
                                    data-component="button" data-content="">
                                Submit
                            </button>
                        </div>
                    </div>}
                </li>
                <li style={{display: 'none'}}>
                    Should be Empty:
                    <input type="text" name="website" value=""/>
                </li>
            </ul>
        </div>
        {showDialog && <MDialog showedHtml={showedHtml} showDialog={showDialog} setShowDialog={setShowDialog}/>}
    </form>;

    let loading =
        <LoadingScreen
            loading={true}
            bgColor='#f1f1f1'
            spinnerColor='#9ee5f8'
            textColor='#676767'
            logoSrc={logo}
            text='Please wait. Form is saving.'
        />;

    return (submitted === true ? loading : formReturn);

}