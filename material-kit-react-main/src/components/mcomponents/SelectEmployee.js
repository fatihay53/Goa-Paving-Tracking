import EmployeeService from "../../services/EmployeeService";
import React, {useEffect, useState} from "react";
import MDataTable from "./dt/MDataTable";

export default function SelectEmployee({setSelections}) {
    const employeeService = new EmployeeService();
    const [employeeList, setEmployeeList] = useState([]);
    const [dtLoading, setDtLoading] = useState(true);

    const columns = [
        {field: "name", header: "Name"},
        {field: "surname", header: "Surname"},
        {field: "email", header: "Email"}
    ]

    useEffect(() => {
        setDtLoading(true);
        employeeService.findAll().then(res => {
            if (res.status == 200) {
                setEmployeeList(res.data);
                setDtLoading(false);
            }
        });
    }, []);

    return (
        <MDataTable showMultipleSelection={true}
                    selectionMode="multiple"
                    setSelections={(selections)=>setSelections(selections)}
                    columns={columns}
                    loading={dtLoading}
                    data={employeeList}/>
    )
}