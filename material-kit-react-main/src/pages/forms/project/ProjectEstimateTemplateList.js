import React, {useEffect, useState} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Button} from "@mui/material";
import EstimateTemplateService from "../../../services/EstimateTemplateService";
import {Dialog} from "primereact/dialog";
import ProjectEstimateTemplate from "./ProjectEstimateTemplate";
import {toast} from "react-toastify";
import EmployeeTableForeman from "./tables/EmployeeTableForeman";

export default function ProjectEstimateTemplateList() {
    const estimateTemplateService = new EstimateTemplateService();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const [showDialogForeman, setShowDialogForeman] = useState(false);
    const [selectedData, setSelectedData] = useState({});

    useEffect(() => {
        findAll();
    }, []);

    const updateDt=()=>{
        findAll();
        toast.success("Operation success.");
    }

    const findAll=()=>{
        setLoading(true);
        estimateTemplateService.findAll().then(res => {
            if (res.status == 200) {
                setData(res.data);
                setLoading(false);
                setShowDialog(false);
                setShowDialogForeman(false);
            }
        }).catch(err => toast.error("Error : ProjectEstimateTemplateList -> findAll()"))
    }

    const onEdit=(row)=>{
        let role = localStorage.getItem('role');
        if (role === 'ROLE_SUPERVISOR'){
            setShowDialog(true);
        }else  if (role === 'ROLE_FOREMAN'){
            setShowDialogForeman(true);
        }
        setSelectedData(row);
    }

    const renderActionBody = (row) => {
        return (
            <React.Fragment>
                    <Button size="large" variant="contained" color="warning" onClick={()=>onEdit(row)} >
                        <i className="fa fa-pencil"></i>
                    </Button>
            </React.Fragment>
        );
    }

    const renderDialog=()=>{
        return (
            <div className="dialog-demo">
                <div className="card">
                    <Dialog visible={showDialog} onHide={() => setShowDialog(false)}
                            maximizable={true} baseZIndex={1500}
                    >
                        <ProjectEstimateTemplate selectedData={selectedData} updateDt={updateDt}/>
                    </Dialog>
                </div>
            </div>
        )
    }

    const renderForemanDialog=()=>{
        return (
            <div className="dialog-demo">
                <div className="card">
                    <Dialog visible={showDialogForeman} onHide={() => setShowDialogForeman(false)}
                            breakpoints={{'960px': '75vw', '640px': '100vw'}} style={{width: '50vw'}} maximizable={true} baseZIndex={1501}
                    >
                        <EmployeeTableForeman selectedData={selectedData} updateDt={updateDt}/>
                    </Dialog>
                </div>
            </div>
        )
    }

    let dt = <div>
        <div className="card">
            <DataTable value={data} paginator responsiveLayout="scroll"
                       selection={selectedData}
                       loading={loading}
                       paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                       currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10}
                       rowsPerPageOptions={[10, 20, 50]}
            >
                <Column header='Operations' body={renderActionBody} headerStyle={{width: '8em', textAlign: 'center'}}
                        bodyStyle={{textAlign: 'center', overflow: 'visible'}}></Column>

                <Column field="project_name" header="Project Name"></Column>
                <Column field="project_category_name" header="Category Name"></Column>
                <Column field="estimate_project_hour" header="Estimate Project Hour"></Column>
            </DataTable>
            {renderDialog()}
            {renderForemanDialog()}
        </div>

    </div>;


    return  dt;
}