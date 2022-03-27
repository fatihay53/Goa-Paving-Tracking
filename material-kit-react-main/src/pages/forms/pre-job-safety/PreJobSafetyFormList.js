import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import React, {useEffect, useState} from "react";
import TailGateTalkFormService from "../../../services/TailGateTalkFormService";
import PreJobSafetyForm from "./PreJobSafetyForm";
import PreJobSafetyFormService from "../../../services/PreJobSafetyFormService";

export default function PreJobSafetyFormList() {

    const preJobSafetyFormService = new PreJobSafetyFormService();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedData, setSelectedData] = useState({});
    const [showSelectedData, setShowSelectedData] = useState(false);

    useEffect(() => {
        setLoading(true);
        preJobSafetyFormService.findAll().then(res => {
            if (res.status == 200) {
                setData(res.data);
                setLoading(false);
            }
        })
    }, []);


    let dt = <div>
        <div className="card">
            <DataTable value={data} paginator responsiveLayout="scroll"
                       selectionMode="single"
                       selection={selectedData}
                       onSelectionChange={e => {
                           setSelectedData(e.value);
                           setShowSelectedData(true)
                       }}
                       loading={loading}
                       paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                       currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10}
                       rowsPerPageOptions={[10, 20, 50]}
            >
                <Column field="date" header="Date"></Column>
                <Column field="location" header="Location"></Column>
                <Column field="foremanName" header="First Name Foreman"></Column>
                <Column field="foremanSurname" header="Last Name Foreman"></Column>
            </DataTable>
        </div>

    </div>;

    let detailForm = <React.Fragment>
        <Button icon="pi pi-times" className="p-button-rounded p-button-danger"
                onClick={() => setShowSelectedData(false)}/>
        <PreJobSafetyForm isShow={true} selectedData={selectedData}/>
    </React.Fragment>;

    return showSelectedData ? detailForm : dt;
}