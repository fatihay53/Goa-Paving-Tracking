import React, {useEffect, useState} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import HospitalService from "../../../../services/HospitalService";
import HospitalForm from "./HospitalForm";

export default function HospitalList() {
    const hospitalService = new HospitalService();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedData, setSelectedData] = useState({});
    const [showSelectedData, setShowSelectedData] = useState(false);

    useEffect(() => {
        findAll();
    }, []);

    const findAll = () => {
        setLoading(true);
        hospitalService.findAll().then(res => {
            if (res.status == 200) {
                setData(res.data);
                setLoading(false);
            }
        })
    }

    let dt = <div>
        <div className="card">
            <DataTable value={data} paginator responsiveLayout="scroll"
                       selectionMode="single"
                       selection={selectedData}
                       onSelectionChange={e => {
                           setSelectedData(e.value);
                           setShowSelectedData(true);
                       }}
                       loading={loading}
                       paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                       currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10}
                       rowsPerPageOptions={[10, 20, 50]}
            >
                <Column field="name" header="name"></Column>
                <Column field="phone" header="phone"></Column>
                <Column field="street" header="street"></Column>
                <Column field="city" header="city"></Column>
                <Column field="zip" header="zip"></Column>
            </DataTable>
        </div>

    </div>;

    let detailForm = <React.Fragment>
        <Button icon="pi pi-times" className="p-button-rounded p-button-danger"
                onClick={() => setShowSelectedData(false)}/>
        <HospitalForm isShow={true} selectedData={selectedData} setShowSelectedData={setShowSelectedData} findAll={findAll}/>
    </React.Fragment>;

    return showSelectedData ? detailForm : dt;
}