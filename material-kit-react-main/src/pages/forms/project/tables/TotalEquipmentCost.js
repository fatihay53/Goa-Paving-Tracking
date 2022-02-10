import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import GeneralUtils from "../../../../utils/GeneralUtils";

export default function TotalEquipmentCost({selectedData,estimateProjectHour,setEquipmentCostTotal,setEquipmentCostValue}) {

    const [totalAmount,setTotalAmount] = useState(0);

    const getInitialData=()=>{
        let data ;
        if (!GeneralUtils.isNullOrEmpty(selectedData)){
            data = {...JSON.parse(selectedData.equipment_cost_json)}
        }else{
            data = {equipHr:0}
        }
        return data;
    }

    const [equipHr,setEquipHr] = useState(getInitialData());

    useEffect(()=>{
        let total = equipHr.equipHr*estimateProjectHour;
        setTotalAmount(total);
        setEquipmentCostTotal(total);
        setEquipmentCostValue({equipHr:equipHr.equipHr})
    },[equipHr])

    const onChange=(e)=>{
        if (estimateProjectHour === null || estimateProjectHour === undefined || estimateProjectHour === '') {
            return toast.warning("Please enter estimate project hour.")
        }
        setEquipHr({equipHr:parseFloat(e.target.value)});
    }

    return (
        <div>
            <table id="customers">
                <tr>
                    <th style={{textAlign: 'center', backgroundColor: 'orange'}} colSpan="1">Equipment Cost</th>
                </tr>
                <tr>
                    <th>Equip/HR</th>
                </tr>
                <tr>
                    <td><input type="number" value={equipHr.equipHr} onChange={onChange}/></td>
                </tr>
            </table>
            <span style={{float: 'right'}}>Total Equipment Cost: $ {GeneralUtils.numberFormatter(totalAmount.toFixed(2))}</span>
        </div>
    )
}
