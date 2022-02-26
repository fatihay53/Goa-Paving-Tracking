import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import React, {useState} from "react";
import {Button} from "@mui/material";
import DateUtil from "../../../utils/DateUtil";

export default function MDataTable({selectionMode, columns, data, loading, showMultipleSelection, setSelections, showEditButton,onEdit,role}) {

    const [selectedData, setSelectedData] = useState([]);

    const renderActionBody = (row) => {
        return (
            <React.Fragment>
                {showEditButton ?
                    <Button disabled={row.is_approved} size="large" variant="contained" color="warning" onClick={()=>onEdit(row)} >
                        <i className="fa fa-pencil"></i>
                    </Button>
                    : null
                }
            </React.Fragment>
        );
    }

    let editButton = showEditButton === true && (role === 'ROLE_SUPERVISOR') ?
        <Column header='Operations' body={renderActionBody} headerStyle={{width: '8em', textAlign: 'center'}}
                bodyStyle={{textAlign: 'center', overflow: 'visible'}}></Column> : null;

    const formatDate = (rowData, formatNumber, seperator) => {
        return <span>{DateUtil.getDateFormat(rowData === null ? null : new Date(rowData), formatNumber, seperator)}</span>;
    }

    return (
        <div className="card">
            <DataTable value={data} paginator responsiveLayout="scroll" dataKey="id"
                       selectionMode={selectionMode}
                       selection={selectedData}
                       onSelectionChange={e => {
                           setSelectedData(e.value);
                           setSelections(e.value);
                       }}
                       loading={loading}
                       paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                       currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10}
                       rowsPerPageOptions={[10, 20, 50]}
            >
                {showMultipleSelection && <Column selectionMode="multiple" headerStyle={{width: '3em'}}></Column>}
                {editButton}
                {
                    columns.map((elem) => {
                        if (elem.body) {
                            return <Column field={elem.field} header={elem.header} body={elem.body}></Column>;
                        } else if (elem.formatDate) {
                            let body = (row) => formatDate(row[elem.field], elem.dateFormatNumber, elem.dateSeperator);
                            return <Column field={elem.field} header={elem.header} body={body}></Column>;
                        } else {
                            return <Column field={elem.field} header={elem.header}></Column>;
                        }

                    })
                }
            </DataTable>
        </div>
    )
}