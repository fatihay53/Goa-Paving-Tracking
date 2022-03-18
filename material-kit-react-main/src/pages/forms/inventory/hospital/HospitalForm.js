import React, {useState} from "react";
import GeneralUtils from "../../../../utils/GeneralUtils";
import {toast} from "react-toastify";
import HospitalService from "../../../../services/HospitalService";

export default function HospitalForm({isShow,selectedData,setShowSelectedData,findAll}) {

    const hospitalService = new HospitalService();

    let initialState = isShow ? selectedData : {
        name : '',
        phone: '',
        street: '',
        city: '',
        zip: ''
    };

    const [form, setForm] = useState(initialState);

    const onChangeName=(e)=>{
        setForm({...form,name:e.target.value})
    }

    const onChangePhone=(e)=>{
        setForm({...form,phone:e.target.value})
    }

    const onChangeStreet=(e)=>{
        setForm({...form,street:e.target.value})
    }

    const onChangeCity=(e)=>{
        setForm({...form,city:e.target.value})
    }

    const onChangeZip=(e)=>{
        setForm({...form,zip:e.target.value})
    }

    const saveForm=()=>{
        if (GeneralUtils.isNullOrEmpty(form.name) ||
            GeneralUtils.isNullOrEmpty(form.phone) ||
            GeneralUtils.isNullOrEmpty(form.street) ||
            GeneralUtils.isNullOrEmpty(form.city) ||
            GeneralUtils.isNullOrEmpty(form.zip)
        ){
            return toast.warning("Please check required fields!")
        }

        if (!isShow){
            hospitalService.save({...form}).then(res=>{
                if (res.status == 200){
                    toast.success("Saved succesfully!");
                    setForm({
                        name : '',
                        phone: '',
                        street: '',
                        city: '',
                        zip: ''
                    });
                }
            })
        }else{
            hospitalService.update({...form,id:selectedData.id}).then(res=>{
                if (res.status == 200){
                    toast.success("Update succesfully!");
                    setShowSelectedData(false);
                    findAll();
                }
            })
        }
    }

    return (
        <form style={{backgroundColor: '#f3f3fe'}} className="jotform-form" autoComplete="on"
              onSubmit={(event) => event.preventDefault()}>
            <div role="main" className="form-all">
                <ul className="form-section page-section">
                    <li id="cid_1" className="form-input-wide" data-type="control_head">
                        <div className="form-header-group  header-small">
                            <div className="header-text httac htvam">
                                <h3 id="header_1" className="form-header" data-component="header">
                                    Hospital Form
                                </h3>
                            </div>
                        </div>
                    </li>
                    <li className="form-line form-line-column form-col-1 jf-required" data-type="control_phone"
                        id="id_4">
                        <label className="form-label form-label-top form-label-auto" id="label_4"
                               htmlFor="input_4_full">
                            Name
                            <span className="form-required">
                                *
                              </span>
                        </label>
                        <div id="cid_4" className="form-input-wide jf-required" data-layout="half">
                          <span className="form-sub-label-container" style={{verticalAlign: 'top'}}>
                            <input type="text" name="name"
                                   className="form-textbox"
                                   value={form.name}
                                   onChange={onChangeName}
                                   style={{width: '310px'}} aria-labelledby="label_4 sublabel_4_masked"/>
                          </span>
                        </div>
                    </li>
                    <li className="form-line form-line-column form-col-2 jf-required" data-type="control_textbox"
                        id="id_7">
                        <label className="form-label form-label-top form-label-auto" id="label_4"
                               htmlFor="input_4_full">
                            Phone Number
                            <span className="form-required">
                                *
                              </span>
                        </label>
                        <div id="cid_4" className="form-input-wide jf-required" data-layout="half">
                          <span className="form-sub-label-container" style={{verticalAlign: 'top'}}>
                            <input type="text" id="input_4_full" name="q4_phoneNumber[full]"
                                   className="form-textbox validate[required, Fill Mask]"
                                   value={form.phone}
                                   onChange={onChangePhone}
                                   style={{width: '310px'}} aria-labelledby="label_4 sublabel_4_masked"/>
                          </span>
                        </div>
                    </li>
                    <li className="form-line jf-required" data-type="control_fullname" id="id_3">
                        <label className="form-label form-label-top form-label-auto" id="label_3" htmlFor="first_3">
                            Address
                            <span className="form-required">
            *
          </span>
                        </label>
                        <div id="cid_3" className="form-input-wide jf-required" data-layout="full">
                            <div data-wrapper-react="true">
            <span className="form-sub-label-container" style={{verticalAlign: 'top'}} data-input-type="first">
              <input type="text" id="first_3" name="q3_name[first]" className="form-textbox validate[required]"
                     data-defaultvalue="" autoComplete="section-input_3 given-name" size="10"
                     value={form.street}
                     onChange={onChangeStreet}
                     data-component="first" aria-labelledby="label_3 sublabel_3_first" required=""/>
              <label className="form-sub-label" htmlFor="first_3" id="sublabel_3_first" style={{minHeight: '13px'}}
                     aria-hidden="false"> Street Address </label>
            </span>
                                <span className="form-sub-label-container" style={{verticalAlign: 'top'}}
                                      data-input-type="last">
              <input type="text" id="last_3" name="q3_name[last]" className="form-textbox validate[required]"
                     data-defaultvalue="" autoComplete="section-input_3 family-name" size="15"
                     value={form.city}
                     onChange={onChangeCity}
                     data-component="last" aria-labelledby="label_3 sublabel_3_last" required=""/>
              <label className="form-sub-label" htmlFor="last_3" id="sublabel_3_last" style={{minHeight: '13px'}}
                     aria-hidden="false"> City </label>
            </span>
                                <span className="form-sub-label-container" style={{verticalAlign: 'top'}}
                                      data-input-type="last">
              <input type="text" id="last_11" name="q11_name[last]" className="form-textbox validate[required]"
                     data-defaultvalue="" autoComplete="section-input_3 family-name" size="15"
                     value={form.zip}
                     onChange={onChangeZip}
                     data-component="last" aria-labelledby="label_3 sublabel_3_last" required=""/>
              <label className="form-sub-label" htmlFor="last_3" id="sublabel_3_last" style={{minHeight: '13px'}}
                     aria-hidden="false"> Zip </label>
            </span>
                            </div>
                        </div>
                    </li>
                    <div id="cid_2" className="form-input-wide" data-layout="full">
                        <div data-align="auto"
                             className="form-buttons-wrapper form-buttons-auto   jsTest-button-wrapperField">
                            <button id="input_2" type="submit"
                                    onClick={saveForm}
                                    className="submit-button jf-form-buttons jsTest-submitField"
                                    data-component="button" data-content="">
                                Submit
                            </button>
                        </div>
                    </div>
                </ul>
            </div>
        </form>
    )
}