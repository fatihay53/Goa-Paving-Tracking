import React, {useEffect, useState} from "react";
import DateUtil from "../../../utils/DateUtil";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import {Button} from "@mui/material";
import TimeCardService from "../../../services/TimeCardService";
import JobTypeService from "../../../services/JobTypeService";
import TimeCardDetailService from "../../../services/TimeCardDetailService";
import {toast} from "react-toastify";

const JOB_TYPE = [
    {name:"Culvert Resurfacing",j:1},
    {name:"Driveway Resurfacing",j:2},
    {name:"Parking Lot Resurfacing",j:3},
    {name:"Daily Patching",j:4}
]

export default function TimeCardApprove({selectedRow,setShowDialog,updateDt}) {

    const [j1,setj1] = useState(0);
    const [j2,setj2] = useState(0);
    const [j3,setj3] = useState(0);
    const [j4,setj4] = useState(0);
    const [jobTypeList,setJobTypeList] = useState([]);
    const timeCardService = new TimeCardService();
    const timeCardDetailService = new TimeCardDetailService();
    const jobTypeService = new JobTypeService();

    useEffect(()=>{
        jobTypeService.findAll().then(res=>{
            if (res.status == 200){
                setJobTypeList(res.data);
            }
        })
    },[])

    const onChange = (e,j) =>{
        let value = e.target.value;
        if(j==1){
            setj1(value);
        }else if(j==2){
            setj2(value);
        }else if(j==3){
            setj3(value);
        }else if(j==4){
            setj4(value);
        }
    }

    const approveTimeCard=()=>{
        let approvedUserId = JSON.parse(localStorage.getItem("user")).userId;
        let detail = {
            timeCardId : selectedRow.time_card_id,
            jobDetail  : [
                {job_type_id:1,hour:j1},
                {job_type_id:2,hour:j2},
                {job_type_id:3,hour:j3},
                {job_type_id:4,hour:j4},
            ]
        }
        timeCardDetailService.save({detail:detail}).then(res=>{
            if (res.status == 200){
                timeCardService.approveTimeCard({approvedUserId:approvedUserId,timeCardId:selectedRow.time_card_id}).then(res=>{
                    if (res.status == 200){
                        setShowDialog(false);
                        updateDt();
                        toast.success("Saved successfuly.")
                    }
                });
            }
        })
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
                      value={DateUtil.getDateFormat(new Date(selectedRow.date),"3","-")}
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
                      value={selectedRow.total_hour}
                      disabled={true}
                  />

                </span>
                            </div>
                        </div>
                    </li>


                    <li className="form-line">
                        <div id="cid_19" className="form-input-wide" data-layout="full">
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
                        </div>
                        <div class="form-input-wide" style={{justifyContent:'end'}}>
                        <Button style={{float:'right'}} size="large" variant="contained" onClick={approveTimeCard}>
                            Approve
                        </Button>
                        </div>
                    </li>

                </ul>
            </div>
        </form>
    )
}