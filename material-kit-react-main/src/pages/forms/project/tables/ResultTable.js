import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import GeneralUtils from "../../../../utils/GeneralUtils";

export default function ResultTable({subContractorTotal,materialsTotal,employeeTotal,externalRentTotal,internalRentTotal,equipmentCostTotal,coldMillingTotal,trafficControlTotal,totalM2,setBidValue,bidValue}) {

    const [totalCost,setTotalCost] = useState(0);
    const [bid,setBid] = useState(bidValue ? bidValue : 0);

    useEffect(()=>{
        let total=0;

        total += subContractorTotal;
        total += employeeTotal;
        total += materialsTotal.materialsTotal ? materialsTotal.materialsTotal : 0 ;
        total += externalRentTotal;
        total += internalRentTotal;
        total += equipmentCostTotal;
        total += coldMillingTotal;
        total += trafficControlTotal;

        setTotalCost(total);
    },[subContractorTotal,materialsTotal,employeeTotal,externalRentTotal,internalRentTotal,equipmentCostTotal,coldMillingTotal,trafficControlTotal])

    const onChange=(e)=>{
        let val = e.target.value;
        setBid(val);
        setBidValue(parseFloat(GeneralUtils.changeDecimalSeperator(val.toString(),',','.')));
    }

    return (
        <div>
            <table id="customers">
                <tr>
                    <th style={{textAlign: 'center', backgroundColor: 'black'}} colSpan="4">Internal Cost</th>
                </tr>
                <tr>
                    <th style={{backgroundColor:'gray'}}>#</th>
                    <th style={{backgroundColor:'gray'}}>$/M2</th>
                    <th style={{backgroundColor:'gray'}}>$/Tonne</th>
                    <th style={{backgroundColor:'gray'}}>Total $</th>
                </tr>
                <tr>
                    <td>Total Internal Cost</td>
                    <td>${ GeneralUtils.numberFormatter((totalCost / parseFloat(totalM2)).toFixed(2))}</td>
                    <td>${ GeneralUtils.numberFormatter((totalCost / materialsTotal.quantityTotal).toFixed(2))}</td>
                    <td>${ GeneralUtils.numberFormatter((totalCost*1).toFixed(2))}</td>
                </tr>
                <tr>
                    <td>Total Bid % <input value={bid} onChange={onChange}/></td>
                    <td>${ GeneralUtils.numberFormatter(((totalCost / parseFloat(totalM2))*parseFloat(GeneralUtils.changeDecimalSeperator(bid.toString(),',','.'))).toFixed(2))}</td>
                    <td>${ GeneralUtils.numberFormatter(((totalCost / materialsTotal.quantityTotal) * parseFloat(GeneralUtils.changeDecimalSeperator(bid.toString(),',','.'))).toFixed(2))}</td>
                    <td>${ GeneralUtils.numberFormatter((totalCost*parseFloat(GeneralUtils.changeDecimalSeperator(bid.toString(),',','.'))).toFixed(2))}</td>
                </tr>
            </table>
        </div>
    )
}
