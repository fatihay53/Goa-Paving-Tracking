import React, {useEffect, useRef, useState} from "react";
import TailGateTalkFormService from "../../../services/TailGateTalkFormService";
import AttendeesService from "../../../services/AttendeesService";
import {toast} from "react-toastify";
import {useNavigate} from "react-router";
import {talks} from '../talks/talk_list';
import { Checkbox } from 'primereact/checkbox';
import MSignaturePad from "../../../components/mcomponents/MSignaturePad";
import PreJobSafetyFormService from "../../../services/PreJobSafetyFormService";
import {GENERAL_OPTIONS} from "./generaloptions";
import {ENVIRONMENT_OPTIONS} from "./enviromentoptions";
import {HAZARDOUS_OPTIONS} from "./hazardousoptions";

export default function SignatureConfirmPageSafety() {

    const preJobSafetyFormService = new PreJobSafetyFormService();
    const attendeesService = new AttendeesService();
    const [preJobSafetyForm, setPreJobSafetyForm] = useState({});
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);
    const refSignaturePad = useRef();
    const [touchedSignature, setTouchedSignature] = useState(false);

    const [checkedStateGenerals, setCheckedStateGenerals] = useState([]);
    const [checkedStateEnviroments, setCheckedStateEnviroments] = useState([]);
    const [checkedStateHazarDous, setCheckedStateHazarDous] = useState([]);

    let url = new URL(window.location.href.replace(/#/g,""));
    let formId = url.searchParams.get("formId");

    let userId = JSON.parse(localStorage.getItem('user'))?.userId;

    useEffect(() => {
        if(userId !== null && userId !== undefined){
            preJobSafetyFormService.findById({formId: formId}).then(res => {
                if (res.status == 200) {
                    setPreJobSafetyForm(res.data[0]);
                    setCheckedStateGenerals(JSON.parse(res.data[0]?.general_options));
                    setCheckedStateEnviroments(JSON.parse(res.data[0]?.environment_options));
                    setCheckedStateHazarDous(JSON.parse(res.data[0]?.hazardous_options));
                }
            })
        }
    }, []);

    const updateSignature=()=>{

        if (checked == false){
            return toast.warning("Please confirm checkbox!")
        }

        if (!touchedSignature){
            return toast.warning("Please fill signature.");
        }

        const signature = refSignaturePad.current.getSignature();

        attendeesService.updateSignature({userId: userId,formId: formId,signature:signature,isApproval:checked,formType:'PRE_JOB_SAFETY_FORM'}).then(res=>{
            if (res.status == 200){
                toast.success("Signatured success!");
                return navigate('/dashboard', { replace: true });
            }
        })
    }

    return (

        <form className="jotform-form" name="form_220115730197045" id="220115730197045" accept-charset="utf-8"
              autoComplete="on"
              onSubmit={(event) => event.preventDefault()}>
            <div role="main" className="form-all">
                <p>Signature to {preJobSafetyForm.date} {preJobSafetyForm.subject}</p>
                <ul className="form-section page-section">
                    <li className="form-input-wide jf-required" data-type="control_signature">
                        <div className="accordion-demo">
                            <div className="card">
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
                                                     id={`custom-checkbox-${index}`}
                                                     name={name}
                                                     checked={checkedStateGenerals[index]}
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
                                <div className="p-field-checkbox">
                                    <Checkbox inputId="binary" checked={checked} onChange={e => setChecked(e.checked)} />
                                    <label htmlFor="binary">I have read and understood.</label>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="form-line form-line-column form-col-4 jf-required" data-type="control_signature">

                    </li>
                    <li className="form-line form-line-column form-col-4 jf-required" data-type="control_signature">

                    </li>
                    <li className="form-line form-line-column form-col-4 jf-required" data-type="control_signature">

                    </li>
                    {checked&&<li className="form-line form-line-column form-col-4 jf-required" data-type="control_signature"
                        id="id_7">
                        <label className="form-label form-label-top form-label-auto" id="label_7">
                            Signature
                            <span className="form-required">
            *
          </span>
                        </label>
                        <MSignaturePad ref={refSignaturePad} setTouchedSignature={setTouchedSignature}/>
                    </li>}
                    <li className="form-line" data-type="control_button" id="id_2">
                        <div id="cid_2" className="form-input-wide" data-layout="full">
                            <div data-align="auto"
                                 className="form-buttons-wrapper form-buttons-auto   jsTest-button-wrapperField">
                                <button id="input_2" type="submit"
                                        onClick={updateSignature}
                                        className="submit-button jf-form-buttons jsTest-submitField"
                                        data-component="button" data-content="">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </form>
    )
}