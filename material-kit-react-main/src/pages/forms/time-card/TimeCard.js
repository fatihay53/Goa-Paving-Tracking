import './time-card.css'
import React, {useEffect, useRef, useState} from "react";
import {JotFormConfig} from "../../JotFormConfig";
import TimePicker from 'react-time-picker';
import moment from 'moment';
import {toast} from "react-toastify";
import SignaturePad from 'react-signature-pad-wrapper'
import TimeCardService from "../../../services/TimeCardService";

export default function TimeCard() {
    const [form, setForm] = useState({
        startHour: '07:00',
        endHour: '07:00',
        totalHour: ''
    });

    const [user, setUser] = useState({});
    const [div, setDiv] = useState(null);
    const [touchedSignature, setTouchedSignature] = useState(false);
    const refSignaturePad = useRef();
    const timeCardService = new TimeCardService();

    useEffect(() => {
        JotFormConfig();
        setUser(JSON.parse(localStorage.getItem("user")));
    }, []);

    const onChangeStartHour = (e) => {
        const date = document.getElementById('lite_mode_5').value;
        let totalHour = calculateTotalTime(e, form.endHour);
        setForm({...form, startHour: e, date, totalHour});
    }

    const onChangeEndHour = (e) => {
        const date = document.getElementById('lite_mode_5').value;
        let totalHour = calculateTotalTime(form.startHour, e);
        setForm({...form, endHour: e, date, totalHour});
    }

    const calculateTotalTime = (start, end) => {
        let arr = end.split(":");
        let endMoment = moment([arr[0], arr[1]], "HH:mm");

        let arrStart = start.split(":");
        let startMoment = moment([arrStart[0], arrStart[1]], "HH:mm");
        let result = endMoment.diff(startMoment, 'minutes');
        let remaining = result % 60;
        let div = Math.trunc(result / 60);
        setDiv(div);

        return remaining < 10 ? div + ":" + "0" + remaining : div + ":" + remaining;
    }

    const clearSignature=()=>{
        refSignaturePad.current.clear();
    }

    const saveForm = () => {
        const date = document.getElementById('lite_mode_5').value;
        const signature = refSignaturePad.current.toDataURL();
        if (form.totalHour === "" || form.totalHour === null || form.totalHour == 0 || div < 0) {
            return toast.warning("Please enter time.");
        }
        if (!touchedSignature){
            return toast.warning("Please fill signature.");
        }

        timeCardService.save({...form, date, signature,userId : user.userId}).then(async res => {
            if (res.status == 200) {
                clearSignature();
                setForm({
                    startHour: '07:00',
                    endHour: '07:00',
                    totalHour: ''
                });
                toast.success("Saved succesfully!");
            }
        })

    }

    return (
        <form className="jotform-form"
            //action="https://submit.jotform.com/submit/220115543894051/"
            //method="post"
              name="form_220115543894051"
              id="220115543894051"
              accept-charset="utf-8" autoComplete="on" onSubmit={(event) => event.preventDefault()}>
            <input type="hidden" name="formID" value="220115543894051"/>
            <input type="hidden" id="JWTContainer" value=""/>
            <input type="hidden" id="cardinalOrderNumber" value=""/>
            <div role="main" className="form-all">
                <ul className="form-section page-section">

                    <li id="cid_1" className="form-input-wide" data-type="control_head">
                        <div className="form-header-group  header-large">
                            <div className="header-text httac htvam">
                                <h1 id="header_1" className="form-header" data-component="header">
                                    Time Card
                                </h1>
                            </div>
                        </div>
                    </li>
                    <li className="form-line jf-required" data-type="control_datetime" id="id_5">
                        <label className="form-label form-label-top form-label-auto" id="label_5" htmlFor="lite_mode_5">
                            Date
                            <span className="form-required">
            *
          </span>
                        </label>
                        <div id="cid_5" className="form-input-wide jf-required" data-layout="half">
                            <div data-wrapper-react="true">
                                <div style={{display: 'none'}}>
              <span className="form-sub-label-container" style={{verticalAlign: 'top'}}>
                <input type="tel" className="currentDate form-textbox validate[required, limitDate]" id="day_5"
                       name="q5_date[day]" size="2" data-maxlength="2" data-age="" maxLength="2" value="25" required=""
                       autoComplete="section-input_5 off" aria-labelledby="label_5 sublabel_5_day"/>
                <span className="date-separate" aria-hidden="true">
                   -
                </span>
                <label className="form-sub-label" htmlFor="day_5" id="sublabel_5_day" style={{minHeight: '13px'}}
                       aria-hidden="false"> Day </label>
              </span>
                                    <span className="form-sub-label-container" style={{verticalAlign: 'top'}}>
                <input type="tel" className="form-textbox validate[required, limitDate]" id="month_5"
                       name="q5_date[month]" size="2" data-maxlength="2" data-age="" maxLength="2" value="01"
                       required="" autoComplete="section-input_5 off" aria-labelledby="label_5 sublabel_5_month"/>
                <span className="date-separate" aria-hidden="true">
                   -
                </span>
                <label className="form-sub-label" htmlFor="month_5" id="sublabel_5_month" style={{minHeight: '13px'}}
                       aria-hidden="false"> Month </label>
              </span>
                                    <span className="form-sub-label-container" style={{verticalAlign: 'top'}}>
                <input type="tel" className="form-textbox validate[required, limitDate]" id="year_5"
                       name="q5_date[year]" size="4" data-maxlength="4" data-age="" maxLength="4" value="2022"
                       required="" autoComplete="section-input_5 off" aria-labelledby="label_5 sublabel_5_year"/>
                <label className="form-sub-label" htmlFor="year_5" id="sublabel_5_year" style={{minHeight: '13px'}}
                       aria-hidden="false"> Year </label>
              </span>
                                </div>
                                <span className="form-sub-label-container" style={{verticalAlign: 'top'}}>
              <input type="text" className="form-textbox validate[required, limitDate, validateLiteDate]"
                     id="lite_mode_5" size="12" data-maxlength="12" maxLength="12" data-age=""
                     required="" data-format="ddmmyyyy" data-seperator="-" placeholder="DD-MM-YYYY"
                     autoComplete="section-input_5 off" aria-labelledby="label_5 sublabel_5_litemode"/>
              <img className="showAutoCalendar newDefaultTheme-dateIcon icon-liteMode" alt="Pick a Date"
                   id="input_5_pick" src="https://cdn.jotfor.ms/images/calendar.png" data-component="datetime"
                   aria-hidden="true" data-allow-time="No" data-version="v2"/>
              <label className="form-sub-label" htmlFor="lite_mode_5" id="sublabel_5_litemode"
                     style={{minHeight: '13px'}}
                     aria-hidden="false"> Date </label>
            </span>
                            </div>
                        </div>
                    </li>
                    <li id="cid_1" className="form-input-wide" data-type="control_head">
                        <li className="form-line" data-type="control_fullname" id="id_3">
                            <label className="form-label form-label-top form-label-auto" id="label_3"
                                   htmlFor="first_3"> Time <span className="form-required">
            *
          </span> </label>
                            <div id="cid_3" className="form-input-wide" data-layout="full">
                                <div data-wrapper-react="true">
            <span className="form-sub-label-container" style={{verticalAlign: 'top'}} data-input-type="first">
             <TimePicker
                 disableClock={true}
                 onChange={onChangeStartHour}
                 value={form.startHour}
             />
              <label className="form-sub-label" htmlFor="first_3" id="sublabel_3_first" style={{minHeight: '13px'}}
                     aria-hidden="false"> Start Time </label>
            </span>
                                    <span className="form-sub-label-container" style={{verticalAlign: 'top'}}
                                          data-input-type="last">
              <TimePicker
                  disableClock={true}
                  onChange={onChangeEndHour}
                  value={form.endHour}
              />
              <label className="form-sub-label" htmlFor="last_3" id="sublabel_3_last" style={{minHeight: '13px'}}
                     aria-hidden="false"> End Time </label>
            </span>
                                    <span className="form-sub-label-container" style={{verticalAlign: 'top'}}
                                          data-input-type="first">
                  {form.totalHour}
                                        {form.totalHour &&
                                        <label className="form-sub-label" htmlFor="first_3" id="sublabel_3_first"
                                               style={{minHeight: '13px'}}
                                               aria-hidden="false"> Total </label>}
            </span>
                                </div>
                            </div>
                        </li>
                    </li>
                    <li className="form-line" data-type="control_fullname" id="id_3">
                        <label className="form-label form-label-top form-label-auto" id="label_3"
                               htmlFor="first_3"> Name </label>
                        <div id="cid_3" className="form-input-wide" data-layout="full">
                            <div data-wrapper-react="true">
            <span className="form-sub-label-container" style={{verticalAlign: 'top'}} data-input-type="first">
              <input type="text" id="first_3" name="q3_name[first]" className="form-textbox" data-defaultvalue=""
                     autoComplete="section-input_3 given-name" size="10" disabled={true} value={user.name}
                     data-component="first"
                     aria-labelledby="label_3 sublabel_3_first"/>
              <label className="form-sub-label" htmlFor="first_3" id="sublabel_3_first" style={{minHeight: '13px'}}
                     aria-hidden="false"> First Name </label>
            </span>
                                <span className="form-sub-label-container" style={{verticalAlign: 'top'}}
                                      data-input-type="last">
              <input type="text" id="last_3" name="q3_name[last]" className="form-textbox" data-defaultvalue=""
                     autoComplete="section-input_3 family-name" size="15" disabled={true} value={user.surname}
                     data-component="last"
                     aria-labelledby="label_3 sublabel_3_last"/>
              <label className="form-sub-label" htmlFor="last_3" id="sublabel_3_last" style={{minHeight: '13px'}}
                     aria-hidden="false"> Last Name </label>
            </span>
                            </div>
                        </div>
                    </li>
                    <li className="form-line" data-type="control_signature" id="id_6">
                        <label className="form-label form-label-top form-label-auto" id="label_6"
                               htmlFor="input_6"> Signature </label>
                        <div style={{border: '1px solid black'}} onClick={()=>setTouchedSignature(true)}>
                            <SignaturePad
                                width={300} height={175}
                                ref={refSignaturePad}
                            />
                            <button onClick={clearSignature}>clear</button>
                        </div>
                    </li>
                    <li className="form-line" data-type="control_button" id="id_2">
                        <div id="cid_2" className="form-input-wide" data-layout="full">
                            <div data-align="auto"
                                 className="form-buttons-wrapper form-buttons-auto   jsTest-button-wrapperField">
                                <button id="input_2" type="submit"
                                        onClick={saveForm}
                                        className="form-submit-button submit-button jf-form-buttons jsTest-submitField"
                                        data-component="button" data-content="">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </li>
                    <li style={{display: 'none'}}>
                        Should be Empty:
                        <input type="text" name="website" value=""/>
                    </li>
                </ul>
            </div>
        </form>
    )
}