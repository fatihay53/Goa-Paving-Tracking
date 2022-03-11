import EmployeeService from "../../services/EmployeeService";
import React, {useEffect, useState} from "react";
import MDataTable from "./dt/MDataTable";
import GeneralUtils from "../../utils/GeneralUtils";

export default function SelectEmployee({setSelections,restriction,selectionMode}) {
    const employeeService = new EmployeeService();
    const [employeeList, setEmployeeList] = useState([]);
    const [dtLoading, setDtLoading] = useState(true);

    const columns = [
        {field: "name", header: "Name"},
        {field: "surname", header: "Surname"},
        {field: "email", header: "Email"},
        {field: "employee_type", header: "Employee Type"},
        {field: "hourly_cost", header: "Hourly Cost"},
    ]

    useEffect(() => {
        setDtLoading(true);
        if (restriction === 'findAllEmployees'){
            employeeService.findAllEmployees().then(res => {
                if (res.status == 200) {
                    setEmployeeList(res.data);
                    setDtLoading(false);
                }
            });
        }if (restriction === 'findAllSupervisors'){
            employeeService.findAllSupervisors().then(res => {
                if (res.status == 200) {
                    setEmployeeList(res.data);
                    setDtLoading(false);
                }
            });
        }else{
            employeeService.findAll().then(res => {
                if (res.status == 200) {
                    setEmployeeList(res.data);
                    setDtLoading(false);
                }
            });
        }
    }, []);

    return (
        <MDataTable showMultipleSelection={ !GeneralUtils.isNullOrEmpty(selectionMode) ? false : true}
                    selectionMode={!GeneralUtils.isNullOrEmpty(selectionMode) ? selectionMode :"multiple" }
                    setSelections={(selections)=>setSelections(selections)}
                    columns={columns}
                    loading={dtLoading}
                    data={employeeList}/>
    )
}