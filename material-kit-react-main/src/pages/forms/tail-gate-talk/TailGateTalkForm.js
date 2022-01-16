import './tail-gate-talk-form.css';
import logo from '../../../goa_logo.png';
import MDialog from "../../../components/mcomponents/MDialog";
import React, {useEffect, useState} from "react";
import SelectEmployee from "../../../components/mcomponents/SelectEmployee";
import TailGateTalkFormService from "../../../services/TailGateTalkFormService";
import {toast} from "react-toastify";
import AttendeesService from "../../../services/AttendeesService";
import MailService from "../../../services/MailService";
import LoadingScreen from "react-loading-screen";
import {Button} from "primereact/button";

export default function TailGateTalkForm({selectedData, isShow}) {

    const [showDialog, setShowDialog] = useState(false);
    const [attendees, setAttendees] = useState([]);
    const [showedHtml, setShowedHtml] = useState(<SelectEmployee
        setSelections={(selections) => setAttendees(selections)}/>);
    const tailGateTalkFormService = new TailGateTalkFormService();
    const attendeesService = new AttendeesService();
    const mailService = new MailService();

    const [submitted, setSubmitted] = useState(false);

    let initialState = isShow ? selectedData : {
        date: '',
        location: '',
        firstNameForeman: '',
        lastNameForeman: '',
        signatureForeman: '',
        job: '',
        firstNameGuest: '',
        lastNameGuest: '',
        signatureGuest: '',
        safetyTraining: '',
        employeeSuggestions: '',
        signature: '',
        title: '',
    };

    const [form, setForm] = useState(initialState);

    useEffect(() => {
        getAttendees();
    }, [])

    const getAttendees =()=>{
        if (isShow) {
            let formId = selectedData.id;
            let userId = JSON.parse(localStorage.getItem('user')).userId;
            attendeesService.findAttendees({formId: formId, userId: userId}).then(res => {
                if (res.status == 200) {
                    setAttendees(res.data);
                }
            })
        }
    }

    function arrayBufferToBase64(data) {
        if (data) {
            return Buffer.from(data, 'base64');
        }
    }

    async function saveForm() {
        const date = document.getElementById('lite_mode_18').value;
        let signatureForeman = document.getElementById('input_7').value;
        const signature = document.getElementById('input_14').value;

        if ((date === null || date === '') ||
            (signatureForeman === null || signatureForeman === '') ||
            (signature === null || signature === '') ||
            (form.location === null || form.location === '') ||
            (form.firstNameForeman === null || form.firstNameForeman === '') ||
            (form.lastNameForeman === null || form.lastNameForeman === '') ||
            (form.job === null || form.job === '') ||
            (form.title === null || form.title === '')
        ) {
            return toast.warning("Please check required fields!")
        }


        if (attendees.length == 0) {
            return toast.warning("Please add crew!")
        }
        setSubmitted(true);
        await tailGateTalkFormService.save({...form, signatureForeman: signatureForeman}).then(async res => {
            let insertId = res.data.insertId;
            if (res.status == 200) {
                await attendeesService.save({attendees: attendees, formId: res.data.insertId}).then(res => {
                    var millisecondsToWait = 1000;
                    setTimeout(function () {
                        toast.success("Saved succesfully!");
                        setSubmitted(false);
                        setForm({
                            date: '',
                            location: '',
                            firstNameForeman: '',
                            lastNameForeman: '',
                            signatureForeman: '',
                            job: '',
                            firstNameGuest: '',
                            lastNameGuest: '',
                            signatureGuest: '',
                            safetyTraining: '',
                            employeeSuggestions: '',
                            signature: '',
                            title: '',
                        });
                    }, millisecondsToWait);

                    mailService.sendMail({attendees: attendees, formId: insertId})
                })
            }
        })
    }

    function onChangeLocation(e) {
        const date = document.getElementById('lite_mode_18').value;
        const signatureForeman = document.getElementById('input_7').value;
        const signatureGuest = document.getElementById('input_24').value;
        const signature = document.getElementById('input_14').value;
        setForm({...form, location: e.target.value, date, signatureForeman, signatureGuest, signature});
    }

    function onChangeSignatureForeman(e) {
        const date = document.getElementById('lite_mode_18').value;
        const signatureGuest = document.getElementById('input_24').value;
        const signature = document.getElementById('input_14').value;
        setForm({...form, signatureForeman: e.target.value, date, signatureGuest, signature});
    }

    function onChangeFirstNameForeman(e) {
        const date = document.getElementById('lite_mode_18').value;
        const signatureForeman = document.getElementById('input_7').value;
        const signatureGuest = document.getElementById('input_24').value;
        const signature = document.getElementById('input_14').value;
        setForm({...form, firstNameForeman: e.target.value, date, signatureForeman, signatureGuest, signature});
    }

    function onChangeLastNameForeman(e) {
        const date = document.getElementById('lite_mode_18').value;
        const signatureForeman = document.getElementById('input_7').value;
        const signatureGuest = document.getElementById('input_24').value;
        const signature = document.getElementById('input_14').value;
        setForm({...form, lastNameForeman: e.target.value, date, signatureForeman, signatureGuest, signature});
    }

    function onChangeJob(e) {
        const date = document.getElementById('lite_mode_18').value;
        const signatureForeman = document.getElementById('input_7').value;
        const signatureGuest = document.getElementById('input_24').value;
        const signature = document.getElementById('input_14').value;
        setForm({...form, job: e.target.value, date, signatureForeman, signatureGuest, signature});
    }

    function onChangeFirstNameGuest(e) {
        const date = document.getElementById('lite_mode_18').value;
        const signatureForeman = document.getElementById('input_7').value;
        const signatureGuest = document.getElementById('input_24').value;
        const signature = document.getElementById('input_14').value;
        setForm({...form, firstNameGuest: e.target.value, date, signatureForeman, signatureGuest, signature});
    }

    function onChangeLastNameGuest(e) {
        const date = document.getElementById('lite_mode_18').value;
        const signatureForeman = document.getElementById('input_7').value;
        const signatureGuest = document.getElementById('input_24').value;
        const signature = document.getElementById('input_14').value;
        setForm({...form, lastNameGuest: e.target.value, date, signatureForeman, signatureGuest, signature});
    }

    function onChangeSafetyTraining(e) {
        const date = document.getElementById('lite_mode_18').value;
        const signatureForeman = document.getElementById('input_7').value;
        const signatureGuest = document.getElementById('input_24').value;
        const signature = document.getElementById('input_14').value;
        setForm({...form, safetyTraining: e.target.value, date, signatureForeman, signatureGuest, signature});
    }

    function onChangeEmployeeSuggestions(e) {
        const date = document.getElementById('lite_mode_18').value;
        const signatureForeman = document.getElementById('input_7').value;
        const signatureGuest = document.getElementById('input_24').value;
        const signature = document.getElementById('input_14').value;
        setForm({...form, employeeSuggestions: e.target.value, date, signatureForeman, signatureGuest, signature});
    }

    function onChangeTitle(e) {
        const date = document.getElementById('lite_mode_18').value;
        const signatureForeman = document.getElementById('input_7').value;
        const signatureGuest = document.getElementById('input_24').value;
        const signature = document.getElementById('input_14').value;
        setForm({...form, title: e.target.value, date, signatureForeman, signatureGuest, signature});
    }

    const addCrews = () => {
        setShowDialog(true);
    }

    let formReturn = <form class="jotform-form" name="form_220115730197045" id="220115730197045" accept-charset="utf-8"
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
                    <label
                        className="form-label form-label-top form-label-auto"
                        id="label_18"
                        htmlFor="lite_mode_18"
                    >
                        Date
                        <span className="form-required">*</span>
                    </label>
                    <div id="cid_18" className="form-input-wide jf-required" data-layout="half">
                        <div data-wrapper-react="true">
                            <div style={{display: 'none'}}>
                  <span className="form-sub-label-container" style={{verticalAlign: 'top'}}>
                    <input
                        type="tel"
                        className="form-textboxs"
                        id="month_18"
                        name="q18_date[month]"
                        size="2"
                        data-maxlength="2"
                        data-age=""
                        maxLength="2"
                        required=""
                        autoComplete="section-input_18 off"
                        aria-labelledby="label_18 sublabel_18_month"
                    />
                    <span className="date-separate" aria-hidden="true">
                       -
                    </span>
                    <label
                        className="form-sub-label"
                        htmlFor="month_18"
                        id="sublabel_18_month"
                        style={{minHeight: '13px'}}
                        aria-hidden="false"
                    >
                      {' '}
                        Month{' '}
                    </label>
                  </span>
                                <span className="form-sub-label-container" style={{verticalAlign: 'top'}}>
                    <input
                        type="tel"
                        className="form-textbox"
                        id="day_18"
                        name="q18_date[day]"
                        size="2"
                        data-maxlength="2"
                        data-age=""
                        maxLength="2"
                        value=""
                        required=""
                        autoComplete="section-input_18 off"
                        aria-labelledby="label_18 sublabel_18_day"
                    />
                    <span className="date-separate" aria-hidden="true">
                       -
                    </span>
                    <label
                        className="form-sub-label"
                        htmlFor="day_18"
                        id="sublabel_18_day"
                        style={{minHeight: '13px'}}
                        aria-hidden="false"
                    >
                      {' '}
                        Day{' '}
                    </label>
                  </span>
                                <span className="form-sub-label-container" style={{verticalAlign: 'top'}}>
                    <input
                        type="tel"
                        className="form-textbox"
                        id="year_18"
                        name="q18_date[year]"
                        size="4"
                        data-maxlength="4"
                        data-age=""
                        maxLength="4"
                        value=""
                        required=""
                        autoComplete="section-input_18 off"
                        aria-labelledby="label_18 sublabel_18_year"
                    />
                    <label
                        className="form-sub-label"
                        htmlFor="year_18"
                        id="sublabel_18_year"
                        style={{minHeight: '13px'}}
                        aria-hidden="false"
                    >
                      {' '}
                        Year{' '}
                    </label>
                  </span>
                            </div>
                            <span className="form-sub-label-container" style={{verticalAlign: 'top'}}>
                  <input
                      type="text"
                      className="form-textbox"
                      id="lite_mode_18"
                      size="12"
                      data-maxlength="12"
                      maxLength="12"
                      data-age=""
                      value={form.date}
                      required=""
                      data-format="mmddyyyy"
                      data-seperator="-"
                      placeholder="MM-DD-YYYY"
                      autoComplete="section-input_18 off"
                      aria-labelledby="label_18"
                  />
                  <img
                      className=" newDefaultTheme-dateIcon icon-liteMode"
                      alt="Pick a Date"
                      id="input_18_pick"
                      src="https://cdn.jotfor.ms/images/calendar.png"
                      data-component="datetime"
                      aria-hidden="true"
                      data-allow-time="No"
                      data-version="v2"
                  />
                  <label
                      className="form-sub-label is-empty"
                      htmlFor="lite_mode_18"
                      id="sublabel_18_litemode"
                      style={{minHeight: '13px'}}
                      aria-hidden="false"
                  >
                    {' '}
                  </label>
                </span>
                        </div>
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
                <li className="form-line form-line-column form-col-3 jf-required" data-type="control_fullname"
                    id="id_6">
                    <label className="form-label form-label-top form-label-auto" id="label_6" htmlFor="first_6">
                        Foreman
                        <span className="form-required">
            *
          </span>
                    </label>
                    <div id="cid_6" className="form-input-wide jf-required" data-layout="full">
                        <div data-wrapper-react="true">
            <span className="form-sub-label-container" style={{verticalAlign: 'top'}} data-input-type="first">
              <input type="text" id="first_6" name="q6_name[first]" className="form-textbox  "
                     data-defaultvalue="" autoComplete="section-input_6 given-name" size="10"
                     value={form.firstNameForeman}
                     onChange={onChangeFirstNameForeman}
                     data-component="first" aria-labelledby="label_6 sublabel_6_first" required=""/>
              <label className="form-sub-label" htmlFor="first_6" id="sublabel_6_first" style={{minHeight: '13px'}}
                     aria-hidden="false"> First Name </label>
            </span>
                            <span className="form-sub-label-container" style={{verticalAlign: 'top'}}
                                  data-input-type="last">
              <input type="text" id="last_6" name="q6_name[last]" className="form-textbox  "
                     data-defaultvalue="" autoComplete="section-input_6 family-name" size="15"
                     value={form.lastNameForeman}
                     onChange={onChangeLastNameForeman}
                     data-component="last" aria-labelledby="label_6 sublabel_6_last" required=""/>
              <label className="form-sub-label" htmlFor="last_6" id="sublabel_6_last" style={{minHeight: '13px'}}
                     aria-hidden="false"> Last Name </label>
            </span>
                        </div>
                    </div>
                </li>
                <li className="form-line form-line-column form-col-4 jf-required" data-type="control_signature"
                    id="id_7">
                    <label className="form-label form-label-top form-label-auto" id="label_7" htmlFor="input_7">
                        Signature
                        <span className="form-required">
            *
          </span>
                    </label>
                    {isShow ? <img src={arrayBufferToBase64(selectedData.signatureForeman.data)}/> :
                        <div id="cid_7" className="form-input-wide jf-required" data-layout="half">
                            <div data-wrapper-react="true">
                                <div id="signature_pad_7" className="signature-pad-wrapper"
                                     style={{width: '312px', height: '116px'}}>
                                    <div data-wrapper-react="true">
                                    </div>
                                    <div className="signature-line signature-wrapper signature-placeholder"
                                         data-component="signature" style={{width: '312px', height: '116px'}}>
                                        <div id="sig_pad_7" data-width="310" data-height="114" data-id="7"
                                             className="pad  "
                                             aria-labelledby="label_7">
                                        </div>
                                        <input type="hidden"
                                               name="q7_signature" className="output4" id="input_7"/>
                                    </div>
                                    <span className="clear-pad-btn clear-pad" role="button" tabIndex="0">
                Clear
              </span>
                                </div>
                                <div data-wrapper-react="true">
                                    <script type="text/javascript">
                                        {window.signatureForm = true}
                                    </script>
                                </div>
                            </div>
                        </div>}
                </li>
                <li className="form-line fixed-width jf-required" data-type="control_textbox" id="id_8">
                    <label className="form-label form-label-top form-label-auto" id="label_8" htmlFor="input_8">
                        Job #
                        <span className="form-required">
            *
          </span>
                    </label>
                    <div id="cid_8" className="form-input-wide jf-required" data-layout="half">
                        <input type="text" id="input_8" name="q8_typeA8" data-type="input-textbox"
                               className="form-textbox  " data-defaultvalue=""
                               style={{width: '520px'}}
                               size="520"
                               value={form.job}
                               onChange={onChangeJob}
                               data-component="textbox" aria-labelledby="label_8" required=""/>
                    </div>
                </li>
                <li className="form-line jf-required" data-type="control_matrix" id="id_9">

                    <label className="form-label form-label-top form-label-auto" id="label_9" htmlFor="input_9">
                       Crew Attending
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
                                                   value={elem.name_surname}
                                                   aria-labelledby="label_9_col_0 label_9_row_0"/>
                                        </td>
                                        <td className="form-matrix-values">
                                            <img height={50} src={arrayBufferToBase64(elem.signature?.data)}/>
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
                                Add Crews
                            </button>
                        </div>
                    </div>}
                </li>
                <li id="cid_19" className="form-input-wide" data-type="control_head">
                    <div className="form-header-group  header-default">
                        <div className="header-text httal htvam">
                            <h2 id="header_19" className="form-header" data-component="header">
                                Guest Attending
                            </h2>
                        </div>
                    </div>
                </li>
                <li className="form-line" data-type="control_fullname" id="id_22">
                    <label className="form-label form-label-top form-label-auto" id="label_22"
                           htmlFor="first_22"> Name </label>
                    <div id="cid_22" className="form-input-wide" data-layout="full">
                        <div data-wrapper-react="true">
            <span className="form-sub-label-container" style={{verticalAlign: 'top'}} data-input-type="first">
              <input type="text" id="first_22" name="q22_name22[first]" className="form-textbox" data-defaultvalue=""
                     autoComplete="section-input_22 given-name" size="10"
                     value={form.firstNameGuest}
                     onChange={onChangeFirstNameGuest}
                     data-component="first"
                     aria-labelledby="label_22 sublabel_22_first"/>
              <label className="form-sub-label" htmlFor="first_22" id="sublabel_22_first" style={{minHeight: '13px'}}
                     aria-hidden="false"> First Name </label>
            </span>
                            <span className="form-sub-label-container" style={{verticalAlign: 'top'}}
                                  data-input-type="last">
              <input type="text" id="last_22" name="q22_name22[last]" className="form-textbox" data-defaultvalue=""
                     autoComplete="section-input_22 family-name" size="15"
                     value={form.lastNameGuest}
                     onChange={onChangeLastNameGuest}
                     data-component="last"
                     aria-labelledby="label_22 sublabel_22_last"/>
              <label className="form-sub-label" htmlFor="last_22" id="sublabel_22_last" style={{minHeight: '13px'}}
                     aria-hidden="false"> Last Name </label>
            </span>
                        </div>
                    </div>
                </li>
                <li className="form-line" data-type="control_signature" id="id_24">
                    <label className="form-label form-label-top form-label-auto" id="label_24"
                           htmlFor="input_24"> Signature </label>
                    <div id="cid_24" className="form-input-wide" data-layout="half">
                        <div data-wrapper-react="true">
                            <div id="signature_pad_24" className="signature-pad-wrapper"
                                 style={{width: '312px', height: '116px'}}>
                                <div data-wrapper-react="true">
                                </div>
                                <div className="signature-line signature-wrapper signature-placeholder"
                                     data-component="signature" style={{width: '312px', height: '116px'}}>
                                    <div id="sig_pad_24" data-width="310" data-height="114" data-id="24"
                                         className="pad " aria-labelledby="label_24">
                                    </div>
                                    <input type="hidden" name="q24_signature24" className="output4" id="input_24"/>
                                </div>
                                <span className="clear-pad-btn clear-pad" role="button" tabIndex="0">
                Clear
              </span>
                            </div>
                            <div data-wrapper-react="true">
                                <script type="text/javascript">
                                    {window.signatureForm = true}
                                </script>
                            </div>
                        </div>
                    </div>
                </li>
                <li className="form-line" data-type="control_button" id="id_23">
                    <div id="cid_23" className="form-input-wide" data-layout="full">
                        <div data-align="center"
                             className="form-buttons-wrapper form-buttons-center   jsTest-button-wrapperField">
                            <button id="input_23" type="submit"
                                    className="form-submit-button-simple_orange submit-button jf-form-buttons jsTest-submitField"
                                    data-component="button" data-content="">
                                Add Guest
                            </button>
                        </div>
                    </div>
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
                <li className="form-line" data-type="control_textarea" id="id_12">
                    <label className="form-label form-label-top form-label-auto" id="label_12"
                           htmlFor="input_12"> Safety Training </label>
                    <div id="cid_12" className="form-input-wide" data-layout="full">
                            <textarea id="input_12" className="form-textarea" name="q12_typeA12"
                                      value={form.safetyTraining}
                                      onChange={onChangeSafetyTraining}
                                      style={{width: '648px', height: '163px'}} data-component="textarea"
                                      aria-labelledby="label_12"></textarea>
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
                    {isShow ? <img src={arrayBufferToBase64(selectedData.signature.data)}/> :
                        <div id="cid_14" className="form-input-wide jf-required" data-layout="half">
                            <div data-wrapper-react="true">
                                <div id="signature_pad_14" className="signature-pad-wrapper"
                                     style={{width: '312px', height: '116px'}}>
                                    <div data-wrapper-react="true">

                                    </div>
                                    <div className="signature-line signature-wrapper signature-placeholder"
                                         data-component="signature" style={{width: '312px', height: '116px'}}>
                                        <div id="sig_pad_14" data-width="310" data-height="114" data-id="14"
                                             className="pad  "
                                             aria-labelledby="label_14">
                                        </div>
                                        <input type="hidden" name="q14_signature14" className="output4" id="input_14"/>
                                    </div>
                                    <span className="clear-pad-btn clear-pad" role="button" tabIndex="0">
                Clear
              </span>
                                </div>
                                <div data-wrapper-react="true">
                                    <script type="text/javascript">
                                        {window.signatureForm = true}
                                    </script>
                                </div>
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