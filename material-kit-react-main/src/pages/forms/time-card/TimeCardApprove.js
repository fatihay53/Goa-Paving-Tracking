import React, {useEffect, useState} from "react";
import DateUtil from "../../../utils/DateUtil";
import {Button} from "@mui/material";
import TimeCardService from "../../../services/TimeCardService";
import JobTypeService from "../../../services/JobTypeService";
import TimeCardDetailService from "../../../services/TimeCardDetailService";
import {toast} from "react-toastify";
import {Checkbox} from "primereact/checkbox";
import EstimateTemplateService from "../../../services/EstimateTemplateService";
import GeneralUtils from "../../../utils/GeneralUtils";

const JOB_TYPE = [
    {name: "Culvert Resurfacing", j: 1},
    {name: "Driveway Resurfacing", j: 2},
    {name: "Parking Lot Resurfacing", j: 3},
    {name: "Daily Patching", j: 4}
]

export default function TimeCardApprove({selectedRow, setShowDialog, updateDt}) {

    const [j1, setj1] = useState(0);
    const [j2, setj2] = useState(0);
    const [j3, setj3] = useState(0);
    const [j4, setj4] = useState(0);
    const [jobTypeList, setJobTypeList] = useState([]);
    const timeCardService = new TimeCardService();
    const estimateTemplateService = new EstimateTemplateService();
    const timeCardDetailService = new TimeCardDetailService();
    const jobTypeService = new JobTypeService();
    const [employeeValues, setEmployeeValues] = useState([]);
    const [employees, setEmployees] = useState({});
    const [projectData, setProjectData] = useState([]);

    useEffect(() => {
        /*jobTypeService.findAll().then(res=>{
            if (res.status == 200){
                setJobTypeList(res.data);
            }
        })*/

        estimateTemplateService.findUserTodayHours({userId: selectedRow.user_id}).then(res => {
            if (res.status == 200) {
                if (res.data.length > 0) {
                    let dataArr = [];
                    res.data.forEach(data => {
                        let foremanData = data.employee_foreman_json;
                        let employeeData = data.employee_json;
                        let projectName = data.project_name;
                        let dataMap = new Map();
                        dataMap.set("foremanData", new Map(Object.entries(JSON.parse(foremanData))));
                        dataMap.set("employeeData", ...JSON.parse(employeeData).filter(s => s.id == selectedRow.id));
                        dataMap.set("projectName", projectName);
                        dataArr.push(dataMap);
                    })
                    setProjectData(dataArr);
                }
            }
        })
    }, [])

    const onChange = (e, j) => {
        let value = e.target.value;
        if (j == 1) {
            setj1(value);
        } else if (j == 2) {
            setj2(value);
        } else if (j == 3) {
            setj3(value);
        } else if (j == 4) {
            setj4(value);
        }
    }

    const approveTimeCard = () => {
        let approvedUserId = JSON.parse(localStorage.getItem("user")).userId;
        /*let detail = {
            timeCardId: selectedRow.time_card_id,
            jobDetail: [
                {job_type_id: 1, hour: j1},
                {job_type_id: 2, hour: j2},
                {job_type_id: 3, hour: j3},
                {job_type_id: 4, hour: j4},
            ]
        }
        timeCardDetailService.save({detail: detail}).then(res => {
            if (res.status == 200) {*/
        let totalApprovedTimeDeserve = 0;
        let totalApprovedHour = 0;
        projectData.map(pData => {
            let empDat = pData.get('employeeData');

            totalApprovedHour += parseFloat(GeneralUtils.changeDecimalSeperator(pData.get('foremanData').get('' + empDat.id).employeeHour,",","."));
            if (!GeneralUtils.isNullOrEmpty(pData.get('foremanData').get('' + empDat.id).timeDeserve)){
                totalApprovedTimeDeserve += parseFloat(GeneralUtils.changeDecimalSeperator(pData.get('foremanData').get('' + empDat.id).timeDeserve,",","."));
            }else{
                totalApprovedTimeDeserve = 0;
            }
        });

        timeCardService.approveTimeCard({
            approvedUserId: approvedUserId,
            totalApprovedHour:totalApprovedHour,
            totalApprovedTimeDeserve:totalApprovedTimeDeserve,
            timeCardId: selectedRow.time_card_id
        }).then(res => {
            if (res.status == 200) {
                setShowDialog(false);
                updateDt();
                toast.success("Saved successfuly.")
            }
            /* });
         }*/
        })
    }

    const renderProjectData = () => {
        return (
            <div>
                <table id="customers">
                    {projectData.length > 0 && <tr>
                        <th style={{textAlign: 'center', backgroundColor: 'orange'}} colSpan="8">Foreman Entering
                        </th>
                    </tr>}
                    {projectData.length > 0 ? <tr>
                        <th>Project Name</th>
                        <th>Employee Id</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Hourly Cost</th>
                        <th>Estimate Hour</th>
                        <th>Employee Hour</th>
                        <th>Time Deserve</th>
                    </tr> : <span style={{color: 'orange'}}>Foreman Entering Waiting...</span>}
                    {projectData.length > 0 &&
                    projectData.map(pData => {
                        let empDat = pData.get('employeeData');
                        let projectName = pData.get('projectName');
                        return (
                            <tr>
                                <td>{projectName}</td>
                                <td>{empDat.id}</td>
                                <td>{empDat.name}</td>
                                <td>{empDat.surname}</td>
                                <td>${empDat.hourlyCost}</td>
                                <td>{empDat.estimateProjectHour}</td>
                                <td>{pData.get('foremanData').get('' + empDat.id) ? pData.get('foremanData').get('' + empDat.id).employeeHour : 0}</td>
                                <td>{pData.get('foremanData').get('' + empDat.id) ? pData.get('foremanData').get('' + empDat.id).timeDeserve : 0}</td>
                            </tr>
                        )
                    })}
                </table>
            </div>
        )
    }

    return (
        <form
            onSubmit={(event) => event.preventDefault()}
        >
            <div role="main">
                <ul>
                    <li className="form-line">
                        <label
                            className="form-label form-label-top form-label-auto"
                            id="label_19"
                            htmlFor="first_19"
                        >
                            {' '}
                            Employee Time Card{' '}
                        </label>
                        <div id="cid_19" className="form-input-wide" data-layout="full">
                            <div data-wrapper-react="true">
                <span
                    className="form-sub-label-container"
                    style={{verticalAlign: 'top'}}
                    data-input-type="first"
                >
                    <label
                        className="form-sub-label"
                        style={{minHeight: '13px'}}
                        aria-hidden="false"
                    >
                    {' '}
                        Employee Name{' '}
                  </label>
                  <input
                      type="text"
                      className="form-textbox"
                      data-defaultvalue=""
                      size="10"
                      value={selectedRow.name}
                      disabled={true}
                  />
                </span>
                                <span
                                    className="form-sub-label-container"
                                    style={{verticalAlign: 'top'}}
                                    data-input-type="last"
                                >
                                    <label
                                        className="form-sub-label"
                                        style={{minHeight: '13px'}}
                                        aria-hidden="false"
                                    >
                    {' '}
                                        Employee  Last Name{' '}
                  </label>
                  <input
                      type="text"
                      className="form-textbox"
                      size="15"
                      value={selectedRow.surname}
                      disabled={true}
                  />

                </span>
                            </div>
                        </div>
                    </li>

                    <li className="form-line">
                        <div id="cid_19" className="form-input-wide" data-layout="full">
                            <div data-wrapper-react="true">
                <span
                    className="form-sub-label-container"
                    style={{verticalAlign: 'top'}}
                    data-input-type="first"
                >
                    <label
                        className="form-sub-label"
                        style={{minHeight: '13px'}}
                        aria-hidden="false"
                    >
                    {' '}
                        Date{' '}
                  </label>
                  <input
                      type="text"
                      className="form-textbox"
                      data-defaultvalue=""
                      size="10"
                      value={DateUtil.getDateFormat(new Date(selectedRow.date), "3", "-")}
                      disabled={true}
                  />
                </span>
                                <span
                                    className="form-sub-label-container"
                                    style={{verticalAlign: 'top'}}
                                    data-input-type="last"
                                >
                                    <label
                                        className="form-sub-label"
                                        style={{minHeight: '13px'}}
                                        aria-hidden="false"
                                    >
                    {' '}
                                        Total Hours Entered{' '}
                  </label>
                  <input
                      type="text"
                      className="form-textbox"
                      size="15"
                      value={GeneralUtils.changeDecimalSeperator('' + selectedRow.total_hour_double, ".", ",")}
                      disabled={true}
                  />

                </span>
                            </div>
                        </div>
                    </li>

                    <li className="form-input-wide jf-required form-line" data-type="control_signature">
                        <div className="p-field-checkbox">
                            <Checkbox inputId="binary" disabled={true}
                                      checked={selectedRow.board_allowance == 1 ? true : false}/>
                            <label htmlFor="binary">Board Allowance</label>
                        </div>
                    </li>
                    <li className="form-input-wide jf-required form-line">
                        {renderProjectData()}
                    </li>
                    <li className="form-line">
                        {/*<div id="cid_19" className="form-input-wide" data-layout="full">
                            <div data-wrapper-react="true">
                                <TableContainer>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Job Type</TableCell>
                                                <TableCell align="right">Hour</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {jobTypeList.length > 0 && jobTypeList.map((row) => (
                                                <TableRow
                                                    key={row.name}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell align="right"><input type="number" id={row.id} onChange={(e)=> onChange(e,row.id)}
                                                                                    className="form-textbox"/></TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </div>*/}
                        <div class="form-input-wide" style={{justifyContent: 'end'}}>
                            <Button disabled={projectData.length > 0 ? false : true} style={{float: 'right'}}
                                    size="large" variant="contained" onClick={approveTimeCard}>
                                Approve
                            </Button>
                        </div>
                    </li>

                </ul>
            </div>
        </form>
    )
}