import './time-card.css'
import React, {useEffect, useState} from "react";
import TimeCardService from "../../../services/TimeCardService";
import MDataTable from "../../../components/mcomponents/dt/MDataTable";
import MDialog from "../../../components/mcomponents/MDialog";
import TimeCardApprove from "./TimeCardApprove";

export default function TimeCardList() {

    const timeCardService = new TimeCardService();
    const [timeCardList,setTimeCardList] = useState([]);
    const [dtLoading, setDtLoading] = useState(true);
    const [showDialog, setShowDialog] = useState(false);
    const [showedHtml, setShowedHtml] = useState({});
    const [role, setRole] = useState({});

    const columns = [
        {field: "date", header: "Date","formatDate": "true","dateFormatNumber": "3","dateSeperator": "-"},
        {field: "start_hour", header: "Start Hour"},
        {field: "end_hour", header: "End Hour"},
        {field: "total_hour_double", header: "Total Hour"},
        {field: "time_deserve", header: "Time Deserve"},
        {field: "is_approved", header: "Is Approved", body: (row) =>  isApprovedBody(row.is_approved)},
        {field: "name", header: "Employee Name"},
        {field: "surname", header: "Employee Surname"}
    ]

    const isApprovedBody = (isApproved) => {
        if (isApproved === 0) return 'No';
        return 'Yes';
    }

    const findAll=()=>{
        setDtLoading(true);
        let user = JSON.parse(localStorage.getItem("user"));
        setRole(user.role)
        if (user.role === 'ROLE_USER'){
            let userId = user.userId;
            timeCardService.findAll({userId:userId}).then(res => {
                if (res.status == 200) {
                    setTimeCardList(res.data);
                    setDtLoading(false);
                }
            });
        }else{//admin
            timeCardService.findAll().then(res => {
                if (res.status == 200) {
                    setTimeCardList(res.data);
                    setDtLoading(false);
                }
            });
        }
    }

    useEffect(() => {
        findAll();
    }, []);

    const onEdit=(selectedRow)=>{
        setShowDialog(true);
        setShowedHtml(<TimeCardApprove updateDt={findAll} setShowDialog={setShowDialog} selectedRow={selectedRow}/>);
    }

    return (
        <div>
        <MDataTable showEditButton={true}
                    onEdit={onEdit}
                    columns={columns}
                    loading={dtLoading}
                    data={timeCardList}
                    role={role}
        />
            {showDialog && <MDialog showedHtml={showedHtml} showDialog={showDialog} setShowDialog={setShowDialog}/>}
        </div>
    )
}