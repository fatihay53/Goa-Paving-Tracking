import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import React, {useState} from "react";

export default function MDataTable({selectionMode,columns,data,loading,showMultipleSelection,setSelections}) {

    const [selectedData,setSelectedData] = useState([]);

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
                {showMultipleSelection&&<Column selectionMode="multiple" headerStyle={{width: '3em'}}></Column>}
                {
                    columns.map((elem) => {
                        return <Column field={elem.field} header={elem.header}></Column>
                    })
                }
            </DataTable>
        </div>
    )
}