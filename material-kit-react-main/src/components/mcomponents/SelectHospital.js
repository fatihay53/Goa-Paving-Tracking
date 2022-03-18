import React, {useEffect, useState} from "react";
import MDataTable from "./dt/MDataTable";
import EstimateTemplateService from "../../services/EstimateTemplateService";
import HospitalService from "../../services/HospitalService";

export default function SelectHospital({setSelections, restriction}) {
    const hospitalService = new HospitalService();
    const [hospitalList, setHospitalList] = useState([]);
    const [dtLoading, setDtLoading] = useState(true);

    const columns = [
        {field: "name", header: "Name"},
        {field: "phone", header: "Phone"},
        {field: "street", header: "Street"},
        {field: "city", header: "City"},
        {field: "zip", header: "Zip"}
    ]

    useEffect(() => {
        setDtLoading(true);
        hospitalService.findAll().then(res => {
            if (res.status == 200) {
                setHospitalList(res.data);
                setDtLoading(false);
            }
        });

    }, []);

    return (
        <MDataTable selectionMode="single"
                    setSelections={(selections) => setSelections(selections)}
                    columns={columns}
                    loading={dtLoading}
                    data={hospitalList}/>
    )
}