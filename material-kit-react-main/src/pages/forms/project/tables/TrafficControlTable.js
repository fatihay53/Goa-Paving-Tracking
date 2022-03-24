import React, {useState} from "react";
import {toast} from "react-toastify";
import GeneralUtils from "../../../../utils/GeneralUtils";

export default function TrafficControlTable({selectedData,setTrafficControlTotal,setTrafficControlValue}) {

    const [totalAmount,setTotalAmount] = useState(0);

    const getInitialData=()=>{
        let data ;
        if (!GeneralUtils.isNullOrEmpty(selectedData)){
            data = {
                ...JSON.parse(selectedData.traffic_control_json)
            }
        }else{
            data = {personel:0,hours:0,rate:0}
        }
        return data;
    }

    const [trafficControl,setTrafficControl] = useState(getInitialData());

    React.useEffect(() => {
        let total = trafficControl.personel*trafficControl.hours*trafficControl.rate;
        setTotalAmount(total);
        setTrafficControlTotal(total);
        setTrafficControlValue(trafficControl);
    }, [trafficControl.personel,trafficControl.hours,trafficControl.rate]);


    const onChangePersonel=(e)=>{
        setTrafficControl({personel:e.target.value,hours:trafficControl.hours,rate:trafficControl.rate})
    }

    const onChangeHours=(e)=>{
        setTrafficControl({personel:trafficControl.personel,hours:e.target.value,rate:trafficControl.rate})
    }

    const onChangeRate=(e)=>{
        setTrafficControl({personel:trafficControl.personel,hours:trafficControl.hours,rate:e.target.value})
    }

    return (
        <div>
            <table id="customers">
                <tr>
                    <th style={{textAlign: 'center', backgroundColor: 'orange'}} colSpan="3">Traffic Control</th>
                </tr>
                <tr>
                    <th>Personel</th>
                    <th>Hours</th>
                    <th>Rate</th>
                </tr>
                <tr>
                    <td><input type="number" value={trafficControl.personel} onChange={onChangePersonel}/></td>
                    <td><input type="number" value={trafficControl.hours} onChange={onChangeHours}/></td>
                    <td><input type="number" value={trafficControl.rate} onChange={onChangeRate}/></td>
                </tr>
            </table>

            <span style={{float: 'right'}}>Sum of Traffic Control : $ {GeneralUtils.numberFormatter(totalAmount.toFixed(2))}</span>

        </div>
    )
}
