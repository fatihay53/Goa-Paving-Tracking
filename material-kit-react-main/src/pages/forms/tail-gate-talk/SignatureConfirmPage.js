import React, {useEffect, useRef, useState} from "react";
import TailGateTalkFormService from "../../../services/TailGateTalkFormService";
import AttendeesService from "../../../services/AttendeesService";
import {toast} from "react-toastify";
import {useNavigate} from "react-router";
import {talks} from '../talks/talk_list';
import {Accordion, AccordionTab} from "primereact/accordion";
import { Checkbox } from 'primereact/checkbox';
import MSignaturePad from "../../../components/mcomponents/MSignaturePad";

export default function SignatureConfirmPage() {

    const tailGateTalkFormService = new TailGateTalkFormService();
    const attendeesService = new AttendeesService();
    const [tailGateForm, setTailGetForm] = useState({});
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);
    const refSignaturePad = useRef();
    const [touchedSignature, setTouchedSignature] = useState(false);

    let url = new URL(window.location.href);
    let formId = url.searchParams.get("formId");

    let userId = JSON.parse(localStorage.getItem('user'))?.userId;

    useEffect(() => {
        if(userId !== null && userId !== undefined){
            tailGateTalkFormService.findById({formId: formId}).then(res => {
                if (res.status == 200) {
                    setTailGetForm(res.data[0])
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

        attendeesService.updateSignature({userId: userId,formId: formId,signature:signature,isApproval:checked}).then(res=>{
            if (res.status == 200){
                toast.success("Signatured success!");
                return navigate('/dashboard', { replace: true });
            }
        })
    }

    let accordion = talks.filter(elem => elem.header === tailGateForm.subject).map(elem=>{
        return <AccordionTab header={elem.header}>
            {elem.talk}
        </AccordionTab>
    });

    return (

        <form className="jotform-form" name="form_220115730197045" id="220115730197045" accept-charset="utf-8"
              autoComplete="on"
              onSubmit={(event) => event.preventDefault()}>
            <div role="main" className="form-all">
                <p>Signature to {tailGateForm.date} {tailGateForm.subject}</p>
                <ul className="form-section page-section">
                    <li className="form-input-wide jf-required" data-type="control_signature">
                        <div className="accordion-demo">
                            <div className="card">
                                <Accordion activeIndex={0}>
                                    {accordion}
                                </Accordion>
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