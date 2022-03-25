import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import GeneralUtils from "../../../../utils/GeneralUtils";

export default function InternalRentCar({selectedData,estimateProjectHour,setInternalRentTotal,setInternalRentValue}) {

    const [totalAmount,setTotalAmount] = useState(0);

    const getInitialData=()=>{
        let data ;
        if (!GeneralUtils.isNullOrEmpty(selectedData)){
            data = {...JSON.parse(selectedData.internal_rent_json)}
        }else{
            data = {internalRentValue:0}
        }
        return data;
    }

    const [internalRent,setInternalRent] = useState(getInitialData());

    useEffect(()=>{
        let total = internalRent.internalRentValue*estimateProjectHour;
        setTotalAmount(total);
        setInternalRentTotal(total);
        setInternalRentValue({internalRentValue:internalRent.internalRentValue})
    },[internalRent])

    const onChange=(e)=>{
        if (estimateProjectHour === null || estimateProjectHour === undefined || estimateProjectHour === '') {
            return toast.warning("Please enter estimate project hour.")
        }
        setInternalRent({internalRentValue:parseFloat(e.target.value)});
    }

    return (
        <div>
            <table id="customers">
                <tr>
                    <th style={{textAlign: 'center', backgroundColor: 'orange'}} colSpan="1">Internal Rent</th>
                </tr>
                <tr>
                    <th>Value</th>
                </tr>
                <tr>
                    <td><input type="number" value={internalRent.internalRentValue} onChange={onChange}/></td>
                </tr>
            </table>
            <span style={{float: 'right'}}>Sum of Total Internal Rent : $ {GeneralUtils.numberFormatter(totalAmount.toFixed(2))}</span>
        </div>
    )
}
