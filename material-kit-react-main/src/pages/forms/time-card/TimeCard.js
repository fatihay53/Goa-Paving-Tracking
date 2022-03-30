import './time-card.css'
import React, {useEffect, useRef, useState} from "react";
import TimePicker from 'react-time-picker';
import moment from 'moment';
import {toast} from "react-toastify";
import TimeCardService from "../../../services/TimeCardService";
import {Checkbox} from "primereact/checkbox";
import MSignaturePad from "../../../components/mcomponents/MSignaturePad";
import {Calendar} from "primereact/calendar";
import GeneralUtils from "../../../utils/GeneralUtils";
import LoadingScreen from "react-loading-screen";
import logo from "../../../goa_logo.png";

const START_HOUR_INITIAL= '07:00';
const END_HOUR_INITIAL= '07:00';

export default function TimeCard() {

    const [form, setForm] = useState({
        startHour: START_HOUR_INITIAL,
        endHour: END_HOUR_INITIAL,
        totalHour: '',
        date: new Date()
    });

    const [user, setUser] = useState({});
    const [div, setDiv] = useState(null);
    const [boardAllowance, setBoardAllowance] = useState(false);
    const timeCardService = new TimeCardService();
    const refSignaturePad = useRef();
    const [touchedSignature, setTouchedSignature] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        //JotFormConfig();
        setUser(JSON.parse(localStorage.getItem("user")));
    }, []);

    const onChangeStartHour = (e) => {
        if (!GeneralUtils.isNullOrEmpty(e)){
            let totalHour = calculateTotalTime(e, form.endHour);
            /*if (result === false){
                setForm({...form, startHour: START_HOUR_INITIAL});
                return toast.warn("Start time cannot forward at end time.");
            }else{*/
                setForm({...form, startHour: e, totalHour});
            //}
        }
    }

    const onChangeEndHour = (e) => {
        if (!GeneralUtils.isNullOrEmpty(e)){
            let totalHour = calculateTotalTime(form.startHour, e);
            setForm({...form, endHour: e, totalHour});
        }
    }

    const calculateTotalTime = (start, end) => {
        let arr = end.split(":");
        let endMoment = moment([arr[0], arr[1]], "HH:mm");

        let arrStart = start.split(":");
        /*if (!GeneralUtils.isNullOrEmpty(form.endHour)){
            let arrEnd = form.endHour.split(":");

            if (parseInt(arrStart[0])>parseInt(arrEnd[0])){
                    return false;
            }else if(arrEnd[0] == arrStart[0]){
                if (arrStart[1] > arrEnd[1]){
                    return false;
                }
            }
        }*/

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

    async function saveForm () {
        if (form.totalHour === "" || form.totalHour === null || form.totalHour == 0) {
            return toast.warning("Please enter time.");
        }

        let totalParseMin = form.totalHour.split(":")[1];
        if (totalParseMin !== "00" && totalParseMin !== "30"){
            return toast.warning("Please fill total hour minute 00 or 30.");
        }

        if (div < 0){
            return toast.warn("Start time cannot forward at end time.");
        }

        if (!GeneralUtils.isNullOrEmpty(form.endHour)&&!GeneralUtils.isNullOrEmpty(form.startHour)){
            let arrStart = form.startHour.split(":");
            let arrEnd = form.endHour.split(":");

            if (parseInt(arrStart[0])>parseInt(arrEnd[0])){
                    return toast.warn("Start time cannot forward at end time.");
            }else if(arrEnd[0] == arrStart[0]){
                if (arrStart[1] > arrEnd[1]){
                    return toast.warn("Start time cannot forward at end time.");
                }else  if (arrStart[1] == arrEnd[1]){
                    return toast.warn("Please select different start and end time.");
                }
            }
        }

        if (!touchedSignature){
            return toast.warning("Please fill signature.");
        }

        const signature = refSignaturePad.current.getSignature();
        let totalHourDouble = getTotalHourDouble();
        setSubmitted(true);
        refSignaturePad.current.clearSignature();
        await timeCardService.save({...form, signature,userId : user.userId,boardAllowance,totalHourDouble:totalHourDouble}).then(async res => {
            if (res.status == 200) {
                setBoardAllowance(false);
                setForm({
                    startHour: START_HOUR_INITIAL,
                    endHour: END_HOUR_INITIAL,
                    totalHour: '',
                    date: new Date()
                });
                setSubmitted(false);
                toast.success("Saved succesfully!");
            }
        })
        setSubmitted(false);
    }

    let submittedForm = <form onSubmit={(event) => event.preventDefault()} style={{backgroundColor:'#f3f3fe'}}>
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
                    <label className="form-label form-label-top form-label-auto" id="label_5" htmlFor="input_5">
                        Date
                        <span className="form-required">
            *
          </span>
                    </label>
                    <div className="p-fluid grid formgrid">
                        <Calendar id="icon" value={form.date} onChange={(e) => setForm({...form,date:e.value})}
                                  dateFormat={GeneralUtils.DATE_FORMAT_CALENDAR}
                                  showIcon/>
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

    return (submitted === true ? loading : submittedForm);
}