import React, {useEffect, useState} from "react";
import TailGateTalkFormService from "../../../services/TailGateTalkFormService";
import AttendeesService from "../../../services/AttendeesService";
import {toast} from "react-toastify";
import {useNavigate} from "react-router";

export default function SignatureConfirmPage() {

    const tailGateTalkFormService = new TailGateTalkFormService();
    const attendeesService = new AttendeesService();
    const [tailGateForm, setTailGetForm] = useState({});
    const navigate = useNavigate();

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
        let signature = document.getElementById('input_7').value;
        if (signature == null || signature == undefined || signature === ''){
            return toast.warning("Please fill signature area!")
        }

        attendeesService.updateSignature({userId: userId,formId: formId,signature:signature}).then(res=>{
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
                <p>Signature to {tailGateForm.date}</p>
                <ul className="form-section page-section">
                    <li className="form-line form-line-column form-col-4 jf-required" data-type="control_signature"
                        id="id_7">
                        <label className="form-label form-label-top form-label-auto" id="label_7" htmlFor="input_7">
                            Signature
                            <span className="form-required">
            *
          </span>
                        </label>
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
                        </div>
                    </li>
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