import './new-client-form.css';
import React, {useState} from 'react';
import LoadingScreen from 'react-loading-screen'
import logo from '../../../goa_logo.png';
import {toast} from "react-toastify";
import NewClientFormService from "../../../services/NewClientFormService";

export default function NewClientForm({selectedData,isShow}) {
    let initialState = isShow ? selectedData : {
        clientName: '',
        firstName: '',
        lastName: '',
        streetAddress: '',
        streetAddress2: '',
        city: '',
        province: '',
        postalCode: '',
        phoneNumber: '',
        email: ''
    };

    const [clientForm, setClientForm] = useState(initialState);


    const [submitted, setSubmitted] = useState(false);

    const newClientFormService = new NewClientFormService();

    function saveForm() {

        if ((clientForm.clientName === null || clientForm.clientName === ''  ) ||
            (clientForm.streetAddress === null || clientForm.streetAddress === ''  ) ||
            (clientForm.phoneNumber === null || clientForm.phoneNumber === ''  ) ||
            (clientForm.email === null || clientForm.email ===  ''  )
        ){
            return toast.warning("Please check required fields!")
        }

        setSubmitted(true);

        newClientFormService.save({...clientForm}).then(res=>{
            var millisecondsToWait = 1000;
            setTimeout(function() {
                if (res.status === 200){
                    toast.success("Saved succesfully!")
                    setSubmitted(false);
                    setClientForm({
                        clientName: '',
                        firstName: '',
                        lastName: '',
                        streetAddress: '',
                        streetAddress2: '',
                        city: '',
                        province: '',
                        postalCode: '',
                        phoneNumber: '',
                        email: ''
                    });
                }
            }, millisecondsToWait);
        });
    }

    function onChangeClientName(e) {
        setClientForm({...clientForm, clientName: e.target.value});
    }

    function onChangeFirstName(e) {
        setClientForm({...clientForm, firstName: e.target.value});
    }

    function onChangeLastName(e) {
        setClientForm({...clientForm, lastName: e.target.value});
    }

    function onChangeStreetAddress(e) {
        setClientForm({...clientForm, streetAddress: e.target.value});
    }

    function onChangeStreetAddress2(e) {
        setClientForm({...clientForm, streetAddress2: e.target.value});
    }

    function onChangeCity(e) {
        setClientForm({...clientForm, city: e.target.value});
    }

    function onChangeProvince(e) {
        setClientForm({...clientForm, province: e.target.value});
    }

    function onChangePostalCode(e) {
        setClientForm({...clientForm, postalCode: e.target.value});
    }

    function onChangePhoneNumber(e) {
        setClientForm({...clientForm, phoneNumber: e.target.value});
    }

    function onChangeEmail(e) {
        setClientForm({...clientForm, email: e.target.value});
    }

    let form = <form
        style={{backgroundColor:'#f3f3fe'}}
        className="jotform-form"
        // action="https://submit.jotform.com/submit/220104272956249/"
        // method="post"
        onSubmit={(event) => event.preventDefault()}
        name="form_220104272956249"
        id="220104272956249"
        acceptCharset="utf-8"
        autoComplete="on"
    >
        <div role="main" className="form-all">
            <ul className="form-section page-section">
                <li id="cid_1" className="form-input-wide" data-type="control_head">
                    <div className="form-header-group  header-large">
                        <div className="header-text httac htvam">
                            <h1 id="header_1" className="form-header" data-component="header">
                                Client Profile
                            </h1>
                        </div>
                    </div>
                </li>
                <li
                    className="form-line form-line-column form-col-1 jf-required"
                    data-type="control_textbox"
                    id="id_16"
                >
                    <label
                        className="form-label form-label-top form-label-auto"
                        id="label_16"
                        htmlFor="input_16"
                    >
                        Client Name
                        <span className="form-required">*</span>
                    </label>
                    <div id="cid_16" className="form-input-wide jf-required" data-layout="half">
                        <input
                            type="text"
                            id="input_16"
                            name="q16_clientName"
                            data-type="input-textbox"
                            className="form-textbox"
                            data-defaultvalue=""
                            style={{width: '310px'}}
                            size="310"
                            value={clientForm.clientName}
                            onChange={onChangeClientName}
                            data-component="textbox"
                            aria-labelledby="label_16"
                            required=""
                        />
                    </div>
                </li>
                <li className="form-line" data-type="control_fullname" id="id_19">
                    <label
                        className="form-label form-label-top form-label-auto"
                        id="label_19"
                        htmlFor="first_19"
                    >
                        {' '}
                        Client Contact Name{' '}
                    </label>
                    <div id="cid_19" className="form-input-wide" data-layout="full">
                        <div data-wrapper-react="true">
                <span
                    className="form-sub-label-container"
                    style={{verticalAlign: 'top'}}
                    data-input-type="first"
                >
                  <input
                      type="text"
                      id="first_19"
                      name="q19_clientContact19[first]"
                      className="form-textbox"
                      data-defaultvalue=""
                      autoComplete="section-input_19 given-name"
                      size="10"
                      value={clientForm.firstName}
                      onChange={onChangeFirstName}
                      data-component="first"
                      aria-labelledby="label_19 sublabel_19_first"
                  />
                  <label
                      className="form-sub-label"
                      htmlFor="first_19"
                      id="sublabel_19_first"
                      style={{minHeight: '13px'}}
                      aria-hidden="false"
                  >
                    {' '}
                      First Name{' '}
                  </label>
                </span>
                            <span
                                className="form-sub-label-container"
                                style={{verticalAlign: 'top'}}
                                data-input-type="last"
                            >
                  <input
                      type="text"
                      id="last_19"
                      name="q19_clientContact19[last]"
                      className="form-textbox"
                      data-defaultvalue=""
                      autoComplete="section-input_19 family-name"
                      size="15"
                      value={clientForm.lastName}
                      onChange={onChangeLastName}
                      data-component="last"
                      aria-labelledby="label_19 sublabel_19_last"
                  />
                  <label
                      className="form-sub-label"
                      htmlFor="last_19"
                      id="sublabel_19_last"
                      style={{minHeight: '13px'}}
                      aria-hidden="false"
                  >
                    {' '}
                      Last Name{' '}
                  </label>
                </span>
                        </div>
                    </div>
                </li>
                <li className="form-line jf-required" data-type="control_address" id="id_4">
                    <label
                        className="form-label form-label-top form-label-auto"
                        id="label_4"
                        htmlFor="input_4_addr_line1"
                    >
                        Address
                        <span className="form-required">*</span>
                    </label>
                    <div id="cid_4" className="form-input-wide jf-required" data-layout="full">
                        <div summary="" className="form-address-table jsTest-addressField">
                            <div className="form-address-line-wrapper jsTest-address-line-wrapperField">
                  <span className="form-address-line form-address-street-line jsTest-address-lineField">
                    <span className="form-sub-label-container" style={{verticalAlign: 'top'}}>
                      <input
                          type="text"
                          id="input_4_addr_line1"
                          name="q4_address4[addr_line1]"
                          className="form-textbox form-address-line"
                          data-defaultvalue=""
                          autoComplete="section-input_4 address-line1"
                          value={clientForm.streetAddress}
                          onChange={onChangeStreetAddress}
                          data-component="address_line_1"
                          aria-labelledby="label_4 sublabel_4_addr_line1"
                          required=""
                      />
                      <label
                          className="form-sub-label"
                          htmlFor="input_4_addr_line1"
                          id="sublabel_4_addr_line1"
                          style={{minHeight: '13px'}}
                          aria-hidden="false"
                      >
                        {' '}
                          Street Address{' '}
                      </label>
                    </span>
                  </span>
                            </div>
                            <div className="form-address-line-wrapper jsTest-address-line-wrapperField">
                  <span className="form-address-line form-address-street-line jsTest-address-lineField">
                    <span className="form-sub-label-container" style={{verticalAlign: 'top'}}>
                      <input
                          type="text"
                          id="input_4_addr_line2"
                          name="q4_address4[addr_line2]"
                          className="form-textbox form-address-line"
                          data-defaultvalue=""
                          autoComplete="section-input_4 address-line2"
                          value={clientForm.streetAddress2}
                          onChange={onChangeStreetAddress2}
                          data-component="address_line_2"
                          aria-labelledby="label_4 sublabel_4_addr_line2"
                      />
                      <label
                          className="form-sub-label"
                          htmlFor="input_4_addr_line2"
                          id="sublabel_4_addr_line2"
                          style={{minHeight: '13px'}}
                          aria-hidden="false"
                      >
                        {' '}
                          Street Address Line 2{' '}
                      </label>
                    </span>
                  </span>
                            </div>
                            <div className="form-address-line-wrapper jsTest-address-line-wrapperField">
                  <span className="form-address-line form-address-city-line jsTest-address-lineField ">
                    <span className="form-sub-label-container" style={{verticalAlign: 'top'}}>
                      <input
                          type="text"
                          id="input_4_city"
                          name="q4_address4[city]"
                          className="form-textbox  form-address-city"
                          data-defaultvalue=""
                          autoComplete="section-input_4 address-level2"
                          value={clientForm.city}
                          onChange={onChangeCity}
                          data-component="city"
                          aria-labelledby="label_4 sublabel_4_city"
                          required=""
                      />
                      <label
                          className="form-sub-label"
                          htmlFor="input_4_city"
                          id="sublabel_4_city"
                          style={{minHeight: '13px'}}
                          aria-hidden="false"
                      >
                        {' '}
                          City{' '}
                      </label>
                    </span>
                  </span>
                                <span className="form-address-line form-address-state-line jsTest-address-lineField ">
                    <span className="form-sub-label-container" style={{verticalAlign: 'top'}}>
                      <input
                          type="text"
                          id="input_4_state"
                          name="q4_address4[state]"
                          className="form-textbox form-address-state"
                          data-defaultvalue=""
                          autoComplete="section-input_4 address-level1"
                          value={clientForm.province}
                          onChange={onChangeProvince}
                          data-component="state"
                          aria-labelledby="label_4 sublabel_4_state"
                          required=""
                      />
                      <label
                          className="form-sub-label"
                          htmlFor="input_4_state"
                          id="sublabel_4_state"
                          style={{minHeight: '13px'}}
                          aria-hidden="false"
                      >
                        {' '}
                          State / Province{' '}
                      </label>
                    </span>
                  </span>
                            </div>
                            <div className="form-address-line-wrapper jsTest-address-line-wrapperField">
                  <span className="form-address-line form-address-zip-line jsTest-address-lineField ">
                    <span className="form-sub-label-container" style={{verticalAlign: 'top'}}>
                      <input
                          type="text"
                          id="input_4_postal"
                          name="q4_address4[postal]"
                          className="form-textbox  form-address-postal"
                          data-defaultvalue=""
                          autoComplete="section-input_4 postal-code"
                          value={clientForm.postalCode}
                          onChange={onChangePostalCode}
                          data-component="zip"
                          aria-labelledby="label_4 sublabel_4_postal"
                          required=""
                      />
                      <label
                          className="form-sub-label"
                          htmlFor="input_4_postal"
                          id="sublabel_4_postal"
                          style={{minHeight: '13px'}}
                          aria-hidden="false"
                      >
                        {' '}
                          Postal / Zip Code{' '}
                      </label>
                    </span>
                  </span>
                            </div>
                        </div>
                    </div>
                </li>
                <li className="form-line jf-required" data-type="control_phone" id="id_5">
                    <label
                        className="form-label form-label-top form-label-auto"
                        id="label_5"
                        htmlFor="input_5_full"
                    >
                        Phone Number
                        <span className="form-required">*</span>
                    </label>
                    <div id="cid_5" className="form-input-wide jf-required" data-layout="half">
              <span className="form-sub-label-container" style={{verticalAlign: 'top'}}>
                <input
                    type="tel"
                    id="input_5_full"
                    name="q5_phoneNumber5[full]"
                    data-type="mask-number"
                    className="mask-phone-number form-textbox"
                    data-defaultvalue=""
                    autoComplete="section-input_5 tel-national"
                    style={{width: '310px'}}
                    data-masked="true"
                    value={clientForm.phoneNumber}
                    onChange={onChangePhoneNumber}
                    placeholder="(000) 000-0000"
                    data-component="phone"
                    aria-labelledby="label_5"
                    required=""
                />
                <label
                    className="form-sub-label is-empty"
                    htmlFor="input_5_full"
                    id="sublabel_5_masked"
                    style={{minHeight: '13px'}}
                    aria-hidden="false"
                >
                  {' '}
                </label>
              </span>
                    </div>
                </li>
                <li className="form-line jf-required" data-type="control_email" id="id_6">
                    <label
                        className="form-label form-label-top form-label-auto"
                        id="label_6"
                        htmlFor="input_6"
                    >
                        E-mail
                        <span className="form-required">*</span>
                    </label>
                    <div id="cid_6" className="form-input-wide jf-required" data-layout="half">
              <span className="form-sub-label-container" style={{verticalAlign: 'top'}}>
                <input
                    type="email"
                    id="input_6"
                    name="q6_email6"
                    className="form-textbox validate[Email]"
                    data-defaultvalue=""
                    style={{width: '310px'}}
                    size="310"
                    value={clientForm.email}
                    onChange={onChangeEmail}
                    placeholder="ex: email@yahoo.com"
                    data-component="email"
                    aria-labelledby="label_6 sublabel_input_6"
                    required=""
                />
                <label
                    className="form-sub-label"
                    htmlFor="input_6"
                    id="sublabel_input_6"
                    style={{minHeight: '13px'}}
                    aria-hidden="false"
                >
                  {' '}
                    example@example.com{' '}
                </label>
              </span>
                    </div>
                </li>
                {!isShow&&<li className="form-line" data-type="control_button" id="id_2">
                    <div id="cid_2" className="form-input-wide" data-layout="full">
                        <div
                            data-align="left"
                            className="form-buttons-wrapper form-buttons-left   jsTest-button-wrapperField"
                        >
                            <button
                                id="input_2"
                                type="submit"
                                className="submit-button jf-form-buttons jsTest-submitField"
                                data-component="button"
                                data-content=""
                                onClick={saveForm}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </li>}
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

    return (submitted === true ? loading : form);

}
