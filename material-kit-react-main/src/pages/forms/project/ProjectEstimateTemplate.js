import React, {useState} from "react";
import './table.css'
import SubContractorTable from "./tables/SubContractorTable";

export default function ProjectEstimateTemplate() {

    const [subContractor, setSubContractor] = useState({});

    return (<form onSubmit={(event) => event.preventDefault()}>
        <div role="main">
            <ul className="form-section page-section">
                <li id="cid_1" className="form-input-wide" data-type="control_head">
                    <div className="form-header-group  header-large">
                        <div className="header-text httac htvam">
                            <h1 id="header_1" className="form-header" data-component="header">
                                GOA Paving Estimate Template
                            </h1>
                        </div>
                    </div>
                </li>
                <li
                    className="form-line form-line-column form-col-1 jf-required"
                    data-type="control_textbox"
                    id="id_16"
                >
                    <div id="cid_16" className="form-input-wide jf-required" data-layout="half">
                        <SubContractorTable/>
                    </div>
                </li>
                <li
                    className="form-line form-line-column form-col-2 jf-required"
                    data-type="control_datetime"
                    id="id_18"
                >
                    <div id="cid_18" className="form-input-wide jf-required" data-layout="half">
{/*
                        <SubContractorTable/>
*/}
                    </div>
                </li>
                <li className="form-line" data-type="control_button" id="id_2">
                    <div id="cid_2" className="form-input-wide" data-layout="full">
                        <div data-align="auto"
                             className="form-buttons-wrapper form-buttons-auto   jsTest-button-wrapperField">
                            <button id="input_2" type="submit"
                                //onClick={saveForm}
                                    className="form-submit-button submit-button jf-form-buttons jsTest-submitField"
                                    data-component="button" data-content="">
                                Submit
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </form>)
}