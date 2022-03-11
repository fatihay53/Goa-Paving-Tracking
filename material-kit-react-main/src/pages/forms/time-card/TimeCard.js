import './time-card.css'
import React, {useEffect, useRef, useState} from "react";
import TimePicker from 'react-time-picker';
import moment from 'moment';
import {toast} from "react-toastify";
import TimeCardService from "../../../services/TimeCardService";
import {Checkbox} from "primereact/checkbox";
import MSignaturePad from "../../../components/mcomponents/MSignaturePad";

export default function TimeCard() {
    const [form, setForm] = useState({
        startHour: '07:00',
        endHour: '07:00',
        totalHour: ''
    });

    const [user, setUser] = useState({});
    const [div, setDiv] = useState(null);
    const [boardAllowance, setBoardAllowance] = useState(false);
    const timeCardService = new TimeCardService();
    const refSignaturePad = useRef();
    const [touchedSignature, setTouchedSignature] = useState(false);

    useEffect(() => {
        //JotFormConfig();
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

    const getTotalHourDouble=()=>{
        let totalHour = form.totalHour;
        let totalHourArr = totalHour.split(":");
        let hour = parseInt(totalHourArr[0]);
        let minute = totalHourArr[1] === '00' ? 0 : totalHourArr[1] === '30' ? 0.5 : 0;
        return hour + minute;
    }

    const saveForm = () => {
        const date = document.getElementById('lite_mode_5').value;
        if (form.totalHour === "" || form.totalHour === null || form.totalHour == 0 || div < 0) {
            return toast.warning("Please enter time.");
        }

        let totalParseMin = form.totalHour.split(":")[1];
        if (totalParseMin !== "00" && totalParseMin !== "30"){
            return toast.warning("Please fill total hour minute 00 or 30.");
        }

        if (!touchedSignature){
            return toast.warning("Please fill signature.");
        }

        const signature = refSignaturePad.current.getSignature();
        let totalHourDouble = getTotalHourDouble();

        timeCardService.save({...form, date, signature,userId : user.userId,boardAllowance,totalHourDouble:totalHourDouble}).then(async res => {
            if (res.status == 200) {
                refSignaturePad.current.clearSignature();
                setBoardAllowance(false);
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
        <form onSubmit={(event) => event.preventDefault()} style={{backgroundColor:'#f3f3fe'}}>
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
                    <li className="form-input-wide jf-required" data-type="control_signature">
                        <div className="p-field-checkbox">
                            <Checkbox inputId="binary" checked={boardAllowance} onChange={e => setBoardAllowance(e.checked)} />
                            <label htmlFor="binary">Board Allowance</label>
                        </div>
                    </li>
                    <li className="form-line" data-type="control_signature" id="id_6">
                        <label className="form-label form-label-top form-label-auto" id="label_6"
                               htmlFor="input_6"> Signature </label>
                        <MSignaturePad ref={refSignaturePad} setTouchedSignature={setTouchedSignature}/>
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