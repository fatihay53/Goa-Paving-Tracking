import React, {useEffect, useState} from "react";
import MDataTable from "./dt/MDataTable";
import EstimateTemplateService from "../../services/EstimateTemplateService";

export default function SelectProject({setSelections, restriction}) {
    const estimateTemplateService = new EstimateTemplateService();
    const [employeeList, setEmployeeList] = useState([]);
    const [dtLoading, setDtLoading] = useState(true);

    const columns = [
        {field: "project_name", header: "Job Number"},
        {field: "date", header: "Job Date"}
    ]

    useEffect(() => {
        setDtLoading(true);
        estimateTemplateService.findAll().then(res => {
            if (res.status == 200) {
                setEmployeeList(res.data);
                setDtLoading(false);
            }
        });

    }, []);

    return (
        <MDataTable selectionMode="single"
                    setSelections={(selections) => setSelections(selections)}
                    columns={columns}
                    loading={dtLoading}
                    data={employeeList}/>
    )
}