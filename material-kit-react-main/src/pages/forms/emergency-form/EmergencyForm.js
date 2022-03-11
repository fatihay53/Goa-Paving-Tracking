import React, {useState} from "react";
import './emergency.css';
import SelectEmployee from "../../../components/mcomponents/SelectEmployee";
import MDialog from "../../../components/mcomponents/MDialog";
import { Dropdown } from 'primereact/dropdown';
import {Calendar} from "primereact/calendar";
import GeneralUtils from "../../../utils/GeneralUtils";

const methodOfCommunicationOptions = [
    { name: 'Select', value: '' },
    { name: 'Cell Phones', value: 'Cell Phones' },
    { name: 'CB Radio', value: 'CB Radio' },
    { name: 'Cell Phones/CB Radio', value: 'Cell Phones/CB Radio' }
];

const emergencyMeetingLocationOptions = [
    { name: 'Select', value: '' },
    { name: '200 M Behind Paver', value: '200 M Behind Paver' },
    { name: 'Milling Machine', value: 'Milling Machine' }
];

export default function EmergencyForm({selectedData, isShow}) {

    const [showDialog, setShowDialog] = useState(false);
    const [showedHtml, setShowedHtml] = useState({});

    let initialState = isShow ? selectedData : {
        supervisor_id: '',
        supervisor_name: '',
        supervisor_surname: '',
        site: '',
        phone: '',
        methodOfCommunication : '',
        emergencyMeetingLocation: '',
        date: new Date(),
        officeSiteContact:'',
        siteSupervisor:'',
        signatureForeman: '',
        safetyTraining: '',
        employeeSuggestions: '',
        signature: '',
        title: '',
        subject : ''
    };

    const [form, setForm] = useState(initialState);

    const onMethodOfCommunicationChange = (e) => {
        setForm({...form,methodOfCommunication: e.value});
    }

    const onEmergencyMeetingLocationChange = (e) => {
        setForm({...form,emergencyMeetingLocation: e.value});
    }

    const onSiteChange = (e) => {
        setForm({...form,site: e.target.value});
    }

    const onPhoneChange = (e) => {
        setForm({...form,phone: e.target.value});
    }

    const onSiteSupervisorChange = (e) => {
        setForm({...form,siteSupervisor: e.target.value});
    }

    const onOfficeSiteContactChange = (e) => {
        setForm({...form,officeSiteContact: e.target.value});
    }

    console.log(form)

    const selectSupervisor = () => {
        setShowDialog(true);
        setShowedHtml(<SelectEmployee restriction="findAllSupervisors" selectionMode="single"
            setSelections={(selections) => {setForm({...form,supervisor_id:selections.id,supervisor_name:selections.name,supervisor_surname:selections.surname}); setShowDialog(false);}}/>);
    }

    return(
        <form style={{backgroundColor:'#f3f3fe'}} className="jotform-form" autoComplete="on" onSubmit={(event) => event.preventDefault()}>
            <div role="main" className="form-all">
                <ul className="form-section page-section">
                    <li id="cid_1" className="form-input-wide" data-type="control_head">
                        <div className="form-header-group  header-small">
                            <div className="header-text httac htvam">
                                <h3 id="header_1" className="form-header" data-component="header">
                                    Emergency Response and Preparedness Plan
                                </h3>
                            </div>
                        </div>
                    </li>
                    <li className="form-line jf-required" data-type="control_fullname" id="id_3">
                        <label className="form-label form-label-top form-label-auto" id="label_3" htmlFor="first_3">
                            Supervisor
                            <span className="form-required">
            *
          </span>
                        </label>
                        <div id="cid_3" className="form-input-wide jf-required" data-layout="full">
                            <div data-wrapper-react="true">
            <span className="form-sub-label-container" style={{verticalAlign:'top'}} data-input-type="first">
              <input type="text" id="first_3" name="q3_name[first]" className="form-textbox validate[required]" disabled={true}
                     data-defaultvalue="" autoComplete="section-input_3 given-name" size="10" value={form?.supervisor_name}
                     data-component="first" aria-labelledby="label_3 sublabel_3_first" required=""/>
              <label className="form-sub-label" htmlFor="first_3" id="sublabel_3_first" style={{minHeight:'13px'}}
                     aria-hidden="false"> First Name </label>
            </span>
                                <span className="form-sub-label-container" style={{verticalAlign:'top'}}
                                      data-input-type="last">
              <input type="text" id="last_3" name="q3_name[last]" className="form-textbox validate[required]" disabled={true}
                     data-defaultvalue="" autoComplete="section-input_3 family-name" size="15" value={form?.supervisor_surname}
                     data-component="last" aria-labelledby="label_3 sublabel_3_last" required=""/>
              <label className="form-sub-label" htmlFor="last_3" id="sublabel_3_last" style={{minHeight:'13px'}}
                     aria-hidden="false"> Last Name </label>
            </span>
                                <span className="form-sub-label-container" style={{verticalAlign:'top'}} data-input-type="first">

                        <button id="input_10"
                                onClick={selectSupervisor}
                                className="form-submit-button-simple_orange submit-button jf-form-buttons jsTest-submitField"
                                data-component="button" data-content="">
                                Select Supervisor
                            </button>
            </span>
                            </div>
                        </div>
                    </li>
                    <li className="form-line jf-required" data-type="control_textbox" id="id_8">
                        <label className="form-label form-label-top form-label-auto" id="label_8" htmlFor="input_8">
                            Site
                            <span className="form-required">
            *
          </span>
                        </label>
                        <div id="cid_8" className="form-input-wide jf-required" data-layout="half">
                            <input type="text" id="input_8" name="q8_typeA8" data-type="input-textbox"
                                   className="form-textbox validate[required]" data-defaultvalue="" style={{width:'310px'}}
                                   size="310" value={form?.site} onChange={onSiteChange} data-component="textbox" aria-labelledby="label_8" required=""/>
                        </div>
                    </li>
                    <li className="form-line form-line-column form-col-1 jf-required" data-type="control_phone"
                        id="id_4">
                        <label className="form-label form-label-top form-label-auto" id="label_4"
                               htmlFor="input_4_full">
                            Phone Number
                            <span className="form-required">
            *
          </span>
                        </label>
                        <div id="cid_4" className="form-input-wide jf-required" data-layout="half">
          <span className="form-sub-label-container" style={{verticalAlign:'top'}}>
            <input type="text" id="input_4_full" name="q4_phoneNumber[full]"
                   className="mask-phone-number form-textbox validate[required, Fill Mask]" data-defaultvalue=""
                   style={{width:'310px'}} value={form?.phone} onChange={onPhoneChange}
                   aria-labelledby="label_4 sublabel_4_masked"/>
          </span>
                        </div>
                    </li>
                    <li className="form-line form-line-column form-col-2 jf-required" data-type="control_textbox"
                        id="id_7">
                        <label className="form-label form-label-top form-label-auto" id="label_7" htmlFor="input_7">
                            Method of Communication
                            <span className="form-required">
            *
          </span>
                        </label>
                        <div id="cid_7" className="form-input-wide jf-required" data-layout="half">
                            <Dropdown value={form?.methodOfCommunication} options={methodOfCommunicationOptions} onChange={onMethodOfCommunicationChange} optionLabel="name" placeholder="Select" />
                        </div>
                    </li>
                    <li className="form-line form-line-column form-col-3 jf-required" data-type="control_textbox"
                        id="id_9">
                        <label className="form-label form-label-top form-label-auto" id="label_9" htmlFor="input_9">
                            Emergency Meeting Location/ Muster:
                            <span className="form-required">
            *
          </span>
                        </label>
                        <div id="cid_9" className="form-input-wide jf-required" data-layout="half">
                            <Dropdown value={form?.emergencyMeetingLocation} options={emergencyMeetingLocationOptions} onChange={onEmergencyMeetingLocationChange} optionLabel="name" placeholder="Select" />
                        </div>
                    </li>
                    <li className="form-line form-line-column form-col-4 jf-required" data-type="control_textbox"
                        id="id_10">
                        <label className="form-label form-label-top form-label-auto" id="label_10" htmlFor="input_10">
                            Nearest Hospital
                            <span className="form-required">
            *
          </span>
                        </label>
                        <div id="cid_10" className="form-input-wide jf-required" data-layout="half">
                            <input type="text" id="input_10" name="q10_typeA10" data-type="input-textbox"
                                   className="form-textbox validate[required]" data-defaultvalue="" style={{width:'310px'}}
                                   size="310" value="" data-component="textbox" aria-labelledby="label_10" required=""/>
                        </div>
                    </li>
                    <li className="form-line form-line-column form-col-5 jf-required" data-type="control_datetime"
                        id="id_5">
                        <label className="form-label form-label-top form-label-auto" id="label_5" htmlFor="lite_mode_5">
                            Date
                            <span className="form-required">
            *
          </span>
                        </label>
                        <div className="p-fluid grid formgrid">
                            <Calendar id="icon" value={form?.date} onChange={(e) => setForm({...form,date:e.value})}
                                      dateFormat={GeneralUtils.DATE_FORMAT_CALENDAR}
                                      showIcon/>
                        </div>
                    </li>
                    <li className="form-line form-line-column form-col-6 jf-required" data-type="control_time"
                        id="id_6">
                        <label className="form-label form-label-top form-label-auto" id="label_6"
                               htmlFor="input_6_hourSelect">
                            Time
                            <span className="form-required">
            *
          </span>
                        </label>
                        <div id="cid_6" className="form-input-wide jf-required" data-layout="half">
                            <div data-wrapper-react="true">
                                <div className="time-wrapper">
              <span className="form-sub-label-container hasAMPM" style={{verticalAlign:'top'}}>
                <input type="text" className="time-dropdown form-textbox validate[required]" id="input_6_timeInput"
                       name="q6_time[timeInput]" required="" placeholder="HH : MM"
                       aria-labelledby="label_6 sublabel_6_hour" data-mask="hh:MM" value="" data-version="v2"/>
                <input type="hidden" className="form-hidden-time" id="input_6_hourSelect" name="q6_time[hourSelect]"/>
                <input type="hidden" className="form-hidden-time" id="input_6_minuteSelect"
                       name="q6_time[minuteSelect]"/>
                <label data-seperate-translate="true" className="form-sub-label" htmlFor="input_6_timeInput"
                       id="sublabel_6_hour" style={{minHeight:'13px'}} aria-hidden="false"> Hour Minutes </label>
              </span>
                                </div>
                                <div className="time-wrapper">
              <span className="form-sub-label-container" style={{verticalAlign:'top'}}>
                <select className="time-dropdown form-dropdown validate[required]" id="input_6_ampm"
                        name="q6_time[ampm]" data-component="time-ampm" required=""
                        aria-labelledby="label_6 sublabel_6_ampm">
                  <option selected="" value="AM"> AM </option>
                  <option value="PM"> PM </option>
                </select>
                <label className="form-sub-label" htmlFor="input_6_ampm" id="sublabel_6_ampm"
                       style={{border:0,clip:'rect(0 0 0 0)',height:'1px',margin:'-1px',overFlow:'hidden',padding:0,position:'absolute',width:'1px',whiteSpace:'nowrap'}}
                       aria-hidden="false"> AM/PM Option </label>
              </span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="form-line form-line-column form-col-7 jf-required" data-type="control_textbox"
                        id="id_11">
                        <label className="form-label form-label-top form-label-auto" id="label_11" htmlFor="input_11">
                            Office Site Contact:
                            <span className="form-required">
            *
          </span>
                        </label>
                        <div id="cid_11" className="form-input-wide jf-required" data-layout="half">
                            <input type="text" id="input_11" name="q11_typeA11" data-type="input-textbox"
                                   className="form-textbox validate[required]" data-defaultvalue="" style={{width:'310px'}}
                                   size="310" value={form?.officeSiteContact} onChange={onOfficeSiteContactChange} data-component="textbox" aria-labelledby="label_11" required=""/>
                        </div>
                    </li>
                    <li className="form-line form-line-column form-col-8 jf-required" data-type="control_textbox"
                        id="id_12">
                        <label className="form-label form-label-top form-label-auto" id="label_12" htmlFor="input_12">
                            Site Supervisor:(Working on someone else site)
                            <span className="form-required">
            *
          </span>
                        </label>
                        <div id="cid_12" className="form-input-wide jf-required" data-layout="half">
                            <input type="text" id="input_12" name="q12_typeA12" data-type="input-textbox"
                                   className="form-textbox validate[required]" data-defaultvalue="" style={{width:'310px'}}
                                   size="310" value={form?.siteSupervisor} onChange={onSiteSupervisorChange} data-component="textbox" aria-labelledby="label_12" required=""/>
                        </div>
                    </li>
                    <li id="cid_13" className="form-input-wide" data-type="control_head">
                        <div className="form-header-group  header-default">
                            <div className="header-text httac htvam">
                                <h2 id="header_13" className="form-header" data-component="header">
                                    Purpose
                                </h2>
                                <div id="subHeader_13" className="form-subHeader">
                                    To Provide planning for the identification of potential for incidents and emergency
                                    situations as well as the migration of the environmental impacts that may be
                                    involved with incidents and emergency situations.
                                </div>
                            </div>
                        </div>
                    </li>
                    <li id="cid_14" className="form-input-wide" data-type="control_head">
                        <div className="form-header-group  header-default">
                            <div className="header-text httac htvam">
                                <h2 id="header_14" className="form-header" data-component="header">
                                    Emergency Response Checklist
                                </h2>
                            </div>
                        </div>
                    </li>
                    <li className="form-line" data-type="control_inline" id="id_16">
                        <div id="cid_16" className="form-input-wide" data-layout="full">
                            <div id="FITB_16" className="FITB formRender">
                                <p>Communication method: <span data-type="textbox" data-grouptype="control_textbox"
                                                               className="FITB-inptCont"><input type="text"
                                                                                                className="form-textbox "
                                                                                                name="q16_input16[shorttext-1]"
                                                                                                id="16_shorttext-1"
                                                                                                required/><label
                                    htmlFor="16_shorttext-1">blanks</label></span> <br/><span
                                    style={{color:'#000000',backgroundColor:'transparent'}}>Location of Emergency Communication Systems:</span>
                                    <span data-type="textbox" data-grouptype="control_textbox"
                                          className="FITB-inptCont"><input type="text" className="form-textbox "
                                                                           name="q16_input16[shorttext-2]"
                                                                           id="16_shorttext-2" required/><label
                                        htmlFor="16_shorttext-2">blank</label></span> <br/>First Aid Kits are located in
                                    the following areas:<span data-type="textbox" data-grouptype="control_textbox"
                                                              className="FITB-inptCont"><input type="text"
                                                                                               className="form-textbox  validate[]"
                                                                                               name="q16_input16[shorttext-3]"
                                                                                               id="16_shorttext-3"
                                                                                               required/><label
                                        htmlFor="16_shorttext-3"> Type a label</label></span> <br/>Fire Extinguishers
                                    are located in the following areas: <span data-type="textbox"
                                                                              data-grouptype="control_textbox"
                                                                              className="FITB-inptCont"><input
                                        type="text" className="form-textbox  validate[]" name="q16_input16[shorttext-4]"
                                        id="16_shorttext-4" required/><label
                                        htmlFor="16_shorttext-4"> Type a label</label></span> <br/>Spill Kits are
                                    located in the following areas:<span data-type="textbox"
                                                                         data-grouptype="control_textbox"
                                                                         className="FITB-inptCont"><input type="text"
                                                                                                          className="form-textbox  validate[]"
                                                                                                          name="q16_input16[shorttext-5]"
                                                                                                          id="16_shorttext-5"
                                                                                                          required/><label
                                        htmlFor="16_shorttext-5"> Type a label</label></span> <br/>Certified First
                                    Aiders include:<span data-type="textbox" data-grouptype="control_textbox"
                                                         className="FITB-inptCont"><input type="text"
                                                                                          className="form-textbox  validate[]"
                                                                                          name="q16_input16[shorttext-6]"
                                                                                          id="16_shorttext-6" required/><label
                                        htmlFor="16_shorttext-6"> Type a label</label></span> <br/><br/><span
                                        style={{color:'#000000',backgroundColor:'transparent'}}>Emergency Contact Numbers:</span><br/><span
                                        style={{color:'#000000',backgroundColor:'transparent'}}>Fire/Ambulance/Police 911</span><br/><span
                                        style={{color:'#000000',backgroundColor:'transparent'}}>Nearest Hospital:</span><br/><br/><span
                                        style={{color:'#000000',backgroundColor:'transparent'}}>Name</span><span
                                        data-type="textbox" data-grouptype="control_fullname" className="FITB-inptCont"><input
                                        type="text" className="form-textbox  validate[]" name="q16_input16[firstname-7]"
                                        id="16_firstname-7" required/><label htmlFor="16_firstname-7">First Name</label></span>
                                    <span style={{color:'#000000',backgroundColor:'transparent'}}>Phone </span> <span
                                        data-type="textbox" data-grouptype="control_phone"
                                        className="FITB-inptCont"><input type="tel"
                                                                         className="form-textbox  validate[Numeric]"
                                                                         name="q16_input16[areacode-8]"
                                                                         id="16_areacode-8" required/><label
                                        htmlFor="16_areacode-8">Area Code</label></span> <span data-type="textbox"
                                                                                               data-grouptype="control_phone"
                                                                                               className="FITB-inptCont"><input
                                        type="tel" className="form-textbox  validate[Numeric]"
                                        name="q16_input16[phone-8]" id="16_phone-8" required/><label
                                        htmlFor="16_phone-8">Phone Number</label></span> <span
                                        style={{color:'#000000',backgroundColor:'transparent'}}>Address</span> <span
                                        data-type="textbox" data-grouptype="control_address"
                                        className="FITB-inptCont"><input type="text"
                                                                         className="form-textbox  validate[]"
                                                                         name="q16_input16[streetaddress-9]"
                                                                         id="16_streetaddress-9" required/><label
                                        htmlFor="16_streetaddress-9">Street Address</label></span> <span
                                        data-type="textbox" data-grouptype="control_address"
                                        className="FITB-inptCont"><input type="text"
                                                                         className="form-textbox  validate[]"
                                                                         name="q16_input16[city-9]" id="16_city-9"
                                                                         required/><label
                                        htmlFor="16_city-9">City</label></span> <span data-type="textbox"
                                                                                      data-grouptype="control_address"
                                                                                      className="FITB-inptCont"><input
                                        type="text" className="form-textbox  validate[]" name="q16_input16[zip-9]"
                                        id="16_zip-9" required/><label htmlFor="16_zip-9">Zip</label></span></p>
                            </div>
                        </div>
                    </li>
                    <li className="form-line" data-type="control_matrix" id="id_17">
                        <label className="form-label form-label-top form-label-auto" id="label_17"
                               htmlFor="input_17"> Provincial Government Office </label>
                        <div id="cid_17" className="form-input-wide" data-layout="full">
                            <table summary="" aria-labelledby="label_17" cellPadding="4" cellSpacing="0"
                                   className="form-matrix-table" data-component="matrix">
                                <tr className="form-matrix-tr form-matrix-header-tr">
                                    <th className="form-matrix-th" style={{border:'none'}}>

                                    </th>
                                    <th scope="col"
                                        className="form-matrix-headers form-matrix-column-headers form-matrix-column_0">
                                        <label id="label_17_col_0"> Health &amp; Safety </label>
                                    </th>
                                    <th scope="col"
                                        className="form-matrix-headers form-matrix-column-headers form-matrix-column_1">
                                        <label id="label_17_col_1"> Environment </label>
                                    </th>
                                    <th scope="col"
                                        className="form-matrix-headers form-matrix-column-headers form-matrix-column_2">
                                        <label id="label_17_col_2"> Transportation </label>
                                    </th>
                                </tr>
                                <tr className="form-matrix-tr form-matrix-value-tr"
                                    aria-labelledby="label_17 label_17_row_0">
                                    <th scope="row" className="form-matrix-headers form-matrix-row-headers">
                                        <label id="label_17_row_0"> Local Hydro </label>
                                    </th>
                                    <td className="form-matrix-values">
                                        <input type="text" id="input_17_0_0" className="form-textbox" size="5"
                                               name="q17_typeA17[0][]" style={{width:'100%',boxSizing:'border-box'}} value=""
                                               aria-labelledby="label_17_col_0 label_17_row_0"/>
                                    </td>
                                    <td className="form-matrix-values">
                                        <input type="text" id="input_17_0_1" className="form-textbox" size="5"
                                               name="q17_typeA17[0][]" style={{width:'100%',boxSizing:'border-box'}} value=""
                                               aria-labelledby="label_17_col_1 label_17_row_0"/>
                                    </td>
                                    <td className="form-matrix-values">
                                        <input type="text" id="input_17_0_2" className="form-textbox" size="5"
                                               name="q17_typeA17[0][]" style={{width:'100%',boxSizing:'border-box'}} value=""
                                               aria-labelledby="label_17_col_2 label_17_row_0"/>
                                    </td>
                                </tr>
                                <tr className="form-matrix-tr form-matrix-value-tr"
                                    aria-labelledby="label_17 label_17_row_1">
                                    <th scope="row" className="form-matrix-headers form-matrix-row-headers">
                                        <label id="label_17_row_1"> Spills Reporting </label>
                                    </th>
                                    <td className="form-matrix-values">
                                        <input type="text" id="input_17_1_0" className="form-textbox" size="5"
                                               name="q17_typeA17[1][]" style={{width:'100%',boxSizing:'border-box'}} value=""
                                               aria-labelledby="label_17_col_0 label_17_row_1"/>
                                    </td>
                                    <td className="form-matrix-values">
                                        <input type="text" id="input_17_1_1" className="form-textbox" size="5"
                                               name="q17_typeA17[1][]" style={{width:'100%',boxSizing:'border-box'}} value=""
                                               aria-labelledby="label_17_col_1 label_17_row_1"/>
                                    </td>
                                    <td className="form-matrix-values">
                                        <input type="text" id="input_17_1_2" className="form-textbox" size="5"
                                               name="q17_typeA17[1][]" style={{width:'100%',boxSizing:'border-box'}} value=""
                                               aria-labelledby="label_17_col_2 label_17_row_1"/>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </li>
                    <li id="cid_18" className="form-input-wide" data-type="control_head">
                        <div className="form-header-group  header-default">
                            <div className="header-text httac htvam">
                                <h2 id="header_18" className="form-header" data-component="header">
                                    IN THE EVENT OF AN EMERGENCY
                                </h2>
                                <div id="subHeader_18" className="form-subHeader">
                                    Identify and communicate the following individuals to all workers on site.
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="form-line" data-type="control_inline" id="id_19">
                        <div id="cid_19" className="form-input-wide" data-layout="full">
                            <div id="FITB_19" className="FITB formRender">
                                <p>1. <span data-type="textbox" data-grouptype="control_fullname"
                                            className="FITB-inptCont"><input type="text"
                                                                             className="form-textbox  validate[]"
                                                                             name="q19_input19[firstname-1]"
                                                                             id="19_firstname-1" required/><label
                                    htmlFor="19_firstname-1">Worker First Name</label></span> <span data-type="textbox"
                                                                                                    data-grouptype="control_fullname"
                                                                                                    className="FITB-inptCont"><input
                                    type="text" className="form-textbox  validate[]" name="q19_input19[lastname-1]"
                                    id="19_lastname-1" required/><label htmlFor="19_lastname-1">Worker Last Name</label></span>
                                    <span style={{color:'#000000',backgroundColor:'transparent'}}> will contact the necessary emergency services and MOL, MOE etc..   </span><span
                                        data-type="textbox" data-grouptype="control_fullname" className="FITB-inptCont"><input
                                        type="text" className="form-textbox  validate[]" name="q19_input19[firstname-2]"
                                        id="19_firstname-2" required/><label htmlFor="19_firstname-2">First Name</label></span>
                                    <span data-type="textbox" data-grouptype="control_fullname"
                                          className="FITB-inptCont"><input type="text"
                                                                           className="form-textbox  validate[]"
                                                                           name="q19_input19[lastname-2]"
                                                                           id="19_lastname-2" required/><label
                                        htmlFor="19_lastname-2">Last Name</label></span> <span
                                        style={{color:'#000000',backgroundColor:'transparent'}}> will act as an alternate if the above individual is unavailable. </span>
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="form-line" data-type="control_inline" id="id_20">
                        <div id="cid_20" className="form-input-wide" data-layout="full">
                            <div id="FITB_20" className="FITB formRender">
                                <p>2. <span data-type="textbox" data-grouptype="control_fullname"
                                            className="FITB-inptCont"><input type="text"
                                                                             className="form-textbox  validate[]"
                                                                             name="q20_input20[firstname-1]"
                                                                             id="20_firstname-1" required/><label
                                    htmlFor="20_firstname-1">Worker Name</label></span> <span data-type="textbox"
                                                                                              data-grouptype="control_fullname"
                                                                                              className="FITB-inptCont"><input
                                    type="text" className="form-textbox  validate[]" name="q20_input20[lastname-1]"
                                    id="20_lastname-1" required/><label htmlFor="20_lastname-1">Worker Last Name</label></span>
                                    <span style={{color:'#000000',backgroundColor:'transparent'}}> will provide first aid treatment. The alternate first aid provider will be </span><span
                                        data-type="textbox" data-grouptype="control_fullname" className="FITB-inptCont"><input
                                        type="text" className="form-textbox  validate[]" name="q20_input20[firstname-2]"
                                        id="20_firstname-2" required/><label htmlFor="20_firstname-2">First Name</label></span>
                                    <span data-type="textbox" data-grouptype="control_fullname"
                                          className="FITB-inptCont"><input type="text"
                                                                           className="form-textbox  validate[]"
                                                                           name="q20_input20[lastname-2]"
                                                                           id="20_lastname-2" required/><label
                                        htmlFor="20_lastname-2">Last Name</label></span> <span
                                        style={{color:'#000000',backgroundColor:'transparent'}}> in the event that the above named individual is unavailable. </span>
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="form-line" data-type="control_inline" id="id_21">
                        <div id="cid_21" className="form-input-wide" data-layout="full">
                            <div id="FITB_21" className="FITB formRender">
                                <p>3. <span data-type="textbox" data-grouptype="control_fullname"
                                            className="FITB-inptCont"><input type="text"
                                                                             className="form-textbox  validate[]"
                                                                             name="q21_input21[firstname-1]"
                                                                             id="21_firstname-1" required/><label
                                    htmlFor="21_firstname-1">Supervisor Name</label></span> <span data-type="textbox"
                                                                                                  data-grouptype="control_fullname"
                                                                                                  className="FITB-inptCont"><input
                                    type="text" className="form-textbox  validate[]" name="q21_input21[lastname-1]"
                                    id="21_lastname-1" required/><label
                                    htmlFor="21_lastname-1">Supervisor  Last Name</label></span> <span
                                    style={{color:'#000000',backgroundColor:'transparent'}}> will ensure that the injured worker is provided with adequate transportation to the hospital via   </span><span
                                    data-type="textbox" data-grouptype="control_textbox"
                                    className="FITB-inptCont"><input type="text" className="form-textbox  validate[]"
                                                                     name="q21_input21[shorttext-3]" id="21_shorttext-3"
                                                                     required/><label htmlFor="21_shorttext-3"></label></span><span
                                    style={{color:'#000000',backgroundColor:'transparent'}}>    (car, ambulance, etc.). </span><span
                                    data-type="textbox" data-grouptype="control_fullname"
                                    className="FITB-inptCont"><input type="text" className="form-textbox  validate[]"
                                                                     name="q21_input21[firstname-2]" id="21_firstname-2"
                                                                     required/><label htmlFor="21_firstname-2">First Name</label></span>
                                    <span data-type="textbox" data-grouptype="control_fullname"
                                          className="FITB-inptCont"><input type="text"
                                                                           className="form-textbox  validate[]"
                                                                           name="q21_input21[lastname-2]"
                                                                           id="21_lastname-2" required/><label
                                        htmlFor="21_lastname-2">Last Name</label></span> <span
                                        style={{color:'#000000',backgroundColor:'transparent'}}>will act as an alternate if the above individual is unavailable.</span>
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="form-line" data-type="control_inline" id="id_22">
                        <div id="cid_22" className="form-input-wide" data-layout="full">
                            <div id="FITB_22" className="FITB formRender">
                                <p>4. <span data-type="textbox" data-grouptype="control_fullname"
                                            className="FITB-inptCont"><input type="text"
                                                                             className="form-textbox  validate[]"
                                                                             name="q22_input22[firstname-1]"
                                                                             id="22_firstname-1" required/><label
                                    htmlFor="22_firstname-1">First Name</label></span> <span data-type="textbox"
                                                                                             data-grouptype="control_fullname"
                                                                                             className="FITB-inptCont"><input
                                    type="text" className="form-textbox  validate[]" name="q22_input22[lastname-1]"
                                    id="22_lastname-1" required/><label htmlFor="22_lastname-1">Last Name</label></span>
                                    <span style={{color:'#000000',backgroundColor:'transparent'}}>  will meet and direct emergency services vehicles to the scene </span><span
                                        data-type="textbox" data-grouptype="control_fullname" className="FITB-inptCont"><input
                                        type="text" className="form-textbox  validate[]" name="q22_input22[firstname-2]"
                                        id="22_firstname-2" required/><label htmlFor="22_firstname-2">First Name</label></span>
                                    <span data-type="textbox" data-grouptype="control_fullname"
                                          className="FITB-inptCont"><input type="text"
                                                                           className="form-textbox  validate[]"
                                                                           name="q22_input22[lastname-2]"
                                                                           id="22_lastname-2" required/><label
                                        htmlFor="22_lastname-2">Last Name</label></span> <span
                                        style={{color:'#000000',backgroundColor:'transparent'}}> will act as an alternate if the above individual is unavailable. </span>
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="form-line" data-type="control_inline" id="id_23">
                        <div id="cid_23" className="form-input-wide" data-layout="full">
                            <div id="FITB_23" className="FITB formRender">
                                <p>5. <span data-type="textbox" data-grouptype="control_fullname"
                                            className="FITB-inptCont"><input type="text"
                                                                             className="form-textbox  validate[]"
                                                                             name="q23_input23[firstname-1]"
                                                                             id="23_firstname-1" required/><label
                                    htmlFor="23_firstname-1">First Name</label></span> <span data-type="textbox"
                                                                                             data-grouptype="control_fullname"
                                                                                             className="FITB-inptCont"><input
                                    type="text" className="form-textbox  validate[]" name="q23_input23[lastname-1]"
                                    id="23_lastname-1" required/><label htmlFor="23_lastname-1">Last Name</label></span>
                                    <span style={{color:'#000000',backgroundColor:'transparent'}}>(name of worker, who is properly trained) will provide emergency traffic control. </span><span
                                        data-type="textbox" data-grouptype="control_fullname" className="FITB-inptCont"><input
                                        type="text" className="form-textbox  validate[]" name="q23_input23[firstname-2]"
                                        id="23_firstname-2" required/><label htmlFor="23_firstname-2">First Name</label></span>
                                    <span data-type="textbox" data-grouptype="control_fullname"
                                          className="FITB-inptCont"><input type="text"
                                                                           className="form-textbox  validate[]"
                                                                           name="q23_input23[lastname-2]"
                                                                           id="23_lastname-2" required/><label
                                        htmlFor="23_lastname-2">Last Name</label></span> <span
                                        style={{color:'#000000',backgroundColor:'transparent'}}>  will act as an alternate if the above individual is unavailable. </span>
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="form-line" data-type="control_inline" id="id_24">
                        <div id="cid_24" className="form-input-wide" data-layout="full">
                            <div id="FITB_24" className="FITB formRender">
                                <p>6. <span data-type="textbox" data-grouptype="control_fullname"
                                            className="FITB-inptCont"><input type="text"
                                                                             className="form-textbox  validate[]"
                                                                             name="q24_input24[firstname-1]"
                                                                             id="24_firstname-1" required/><label
                                    htmlFor="24_firstname-1">Worker First Name</label></span> <span data-type="textbox"
                                                                                                    data-grouptype="control_fullname"
                                                                                                    className="FITB-inptCont"><input
                                    type="text" className="form-textbox  validate[]" name="q24_input24[lastname-1]"
                                    id="24_lastname-1" required/><label htmlFor="24_lastname-1">Worker Last Name</label></span>
                                    <span style={{color:'#000000',backgroundColor:'transparent'}}> will make provisions for cordoning off the accident scene to protect workers. </span><span
                                        data-type="textbox" data-grouptype="control_fullname" className="FITB-inptCont"><input
                                        type="text" className="form-textbox  validate[]" name="q24_input24[firstname-2]"
                                        id="24_firstname-2" required/><label htmlFor="24_firstname-2">First Name</label></span>
                                    <span data-type="textbox" data-grouptype="control_fullname"
                                          className="FITB-inptCont"><input type="text"
                                                                           className="form-textbox  validate[]"
                                                                           name="q24_input24[lastname-2]"
                                                                           id="24_lastname-2" required/><label
                                        htmlFor="24_lastname-2">Last Name</label></span> <span
                                        style={{color:'#000000',backgroundColor:'transparent'}}>  will act as an alternate if the above individual is unavailable. </span>
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="form-line" data-type="control_inline" id="id_25">
                        <div id="cid_25" className="form-input-wide" data-layout="full">
                            <div id="FITB_25" className="FITB formRender">
                                <p>7. <span data-type="textbox" data-grouptype="control_fullname"
                                            className="FITB-inptCont"><input type="text"
                                                                             className="form-textbox  validate[]"
                                                                             name="q25_input25[firstname-1]"
                                                                             id="25_firstname-1" required/><label
                                    htmlFor="25_firstname-1">Worker First Name</label></span> <span data-type="textbox"
                                                                                                    data-grouptype="control_fullname"
                                                                                                    className="FITB-inptCont"><input
                                    type="text" className="form-textbox  validate[]" name="q25_input25[lastname-1]"
                                    id="25_lastname-1" required/><label htmlFor="25_lastname-1">Worker Last Name</label></span>
                                    <span style={{color:'#000000',backgroundColor:'transparent'}}>  will document where the injured worker has been taken. (Hospital, medical center etc.). </span><span
                                        data-type="textbox" data-grouptype="control_fullname" className="FITB-inptCont"><input
                                        type="text" className="form-textbox  validate[]" name="q25_input25[firstname-2]"
                                        id="25_firstname-2" required/><label htmlFor="25_firstname-2">First Name</label></span>
                                    <span data-type="textbox" data-grouptype="control_fullname"
                                          className="FITB-inptCont"><input type="text"
                                                                           className="form-textbox  validate[]"
                                                                           name="q25_input25[lastname-2]"
                                                                           id="25_lastname-2" required/><label
                                        htmlFor="25_lastname-2">Last Name</label></span> <span
                                        style={{color:'#000000',backgroundColor:'transparent'}}>   will act as an alternate if the above individual is unavailable. </span>
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="form-line" data-type="control_inline" id="id_26">
                        <div id="cid_26" className="form-input-wide" data-layout="full">
                            <div id="FITB_26" className="FITB formRender">
                                <p>8. <span style={{color:'#000000',backgroundColor:'transparent'}}>In the event that the supervisor has left the site to transport the injured worker to the hospital, </span>
                                    <span data-type="textbox" data-grouptype="control_fullname"
                                          className="FITB-inptCont"><input type="text"
                                                                           className="form-textbox  validate[]"
                                                                           name="q26_input26[firstname-1]"
                                                                           id="26_firstname-1" required/><label
                                        htmlFor="26_firstname-1">Worker First Name</label></span> <span
                                        data-type="textbox" data-grouptype="control_fullname" className="FITB-inptCont"><input
                                        type="text" className="form-textbox  validate[]" name="q26_input26[lastname-1]"
                                        id="26_lastname-1" required/><label
                                        htmlFor="26_lastname-1">Worker Last Name</label></span> <span
                                        style={{color:'#000000',backgroundColor:'transparent'}}>  will supervise the site.  </span><span
                                        data-type="textbox" data-grouptype="control_fullname" className="FITB-inptCont"><input
                                        type="text" className="form-textbox  validate[]" name="q26_input26[firstname-2]"
                                        id="26_firstname-2" required/><label htmlFor="26_firstname-2">First Name</label></span>
                                    <span data-type="textbox" data-grouptype="control_fullname"
                                          className="FITB-inptCont"><input type="text"
                                                                           className="form-textbox  validate[]"
                                                                           name="q26_input26[lastname-2]"
                                                                           id="26_lastname-2" required/><label
                                        htmlFor="26_lastname-2">Last Name</label></span> <span
                                        style={{color:'#000000',backgroundColor:'transparent'}}>will act as an alternate if the above individual is unavailable. </span>
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="form-line" data-type="control_button" id="id_2">
                        <div id="cid_2" className="form-input-wide" data-layout="full">
                            <div data-align="auto"
                                 className="form-buttons-wrapper form-buttons-auto   jsTest-button-wrapperField">
                                <button id="input_2" type="submit"
                                        className="form-submit-button submit-button jf-form-buttons jsTest-submitField"
                                        data-component="button" data-content="">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </li>
                    <li style={{clear:'both'}}>
                    </li>
                    <li style={{display:'none'}}>
                        Should be Empty:
                        <input type="text" name="website" value=""/>
                    </li>
                </ul>
            </div>
            <script>
                JotForm.showJotFormPowered = "new_footer";
            </script>
            <script>
                JotForm.poweredByText = "Powered by Jotform";
            </script>
            <input type="hidden" className="simple_spc" id="simple_spc" name="simple_spc" value="220116394123041"/>

            <div className="formFooter-heightMask">
            </div>
            {showDialog && <MDialog showedHtml={showedHtml} showDialog={showDialog} setShowDialog={setShowDialog}/>}
        </form>
    )
}