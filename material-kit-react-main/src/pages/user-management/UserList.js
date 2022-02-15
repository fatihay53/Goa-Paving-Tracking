import React, {useEffect, useState} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "primereact/button";
import TailGateTalkForm from "../forms/tail-gate-talk/TailGateTalkForm";
import UserService from "../../services/UserService";
import CreateUser from "./CreateUser";

export default function UserList() {
    const userService = new UserService();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedData, setSelectedData] = useState({});
    const [showSelectedData, setShowSelectedData] = useState(false);

    useEffect(() => {
        findAll();
    }, []);

    const findAll = () => {
        setLoading(true);
        userService.findAll().then(res => {
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
                <Column field="username" header="Username"></Column>
                <Column field="role" header="Role"></Column>
                <Column field="email" header="email"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="surname" header="Surname"></Column>
                <Column field="hourly_cost" header="Hourly Cost"></Column>
            </DataTable>
        </div>

    </div>;

    let detailForm = <React.Fragment>
        <Button icon="pi pi-times" className="p-button-rounded p-button-danger"
                onClick={() => setShowSelectedData(false)}/>
        <CreateUser isShow={true} selectedData={selectedData} setShowSelectedData={setShowSelectedData} findAll={findAll}/>
    </React.Fragment>;

    return showSelectedData ? detailForm : dt;
}