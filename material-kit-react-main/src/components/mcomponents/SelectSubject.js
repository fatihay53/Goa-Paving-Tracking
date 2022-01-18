import React, {useEffect, useState} from "react";
import MDataTable from "./dt/MDataTable";
import {talks} from '../../pages/forms/talks/talk_list';

export default function SelectEmployee({setSelections,setShowDialog}) {

    const [dtLoading, setDtLoading] = useState(true);

    const columns = [
        {field: "header", header: "Subject"}
    ]

    useEffect(()=>{
        setDtLoading(false);
    },[])

    return (
        <MDataTable showMultipleSelection={false}
                    selectionMode="single"
                    setSelections={(selections)=> {setSelections(selections); setShowDialog(false)}}
                    columns={columns}
                    loading={dtLoading}
                    data={talks}/>
    )
}