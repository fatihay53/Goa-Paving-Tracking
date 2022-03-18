import React, {useEffect, useState} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import EmergencyForm from "./EmergencyForm";
import EmergencyService from "../../../services/EmergencyService";
import DateUtil from "../../../utils/DateUtil";

export default function EmergencyFormList(){
    const emergencyFormService = new EmergencyService();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedData, setSelectedData] = useState({});
    const [showSelectedData, setShowSelectedData] = useState(false);

    useEffect(() => {
        findAll();
    }, []);

    const findAll=()=>{
        setLoading(true);
        emergencyFormService.findAll().then(res => {
            if (res.status == 200) {
                setData(res.data);
                setLoading(false);
            }
        })
    }

    const formatDate = (rowData, formatNumber, seperator) => {
        return <span>{DateUtil.getDateFormat(rowData === null ? null : new Date(rowData), formatNumber, seperator)}</span>;
    }

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
                <Column field="date" header="Date" body = {(row) => formatDate(row['date'], '3', '-')}></Column>
                <Column field="supervisorName" header="Supervisor Name"></Column>
                <Column field="supervisorSurname" header="Supervisor Surname"></Column>
                <Column field="hour" header="Hour"></Column>
                <Column field="amPm" header="amPm"></Column>
                <Column field="hospitalName" header="Hospital Name"></Column>
            </DataTable>
        </div>

    </div>;

    let detailForm = <React.Fragment>
        <Button icon="pi pi-times" className="p-button-rounded p-button-danger"
                onClick={() =>  {setShowSelectedData(false); }}/>
        <EmergencyForm isShow={true} selectedData={selectedData} findAll={findAll} setShowSelectedData={(val) => setShowSelectedData(val)}/>
    </React.Fragment>;

    return showSelectedData ? detailForm : dt;
}