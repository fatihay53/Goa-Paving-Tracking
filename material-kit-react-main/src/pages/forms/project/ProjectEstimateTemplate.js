import React, {useState} from "react";
import './table.css'
import SubContractorTable from "./tables/SubContractorTable";
import EmployeeTable from "./tables/EmployeeTable";
import MaterialsTable from "./tables/MaterialsTable";
import ExternalRentTable from "./tables/ExternalRentTable";
import ColdMillingTable from "./tables/ColdMillingTable";
import {TextField} from "@mui/material";
import {Button} from "primereact/button";
import SelectProjectCategory from "../../../components/mcomponents/SelectProjectCategory";
import MDialog from "../../../components/mcomponents/MDialog";
import InternalRentCar from "./tables/InternalRentCar";
import TrafficControlTable from "./tables/TrafficControlTable";
import TotalEquipmentCost from "./tables/TotalEquipmentCost";
import ResultTable from "./tables/ResultTable";
import EstimateTemplateService from "../../../services/EstimateTemplateService";
import GeneralUtils from "../../../utils/GeneralUtils";
import {toast} from "react-toastify";
import EmployeeTableForeman from "./tables/EmployeeTableForeman";
import {Calendar} from "primereact/calendar";
import moment from "moment";

export default function ProjectEstimateTemplate({selectedData, updateDt}) {

    const [bid, setBid] = useState(selectedData ? selectedData.bid : null);
    const [date, setDate] = useState(new Date())
    const [materialsTotal, setMaterialsTotal] = useState({});
    const [subContractorTotal, setSubContractorTotal] = useState(0);
    const [employeeTotal, setEmployeeTotal] = useState(0);
    const [externalRentTotal, setExternalCostTotal] = useState(0);
    const [internalRentTotal, setInternalRentTotal] = useState(0);
    const [equipmentCostTotal, setEquipmentCostTotal] = useState(0);
    const [coldMillingTotal, setColdMillingTotal] = useState(0);
    const [trafficControlTotal, setTrafficControlTotal] = useState(0);

    const [materials, setMaterialsValue] = useState({});
    const [subContractor, setSubContractorValue] = useState({});
    const [employee, setEmployeeValue] = useState({});
    const [externalRent, setExternalRentValue] = useState({});
    const [internalRent, setInternalRentValue] = useState({});
    const [equipmentCost, setEquipmentCostValue] = useState({});
    const [coldMilling, setColdMillingValue] = useState({});
    const [trafficControl, setTrafficControlValue] = useState({});
    const [profit, setProfit] = useState(0);

    const [showDialog, setShowDialog] = useState(false);
    const [showedHtml, setShowedHtml] = useState({});
    const estimateTemplateService = new EstimateTemplateService();

    const getInitialData = () => {
        let data;
        if (!GeneralUtils.isNullOrEmpty(selectedData)) {
            data = {
                id: selectedData.id,
                projectName: selectedData.project_name,
                category: selectedData.project_category_name,
                categoryId: selectedData.project_category_id,
                estimateProjectHour: selectedData.estimate_project_hour,
                totalM2: selectedData.total_m2
            }
        } else {
            data = {projectName: '', category: '', categoryId: '', estimateProjectHour: '', totalM2: 0}
        }
        return data;
    }

    const [project, setProject] = useState(getInitialData());

    const selectProjectCategory = () => {
        setShowDialog(true);
        setShowedHtml(<SelectProjectCategory
            setSelections={(selections) => setProject({
                ...project,
                category: selections.name,
                categoryId: selections.id
            })}/>);
    }

    const saveForm = async () => {
        if (GeneralUtils.isNullOrEmpty(project.projectName)) {
            return toast.warning("Please enter project name.")
        }
        let isProjectNameUsing = false;
        if (GeneralUtils.isNullOrEmpty(project.id)) {//yeni kayıtta proje ismine bak
            await estimateTemplateService.findByProjectName({projectName: project.projectName}).then(res => {
                if (res.status == 200) {
                    if (res.data.length > 0) {
                        isProjectNameUsing = true;
                        return toast.warning("Project name has already use,please enter new project name.")
                    }
                }
            });
        }

        if (isProjectNameUsing) {
            return;
        }

        if (GeneralUtils.isNullOrEmpty(project.category)) {
            return toast.warning("Please enter category name.")
        }
        if (GeneralUtils.isNullOrEmpty(project.estimateProjectHour)) {
            return toast.warning("Please enter estimate project hour.")
        }
        if (GeneralUtils.isNullOrEmpty(project.totalM2)) {
            return toast.warning("Please enter total M2.")
        }
        if (GeneralUtils.isNullOrEmpty(bid)) {
            return toast.warning("Please enter bid value.")
        }
        let profitDecimal = parseFloat('' + GeneralUtils.changeDecimalSeperator(profit, ',', '.')).toFixed(2);
        let request = {
            ...project,
            bid,
            subContractor,
            employee,
            materials,
            externalRent,
            internalRent,
            equipmentCost,
            coldMilling,
            trafficControl,
            profit: profitDecimal,
            date:moment(new Date(date)).format(GeneralUtils.DATE_FORMAT_MOMENT)
        }
        if (GeneralUtils.isNullOrEmpty(project.id)) {
            estimateTemplateService.save(request).then(res => {
                if (res.status == 200) {
                    setProject({projectName: '', category: '', categoryId: '', estimateProjectHour: '', totalM2: 0});
                    setMaterialsTotal({});
                    setSubContractorTotal(0);
                    setEmployeeTotal(0);
                    setExternalCostTotal(0);
                    setInternalRentTotal(0);
                    setEquipmentCostTotal(0);
                    setColdMillingTotal(0);
                    setTrafficControlTotal(0);

                    setMaterialsValue({});
                    setSubContractorValue({});
                    setEmployeeValue({});
                    setExternalRentValue({});
                    setInternalRentValue({});
                    setEquipmentCostValue({});
                    setColdMillingValue({});
                    setTrafficControlValue({});
                    toast.success("Operation success.");
                }
            })
        } else {
            estimateTemplateService.update(request).then(res => {
                if (res.status == 200) {
                    updateDt();
                }
            })
        }
    }
    return (<form onSubmit={(event) => event.preventDefault()}>
        <div role="main">
            <ul className="form-section page-section">
                <li className="form-input-wide">
                    <div className="form-header-group  header-large">
                        <div className="header-text httac htvam">
                            <h1 id="header_1" className="form-header" data-component="header">
                                GOA Paving Estimate Template
                            </h1>
                        </div>
                    </div>
                </li>
                <li className="form-line">
                    <div className="form-input-wide" data-layout="half">
                        <TextField
                            fullWidth
                            style={{backgroundColor: 'white'}}
                            label="Project Name"
                            onChange={(e) => setProject({...project, projectName: e.target.value})}
                            value={project.projectName}
                        />
                    </div>
                    <div style={{position:'relative'}} className="form-input-wide" data-layout="half">
                        <TextField
                            fullWidth
                            disabled={true}
                            style={{backgroundColor: 'white'}}
                            label="Select Project Category"
                            value={project.category}
                        />
                        <Button style={{position:'absolute'}} onClick={selectProjectCategory} icon="pi pi-search"
                                className="p-button-sm p-button-rounded p-button-text"/>
                    </div>
                </li>
                <li className="form-line">
                    <div className="form-input-wide" data-layout="half">
                        <TextField
                            fullWidth
                            style={{backgroundColor: 'white'}}
                            type="number"
                            label="Estimate Project Hour"
                            onChange={(e) => setProject({...project, estimateProjectHour: e.target.value})}
                            value={project.estimateProjectHour}
                        />
                    </div>
                    <div className="form-input-wide" data-layout="half">
                        <div className="p-fluid grid formgrid">
                            <Calendar id="icon" value={date} onChange={(e) => setDate(e.value)}
                                  dateFormat={GeneralUtils.DATE_FORMAT_CALENDAR}
                                  showIcon/>
                        </div>
                    </div>
                </li>

                <li
                    className="form-line"
                >
                    <div className="form-input-wide" data-layout="half">
                        <label>Tonne/Hr</label>
                        <TextField
                            fullWidth
                            disabled={true}
                            style={{backgroundColor: 'white'}}
                            value={GeneralUtils.numberFormatter((materialsTotal.rateTotal / project.estimateProjectHour).toFixed(2))}
                        />
                    </div>
                    <div className="form-input-wide" data-layout="half">
                        <label>Total M2</label>
                        <TextField
                            fullWidth
                            style={{backgroundColor: 'white'}}
                            onChange={(e) => setProject({...project, totalM2: e.target.value})}
                            value={project.totalM2}
                        />
                    </div>
                </li>
                <li className="form-line">
                    <div className="form-input-wide" data-layout="half">
                        <SubContractorTable selectedData={selectedData}
                                            setSubContractorValue={setSubContractorValue}
                                            setSubContractorTotal={setSubContractorTotal}/>
                    </div>
                    <div id="cid_18" className="form-input-wide jf-required" data-layout="half">
                        <EmployeeTable selectedData={selectedData}
                                       estimateProjectHour={project.estimateProjectHour}
                                       setEmployeeValue={setEmployeeValue}
                                       setEmployeeTotal={setEmployeeTotal}/>
                    </div>
                </li>
                {selectedData?.employee_foreman_json && <li
                    className="form-line form-line-column form-col-2 jf-required"
                    data-type="control_datetime"
                    id="id_18"
                >
                    <div id="cid_18" className="form-input-wide jf-required" data-layout="half">

                    </div>
                </li>}
                {selectedData?.employee_foreman_json && <li
                    className="form-line form-line-column form-col-2 jf-required"
                    data-type="control_datetime"
                    id="id_18"
                >
                    <div id="cid_18" className="form-input-wide jf-required" data-layout="half">
                        <EmployeeTableForeman selectedData={selectedData}/>
                    </div>
                </li>}
                <li
                    className="form-line form-line-column form-col-1 jf-required"
                    data-type="control_textbox"
                    id="id_16"
                >
                    <div id="cid_16" className="form-input-wide jf-required" data-layout="half">
                        <MaterialsTable selectedData={selectedData}
                                        setMaterialsTotal={setMaterialsTotal}
                                        setMaterialsValue={setMaterialsValue}
                        />
                    </div>
                </li>
                <li
                    className="form-line form-line-column form-col-1 jf-required"
                    data-type="control_textbox"
                    id="id_16"
                >
                    <div id="cid_16" className="form-input-wide jf-required" data-layout="half">
                        <ExternalRentTable selectedData={selectedData}
                                           setExternalCostTotal={setExternalCostTotal}
                                           setExternalRentValue={setExternalRentValue}
                        />
                    </div>
                </li>
                <li
                    className="form-line form-line-column form-col-1 jf-required"
                    data-type="control_textbox"
                    id="id_16"
                >
                    <div id="cid_16" className="form-input-wide jf-required" data-layout="half">
                        <InternalRentCar selectedData={selectedData}
                                         estimateProjectHour={project.estimateProjectHour}
                                         setInternalRentValue={setInternalRentValue}
                                         setInternalRentTotal={setInternalRentTotal}/>
                    </div>
                </li>
                <li
                    className="form-line form-line-column form-col-1 jf-required"
                    data-type="control_textbox"
                    id="id_16"
                >
                    <div id="cid_16" className="form-input-wide jf-required" data-layout="half">
                        <TotalEquipmentCost selectedData={selectedData}
                                            estimateProjectHour={project.estimateProjectHour}
                                            setEquipmentCostValue={setEquipmentCostValue}
                                            setEquipmentCostTotal={setEquipmentCostTotal}/>
                    </div>
                </li>
                <li
                    className="form-line form-line-column form-col-1 jf-required"
                    data-type="control_textbox"
                    id="id_16"
                >
                    <div id="cid_16" className="form-input-wide jf-required" data-layout="half">
                        <ColdMillingTable selectedData={selectedData}
                                          setColdMillingTotal={setColdMillingTotal}
                                          setColdMillingValue={setColdMillingValue}
                        />
                    </div>
                </li>
                <li
                    className="form-line form-line-column form-col-1 jf-required"
                    data-type="control_textbox"
                    id="id_16"
                >
                    <div id="cid_16" className="form-input-wide jf-required" data-layout="half">
                        <TrafficControlTable selectedData={selectedData}
                                             setTrafficControlTotal={setTrafficControlTotal}
                                             setTrafficControlValue={setTrafficControlValue}
                        />
                    </div>
                </li>
                <li className="form-line" data-type="control_divider" id="id_25">
                    <div id="cid_25" className="form-input-wide" data-layout="full" style={{textAlign: 'center'}}>
                        <div className="divider" aria-label="Divider" data-component="divider"
                             style={{
                                 borderBottomWidth: '1px',
                                 borderBottomStyle: 'solid',
                                 borderColor: '#ecedf3',
                                 height: '1px',
                                 marginLeft: '0px',
                                 marginRight: '0px',
                                 marginTop: '5px',
                                 marginBottom: '5px'
                             }}>
                            <span style={{fontSize: '2em', fontWeight: 'bold'}}>Result</span>
                        </div>
                    </div>
                </li>
                <li
                    className="form-line form-line-column form-col-1 jf-required"
                    data-type="control_textbox"
                >
                    <div id="cid_16" className="form-input-wide jf-required" data-layout="half">
                        <ResultTable
                            subContractorTotal={subContractorTotal}
                            employeeTotal={employeeTotal}
                            materialsTotal={materialsTotal}
                            externalRentTotal={externalRentTotal}
                            internalRentTotal={internalRentTotal}
                            equipmentCostTotal={equipmentCostTotal}
                            coldMillingTotal={coldMillingTotal}
                            trafficControlTotal={trafficControlTotal}
                            totalM2={project.totalM2}
                            setBidValue={setBid}
                            bidValue={bid}
                            setProfit={setProfit}
                        />
                    </div>
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
            </ul>
            {showDialog && <MDialog showedHtml={showedHtml} showDialog={showDialog} setShowDialog={setShowDialog}/>}
        </div>
    </form>)
}