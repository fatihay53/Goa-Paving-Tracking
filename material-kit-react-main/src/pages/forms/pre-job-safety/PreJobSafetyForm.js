import {JotFormConfig} from "../../JotFormConfig";
import React, {useEffect, useRef, useState} from "react";
import './pre-job-safety-form.css'
import {Button} from "primereact/button";
import SelectEmployee from "../../../components/mcomponents/SelectEmployee";
import MDialog from "../../../components/mcomponents/MDialog";
import MSignaturePad from "../../../components/mcomponents/MSignaturePad";
import GeneralUtils from "../../../utils/GeneralUtils";
import {GENERAL_OPTIONS} from "./generaloptions";
import {ENVIRONMENT_OPTIONS} from "./enviromentoptions";
import {HAZARDOUS_OPTIONS} from "./hazardousoptions";
import SelectProject from "../../../components/mcomponents/SelectProject";
import {toast} from "react-toastify";
import PreJobSafetyFormService from "../../../services/PreJobSafetyFormService";
import AttendeesService from "../../../services/AttendeesService";
import LoadingScreen from "react-loading-screen";
import logo from "../../../goa_logo.png";
import MailService from "../../../services/MailService";
import {Calendar} from "primereact/calendar";

export default function PreJobSafetyForm({selectedData, isShow}) {

    const [attendees, setAttendees] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [showedHtml, setShowedHtml] = useState({});
    const [project, setProject] = useState({});
    const [taskList, setTaskList] = useState(isShow ? JSON.parse(selectedData.task_list) : []);
    const [possibleHazardList, setPossibleHazardList] = useState(isShow ? JSON.parse(selectedData.possible_hazard_list) : []);
    const [hazardControlList, setHazardControlList] = useState(isShow ? JSON.parse(selectedData.hazard_control_list) : []);
    const [submitted, setSubmitted] = useState(false);
    const refSignaturePadForeman = useRef();
    const [touchedSignatureForeman, setTouchedSignatureForeman] = useState(false);
    const [tasks, setTasks] = useState([]);
    const preJobSafetyFormService = new PreJobSafetyFormService();
    const attendeesService = new AttendeesService();
    const mailService = new MailService();

    const [checkedStateGenerals, setCheckedStateGenerals] = useState(
        isShow ? JSON.parse(selectedData.general_options) : new Array(GENERAL_OPTIONS.length).fill(false)
    );

    const [checkedStateEnviroments, setCheckedStateEnviroments] = useState(
        isShow ? JSON.parse(selectedData.environment_options) : new Array(ENVIRONMENT_OPTIONS.length).fill(false)
    );

    const [checkedStateHazarDous, setCheckedStateHazarDous] = useState(
        isShow ? JSON.parse(selectedData.hazardous_options) : new Array(HAZARDOUS_OPTIONS.length).fill(false)
    );

    const [foreman, setForeman] = useState(
        !GeneralUtils.isNullOrEmpty(selectedData)&&!GeneralUtils.isNullOrEmpty(selectedData.foremanId) ?
            {id:selectedData.foremanId,name:selectedData.foremanName,surname:selectedData.foremanSurname} : {}
    );

    const handleOnChangeGenerals = (position) => {
        const updatedCheckedState = checkedStateGenerals.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedStateGenerals(updatedCheckedState);
    };

    const handleOnChangeEnvironments = (position) => {
        const updatedCheckedState = checkedStateEnviroments.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedStateEnviroments(updatedCheckedState);
    };

    const handleOnChangeHazarDous = (position) => {
        const updatedCheckedState = checkedStateHazarDous.map((item, index) =>
            index === position ? !item : item
        );
        setCheckedStateHazarDous(updatedCheckedState);
    };

    useEffect(() => {
        //JotFormConfig();
        let length = taskList.length;
        if (length == 0) {
            addNewTask();
        } else {
            taskList.forEach(elem => {
                addNewTask();
            });
        }
        getAttendees();
    }, []);

    const getAttendees = () => {
        if (isShow) {
            let formId = selectedData.id;
            //let userId = JSON.parse(localStorage.getItem('user')).userId;
            attendeesService.findAttendees({formId: formId,formType:'PRE_JOB_SAFETY_FORM'}).then(res => {
                if (res.status == 200) {
                    setAttendees(res.data);
                }
            })
        }
    }

    const addCrews = () => {
        setShowDialog(true);
        setShowedHtml(<SelectEmployee
            setSelections={(selections) => setAttendees(selections)}/>);
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

    const addNewTask = () => {
        setTasks(tasks => [...tasks, "Increment"]);
    }

    const onChangeTaskList = (e, index) => {
        let value = e.target.value;
        let task = [...taskList];
        task[index] = value;
        setTaskList(task);
    }

    const onChangePossibleHazardList = (e, index) => {
        let value = e.target.value;
        let task = [...possibleHazardList];
        task[index] = value;
        setPossibleHazardList(task);
    }

    const onChangeHazardControlList = (e, index) => {
        let value = e.target.value;
        let task = [...hazardControlList];
        task[index] = value;
        setHazardControlList(task);
    }

    let initialState = isShow ? selectedData : {
        date: new Date(),
        location: '',
        foremanId: '',
        signatureForeman: '',
        others: ''
    };

    const [form, setForm] = useState(initialState);

    function onChangeLocation(e) {
        const signatureForeman = refSignaturePadForeman.current.getSignature();

        setForm({...form, location: e.target.value, signatureForeman});
    }

    function onChangeOthers(e) {
        const signatureForeman = refSignaturePadForeman.current.getSignature();

        setForm({...form, others: e.target.value, signatureForeman});
    }

    const saveForm = async () => {
        if ((GeneralUtils.isNullOrEmpty(form.date)) ||
            (form.location === null || form.location === '') ||
            (form.foremanId === null || form.foremanId === '' || form.foremanId === undefined) ||
            (project.id === null || project.id === '' || project.id === undefined)
        ) {
            return toast.warning("Please check required fields!")
        }

        if (!touchedSignatureForeman) {
            return toast.warning("Please fill signature foreman.");
        }

        if (checkedStateGenerals.filter(e => e == true).length == 0) {
            return toast.warning("Please select general options.");
        }

        if (checkedStateEnviroments.filter(e => e == true).length == 0) {
            return toast.warning("Please select environment options.");
        }

        if (checkedStateHazarDous.filter(e => e == true).length == 0) {
            return toast.warning("Please select hazardous materials options.");
        }

        if (attendees.length == 0) {
            return toast.warning("Please add participant!")
        }

        const signatureForeman = refSignaturePadForeman.current.getSignature();
        let request = {
            ...form,
            signatureForeman: signatureForeman,
            estimateTemplateId: project.id,
            generalOptions: checkedStateGenerals,
            environmentOptions: checkedStateEnviroments,
            hazardousOptions: checkedStateHazarDous,
            taskList: taskList,
            possibleHazardList: possibleHazardList,
            hazardControlList: hazardControlList
        };

        setSubmitted(true);
        refSignaturePadForeman.current.clearSignature();

        await preJobSafetyFormService.save(request).then(async res => {
            if (res.status == 200) {
                let insertId = res.data.insertId;
                await attendeesService.save({
                    attendees: attendees,
                    formId: insertId,
                    formType: 'PRE_JOB_SAFETY_FORM'
                }).then(res => {
                    if (res.status == 200) {
                        var millisecondsToWait = 1000;
                        setTimeout(function () {
                            toast.success("Saved succesfully!");
                            setCheckedStateGenerals(new Array(GENERAL_OPTIONS.length).fill(false));
                            setCheckedStateEnviroments(new Array(ENVIRONMENT_OPTIONS.length).fill(false));
                            setCheckedStateHazarDous(new Array(HAZARDOUS_OPTIONS.length).fill(false));
                            setTaskList([]);
                            setPossibleHazardList([]);
                            setHazardControlList([]);
                            setSubmitted(false);
                            setAttendees([]);
                            setProject({});
                            setForeman({});
                            setForm({
                                date: new Date(),
                                location: '',
                                foremanId: '',
                                signatureForeman: '',
                                others: ''
                            });
                        }, millisecondsToWait);

                        mailService.sendMail({attendees: attendees, formId: insertId,formType:'PRE_JOB_SAFETY_FORM'});
                    }
                })
            }
        })
    }

    let formReturn = <form style={{backgroundColor:'#f3f3fe'}} className="jotform-form" autoComplete="on" onSubmit={(event) => event.preventDefault()}>

        <div role="main" className="form-all">
            <ul className="form-section page-section">
                <li className="form-line" data-type="control_image" id="id_3">
                    <div id="cid_3" className="form-input-wide">
                        <div style={{textAlign: 'center'}}>
                            <img alt="" className="form-image" style={{border: '0'}}
                                 src="https://www.jotform.com/uploads/f.sultanay/form_files/goa%20icon.61ddff3009abe5.53087226.jpg"
                                 height="144px" width="150px" data-component="image"/>
                        </div>
                    </div>
                </li>
                <li id="cid_1" className="form-input-wide" data-type="control_head">
                    <div className="form-header-group  header-default">
                        <div className="header-text httac htvam">
                            <h2 id="header_1" className="form-header" data-component="header">
                                Pre-Job Safety Instruction
                            </h2>
                        </div>
                    </div>
                </li>
                <li className="form-line form-line-column form-col-1 jf-required" data-type="control_datetime"
                    id="id_4">
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
                    <label className="form-label form-label-top" id="label_5" htmlFor="input_5">
                        Location
                        <span className="form-required">
            *
          </span>
                    </label>
                    <div id="cid_5" className="form-input-wide jf-required">
                        <input type="text" id="input_5" name="q5_location" data-type="input-textbox"
                               className="form-textbox validate[required]" data-defaultvalue="" size="30"
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
                <li className="form-line form-line-column form-col-4 jf-required" data-type="control_signature"
                    id="id_7">
                    <label className="form-label form-label-top form-label-auto" id="label_7" htmlFor="input_7">
                        Analysis Completed By
                        <span className="form-required">
            *
          </span>
                    </label>
                    {isShow ? <img src={GeneralUtils.arrayBufferToBase64(selectedData.signatureForeman.data)}/> :
                        <div id="cid_7" className="form-input-wide jf-required" data-layout="half">
                            <MSignaturePad ref={refSignaturePadForeman}
                                           setTouchedSignature={setTouchedSignatureForeman}/>
                        </div>}
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
                <li className="form-line form-line-column form-col-1 jf-required" data-type="control_checkbox"
                    id="id_8">
                    <label className="form-label form-label-top form-label-auto" id="label_8" htmlFor="input_8">
                        General
                        <span className="form-required">
            *
          </span>
                    </label>
                    <div id="cid_8" className="form-input-wide jf-required">
                        <div className="form-single-column" role="group" aria-labelledby="label_8"
                             data-component="checkbox">
                            {
                                GENERAL_OPTIONS.map(({name}, index) => {
                                    return (
                                        <span className="form-checkbox-item" style={{clear: 'left'}} key={index}>
                                              <span className="dragger-item">
                                              </span>
                                              <input type="checkbox"
                                                  //className="form-checkbox"
                                                     id={`custom-checkbox-${index}`}
                                                     name={name}
                                                     checked={checkedStateGenerals[index]}
                                                     onChange={() => handleOnChangeGenerals(index)}
                                              />
                                              <label id="label_input_8_0"
                                                     htmlFor="input_8_0"> {name} </label>
                                            </span>
                                    )
                                })
                            }
                        </div>
                    </div>
                </li>
                <li className="form-line form-line-column form-col-2 jf-required" data-type="control_checkbox"
                    id="id_9">
                    <label className="form-label form-label-top form-label-auto" id="label_9" htmlFor="input_9">
                        Environment
                        <span className="form-required">
            *
          </span>
                    </label>
                    <div id="cid_9" className="form-input-wide jf-required">
                        <div className="form-single-column" role="group" aria-labelledby="label_9"
                             data-component="checkbox">
                            {
                                ENVIRONMENT_OPTIONS.map(({name}, index) => {
                                    return (
                                        <span className="form-checkbox-item" style={{clear: 'left'}} key={index}>
                                              <span className="dragger-item">
                                              </span>
                                              <input type="checkbox"
                                                     id={`custom-checkbox-${index}`}
                                                     name={name}
                                                     checked={checkedStateEnviroments[index]}
                                                     onChange={() => handleOnChangeEnvironments(index)}
                                              />
                                              <label id="label_input_8_0"
                                                     htmlFor="input_8_0"> {name} </label>
                                            </span>
                                    )
                                })
                            }
                        </div>
                    </div>
                </li>
                <li className="form-line form-line-column form-col-3 jf-required" data-type="control_checkbox"
                    id="id_10">
                    <label className="form-label form-label-top form-label-auto" id="label_10" htmlFor="input_10">
                        Hazardous Materials
                        <span className="form-required">
            *
          </span>
                    </label>
                    <div id="cid_10" className="form-input-wide jf-required">
                        <div className="form-single-column" role="group" aria-labelledby="label_10"
                             data-component="checkbox">
                            {
                                HAZARDOUS_OPTIONS.map(({name}, index) => {
                                    return (
                                        <span className="form-checkbox-item" style={{clear: 'left'}} key={index}>
                                              <span className="dragger-item">
                                              </span>
                                              <input type="checkbox"
                                                     id={`custom-checkbox-${index}`}
                                                     name={name}
                                                     checked={checkedStateHazarDous[index]}
                                                     onChange={() => handleOnChangeHazarDous(index)}
                                              />
                                              <label id="label_input_8_0"
                                                     htmlFor="input_8_0"> {name} </label>
                                            </span>
                                    )
                                })
                            }
                        </div>
                    </div>
                </li>
                <li className="form-line form-line-column form-col-4" data-type="control_textarea" id="id_12">
                    <label className="form-label form-label-top form-label-auto" id="label_12"
                           htmlFor="input_12"> Others </label>
                    <div id="cid_12" className="form-input-wide">
                            <textarea value={form.others}
                                      onChange={onChangeOthers}
                                      id="input_12" className="form-textarea" name="q12_typeA12" cols="40" rows="6"
                                      style={{overflowY: 'hidden'}} data-widearea="enable" data-component="textarea"
                                      aria-labelledby="label_12"></textarea>
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

                                        <Button style={{float: 'right'}} onClick={getAttendees}
                                                icon="pi pi-refresh"
                                                className="p-button-sm p-button-rounded p-button-text"/> </label>

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
                                                   value={elem.name + ' ' + elem.surname}
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
                                            <img height={50}
                                                 src={GeneralUtils.arrayBufferToBase64(elem.signature?.data)}/>
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
                <li className="form-line form-line-column form-col-1 form-field-hidden" style={{display: 'none'}}
                    data-type="control_fullname" id="id_51">
                    <label className="form-label form-label-top form-label-auto" id="label_51"
                           htmlFor="first_51"> Name </label>
                    <div id="cid_51" className="form-input-wide">
                        <div data-wrapper-react="true">
            <span className="form-sub-label-container" style={{verticalAlign: 'top'}} data-input-type="first">
              <input type="text" id="first_51" name="q51_name[first]" className="form-textbox" data-defaultvalue=""
                     autoComplete="section-input_51 given-name" size="10" value="" data-component="first"
                     aria-labelledby="label_51 sublabel_51_first"/>
              <label className="form-sub-label" htmlFor="first_51" id="sublabel_51_first" style={{minHeight: '13px'}}
                     aria-hidden="false"> First Name </label>
            </span>
                            <span className="form-sub-label-container" style={{verticalAlign: 'top'}}
                                  data-input-type="last">
              <input type="text" id="last_51" name="q51_name[last]" className="form-textbox" data-defaultvalue=""
                     autoComplete="section-input_51 family-name" size="15" value="" data-component="last"
                     aria-labelledby="label_51 sublabel_51_last"/>
              <label className="form-sub-label" htmlFor="last_51" id="sublabel_51_last" style={{minHeight: '13px'}}
                     aria-hidden="false"> Last Name </label>
            </span>
                        </div>
                    </div>
                </li>
                <li className="form-line" data-type="control_matrix" id="id_68">
                    <label className="form-label form-label-top" id="label_68" htmlFor="input_68"> </label>
                    <div id="cid_68" className="form-input-wide">
                        <table summary="" aria-labelledby="label_68" cellPadding="4" cellSpacing="0"
                               className="form-matrix-table" style={{width: '725px'}} data-component="matrix">
                            <tr className="form-matrix-tr form-matrix-header-tr">
                                <th className="form-matrix-th" style={{border: 'none'}}>

                                </th>
                                <th scope="col"
                                    className="form-matrix-headers form-matrix-column-headers form-matrix-column_0"
                                    style={{width: '400px'}}>
                                    <label id="label_68_col_0"> List Tasks </label>
                                </th>
                                <th scope="col"
                                    className="form-matrix-headers form-matrix-column-headers form-matrix-column_1"
                                    style={{width: '400px'}}>
                                    <label id="label_68_col_1"> Possible Hazards </label>
                                </th>
                                <th scope="col"
                                    className="form-matrix-headers form-matrix-column-headers form-matrix-column_2"
                                    style={{width: '400px'}}>
                                    <label id="label_68_col_2"> Hazard Controls
                                        <Button style={{float: 'right'}} onClick={addNewTask}
                                                icon="pi pi-plus-circle"
                                                className="p-button-sm p-button-rounded p-button-text"/></label>
                                </th>
                            </tr>
                            {
                                tasks.map((elem, index) => {
                                    return (
                                        <tr className="form-matrix-tr form-matrix-value-tr"
                                            aria-labelledby="label_68 label_68_row_0">
                                            <th scope="row" className="form-matrix-headers form-matrix-row-headers">
                                                <label id="label_68_row_0"> {index + 1} </label>
                                            </th>
                                            <td className="form-matrix-values">
                                                <input type="text" id="input_68_0_0" className="form-textbox" size="5"
                                                       name="q68_typeA68[0][]"
                                                       style={{width: '100%', boxSizing: 'border-box'}}
                                                       value={taskList[index]}
                                                       onChange={(e) => onChangeTaskList(e, index)}
                                                       aria-labelledby="label_68_col_0 label_68_row_0"/>
                                            </td>
                                            <td className="form-matrix-values">
                                                <input type="text" id="input_68_0_1" className="form-textbox" size="5"
                                                       name="q68_typeA68[0][]"
                                                       style={{width: '100%', boxSizing: 'border-box'}}
                                                       value={possibleHazardList[index]}
                                                       onChange={(e) => onChangePossibleHazardList(e, index)}
                                                       aria-labelledby="label_68_col_1 label_68_row_0"/>
                                            </td>
                                            <td className="form-matrix-values">
                                                <input type="text" id="input_68_0_2" className="form-textbox" size="5"
                                                       name="q68_typeA68[0][]"
                                                       style={{width: '100%', boxSizing: 'border-box'}}
                                                       value={hazardControlList[index]}
                                                       onChange={(e) => onChangeHazardControlList(e, index)}
                                                       aria-labelledby="label_68_col_2 label_68_row_0"/>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </table>
                    </div>
                </li>
                <li className="form-line" data-type="control_button" id="id_2">
                    {!isShow && <div id="cid_2" className="form-input-wide">
                        <div style={{textAlign: 'center'}} data-align="center"
                             className="form-buttons-wrapper form-buttons-center   jsTest-button-wrapperField">
                            <button id="input_2" type="submit"
                                    onClick={saveForm}
                                    className="form-submit-button submit-button jf-form-buttons jsTest-submitField"
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

        <input type="hidden" className="simple_spc" id="simple_spc" name="simple_spc" value="220106198321042"/>
        <div className="formFooter-heightMask">
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