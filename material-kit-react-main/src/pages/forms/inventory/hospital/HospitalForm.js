import React from "react";

export default function HospitalForm() {
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
                            <input type="text" id="input_4_full" name="q4_phoneNumber[full]"
                                   className="form-textbox validate[required, Fill Mask]"
                                   style={{width: '310px'}} value="" aria-labelledby="label_4 sublabel_4_masked"/>
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
                                   style={{width: '310px'}} value="" aria-labelledby="label_4 sublabel_4_masked"/>
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
                     disabled={true}
                     data-defaultvalue="" autoComplete="section-input_3 given-name" size="10"
                     value=""
                     data-component="first" aria-labelledby="label_3 sublabel_3_first" required=""/>
              <label className="form-sub-label" htmlFor="first_3" id="sublabel_3_first" style={{minHeight: '13px'}}
                     aria-hidden="false"> Street Address </label>
            </span>
                                <span className="form-sub-label-container" style={{verticalAlign: 'top'}}
                                      data-input-type="last">
              <input type="text" id="last_3" name="q3_name[last]" className="form-textbox validate[required]"
                     disabled={true}
                     data-defaultvalue="" autoComplete="section-input_3 family-name" size="15"
                     value=""
                     data-component="last" aria-labelledby="label_3 sublabel_3_last" required=""/>
              <label className="form-sub-label" htmlFor="last_3" id="sublabel_3_last" style={{minHeight: '13px'}}
                     aria-hidden="false"> City </label>
            </span>
                                <span className="form-sub-label-container" style={{verticalAlign: 'top'}}
                                      data-input-type="last">
              <input type="text" id="last_11" name="q11_name[last]" className="form-textbox validate[required]"
                     disabled={true}
                     data-defaultvalue="" autoComplete="section-input_3 family-name" size="15"
                     value=""
                     data-component="last" aria-labelledby="label_3 sublabel_3_last" required=""/>
              <label className="form-sub-label" htmlFor="last_3" id="sublabel_3_last" style={{minHeight: '13px'}}
                     aria-hidden="false"> Zip </label>
            </span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </form>
    )
}