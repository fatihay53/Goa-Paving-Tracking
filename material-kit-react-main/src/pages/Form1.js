import { useState } from 'react';

export default function Form1() {
  const [address, setAddress] = useState('');
  const [signature, setSignature] = useState('');

  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  return (
    <form
      className="jotform-form"
      name="form_220064214373041"
      id="220064214373041"
      acceptCharset="utf-8"
      autoComplete="on"
    >
      <input type="hidden" name="formID" value="220064214373041" />
      <input type="hidden" id="JWTContainer" value="" />
      <input type="hidden" id="cardinalOrderNumber" value="" />
      <div role="main" className="form-all">
        <ul className="form-section page-section">
          <li id="cid_1" className="form-input-wide" data-type="control_head">
            <div className="form-header-group  header-large">
              <div className="header-text httal htvam">
                <h1 id="header_1" className="form-header" data-component="header">
                  Form
                </h1>
              </div>
            </div>
          </li>
          <li className="form-line" data-type="control_address" id="id_4">
            <label
              className="form-label form-label-top form-label-auto"
              id="label_4"
              htmlFor="input_4_addr_line1"
            >
              {' '}
              Address{' '}
            </label>
            <div id="cid_4" className="form-input-wide" data-layout="full">
              <div summary="" className="form-address-table jsTest-addressField">
                <div className="form-address-line-wrapper jsTest-address-line-wrapperField">
                  <span className="form-address-line form-address-street-line jsTest-address-lineField">
                    <span className="form-sub-label-container" style={{ verticalAlign: 'top' }}>
                      <input
                        type="text"
                        id="input_4_addr_line1"
                        name="q4_address[addr_line1]"
                        className="form-textbox form-address-line"
                        data-defaultvalue=""
                        autoComplete="section-input_4 address-line1"
                        value={address}
                        onChange={onChangeAddress}
                        data-component="address_line_1"
                        aria-labelledby="label_4 sublabel_4_addr_line1"
                        required=""
                      />
                      <label
                        className="form-sub-label"
                        htmlFor="input_4_addr_line1"
                        id="sublabel_4_addr_line1"
                        style={{ minHeight: '13px' }}
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
                    <span className="form-sub-label-container" style={{ verticalAlign: 'top' }}>
                      <input
                        type="text"
                        id="input_4_addr_line2"
                        name="q4_address[addr_line2]"
                        className="form-textbox form-address-line"
                        data-defaultvalue=""
                        autoComplete="section-input_4 address-line2"
                        value=""
                        data-component="address_line_2"
                        aria-labelledby="label_4 sublabel_4_addr_line2"
                      />
                      <label
                        className="form-sub-label"
                        htmlFor="input_4_addr_line2"
                        id="sublabel_4_addr_line2"
                        style={{ minHeight: '13px' }}
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
                    <span className="form-sub-label-container" style={{ verticalAlign: 'top' }}>
                      <input
                        type="text"
                        id="input_4_city"
                        name="q4_address[city]"
                        className="form-textbox form-address-city"
                        data-defaultvalue=""
                        autoComplete="section-input_4 address-level2"
                        value=""
                        data-component="city"
                        aria-labelledby="label_4 sublabel_4_city"
                        required=""
                      />
                      <label
                        className="form-sub-label"
                        htmlFor="input_4_city"
                        id="sublabel_4_city"
                        style={{ minHeight: '13px' }}
                        aria-hidden="false"
                      >
                        {' '}
                        City{' '}
                      </label>
                    </span>
                  </span>
                  <span className="form-address-line form-address-state-line jsTest-address-lineField ">
                    <span className="form-sub-label-container" style={{ verticalAlign: 'top' }}>
                      <input
                        type="text"
                        id="input_4_state"
                        name="q4_address[state]"
                        className="form-textbox form-address-state"
                        data-defaultvalue=""
                        autoComplete="section-input_4 address-level1"
                        value=""
                        data-component="state"
                        aria-labelledby="label_4 sublabel_4_state"
                        required=""
                      />
                      <label
                        className="form-sub-label"
                        htmlFor="input_4_state"
                        id="sublabel_4_state"
                        style={{ minHeight: '13px' }}
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
                    <span className="form-sub-label-container" style={{ verticalAlign: 'top' }}>
                      <input
                        type="text"
                        id="input_4_postal"
                        name="q4_address[postal]"
                        className="form-textbox form-address-postal"
                        data-defaultvalue=""
                        autoComplete="section-input_4 postal-code"
                        value=""
                        data-component="zip"
                        aria-labelledby="label_4 sublabel_4_postal"
                        required=""
                      />
                      <label
                        className="form-sub-label"
                        htmlFor="input_4_postal"
                        id="sublabel_4_postal"
                        style={{ minHeight: '13px' }}
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
          <li className="form-line" data-type="control_signature" id="id_5">
            <label
              className="form-label form-label-top form-label-auto"
              id="label_5"
              htmlFor="input_5"
            >
              {' '}
              Signature{' '}
            </label>
            <div id="cid_5" className="form-input-wide" data-layout="half">
              <div data-wrapper-react="true">
                <div
                  id="signature_pad_5"
                  className="signature-pad-wrapper"
                  style={{ width: '312px', height: '116px' }}
                >
                  <div data-wrapper-react="true" />
                  <div
                    className="signature-line signature-wrapper signature-placeholder"
                    data-component="signature"
                    style={{ width: '312px', height: '116px' }}
                  >
                    <div
                      id="sig_pad_5"
                      data-width="310"
                      data-height="114"
                      data-id="5"
                      data-required="false"
                      className="pad "
                      aria-labelledby="label_5"
                    />
                    <input type="hidden" name="q5_signature" className="output4" id="input_5" />
                  </div>
                  <span className="clear-pad-btn clear-pad" role="button" tabIndex="0">
                    Clear
                  </span>
                </div>
                <div data-wrapper-react="true">
                  <script type="text/javascript">{(window.signatureForm = true)}</script>
                </div>
              </div>
            </div>
          </li>
          <li className="form-line" data-type="control_button" id="id_2">
            <div id="cid_2" className="form-input-wide" data-layout="full">
              <div
                data-align="auto"
                className="form-buttons-wrapper form-buttons-auto   jsTest-button-wrapperField"
              >
                <button
                  id="input_2"
                  className="form-submit-button submit-button jf-form-buttons jsTest-submitField"
                  onClick={() => {
                    alert(document.getElementById('input_5').value);
                  }}
                  data-component="button"
                  data-content=""
                >
                  Submit
                </button>
              </div>
            </div>
          </li>
          <li style={{ display: 'none' }}>
            Should be Empty:
            <input type="text" name="website" value="" />
          </li>
        </ul>
      </div>
      <input
        type="hidden"
        className="simple_spc"
        id="simple_spc"
        name="simple_spc"
        value="220064214373041"
      />
      <div className="formFooter-heightMask" />
    </form>
  );
}
