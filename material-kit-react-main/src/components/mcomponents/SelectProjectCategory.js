import React, {useEffect, useState} from "react";
import MDataTable from "./dt/MDataTable";
import ProjectCategoryService from "../../services/ProjectCategoryService";

export default function SelectProjectCategory({setSelections}) {
    const projectCategoryService = new ProjectCategoryService();
    const [projectCategoryList, setProjectCategoryList] = useState([]);
    const [dtLoading, setDtLoading] = useState(true);

    const columns = [
        {field: "name", header: "Name"}
    ]

    useEffect(() => {
        setDtLoading(true);
        projectCategoryService.findAll().then(res => {
            if (res.status == 200) {
                setProjectCategoryList(res.data);
                setDtLoading(false);
            }
        });
    }, []);

    return (
        <MDataTable showMultipleSelection={false}
                    selectionMode="single"
                    setSelections={(selections) => setSelections(selections)}
                    columns={columns}
                    loading={dtLoading}
                    data={projectCategoryList}/>
    )
}