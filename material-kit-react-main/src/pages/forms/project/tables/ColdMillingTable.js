import React, {useState} from "react";
import GeneralUtils from "../../../../utils/GeneralUtils";

export default function ColdMillingTable({selectedData,setColdMillingTotal,setColdMillingValue}) {
    const [totalAmount,setTotalAmount] = useState(0);

    const getInitialData=()=>{
        let data ;
        if (!GeneralUtils.isNullOrEmpty(selectedData)){
            data = {
                ...JSON.parse(selectedData.cold_milling_json)
            }
        }else{
            data = {quantityHours:0,rateHours:0,quantitySquareMeters:0,rateSquareMeters:0}
        }
        return data;
    }

    const [coldMilling,setColdMilling] = useState(getInitialData());

    React.useEffect(() => {
        let total = coldMilling.quantityHours*coldMilling.rateHours + coldMilling.quantitySquareMeters*coldMilling.rateSquareMeters;
        setTotalAmount(total);
        setColdMillingTotal(total);
        setColdMillingValue(coldMilling);
        }, [coldMilling.quantityHours,coldMilling.rateHours,coldMilling.quantitySquareMeters,coldMilling.rateSquareMeters]);

    const onChangeQuantiyHours=(e)=> {
        setColdMilling({quantityHours:e.target.value,rateHours:coldMilling.rateHours,quantitySquareMeters:coldMilling.quantitySquareMeters,rateSquareMeters:coldMilling.rateSquareMeters})
    }

    const onChangeRateHours=(e)=> {
        setColdMilling({quantityHours:coldMilling.quantityHours,rateHours:e.target.value,quantitySquareMeters:coldMilling.quantitySquareMeters,rateSquareMeters:coldMilling.rateSquareMeters})
    }

    const onChangeQuantityM2=(e)=> {
        setColdMilling({quantityHours:coldMilling.quantityHours,rateHours:coldMilling.rateHours,quantitySquareMeters:e.target.value,rateSquareMeters:coldMilling.rateSquareMeters})
    }

    const onChangeRateM2=(e)=> {
        setColdMilling({quantityHours:coldMilling.quantityHours,rateHours:coldMilling.rateHours,quantitySquareMeters:coldMilling.quantitySquareMeters,rateSquareMeters:e.target.value})
    }
    return(
        <div>
            <table id="customers">
                <tr>
                    <th  style={{textAlign:'center',backgroundColor:'orange'}} colSpan="4">Cold Milling</th>
                </tr>
                <tr>
                    <th>#</th>
                    <th>Quantity</th>
                    <th>Rate</th>
                    <th>Total</th>
                </tr>
                <tr>
                    <td>Hours</td>
                    <td><input type="number" value={coldMilling.quantityHours} onChange={onChangeQuantiyHours}/></td>
                    <td><input type="number" value={coldMilling.rateHours} onChange={onChangeRateHours}/></td>
                    <td>$ {GeneralUtils.numberFormatter((coldMilling.quantityHours*coldMilling.rateHours).toFixed(2))}</td>
                </tr>
                <tr>
                    <td>Square Meters</td>
                    <td><input type="number" value={coldMilling.quantitySquareMeters} onChange={onChangeQuantityM2}/></td>
                    <td><input type="number" value={coldMilling.rateSquareMeters} onChange={onChangeRateM2}/></td>
                    <td>$ {GeneralUtils.numberFormatter((coldMilling.quantitySquareMeters*coldMilling.rateSquareMeters).toFixed(2))}</td>
                </tr>
            </table>
            <span style={{float:'right'}}>Total Cold Milling Cost: $ {GeneralUtils.numberFormatter(totalAmount.toFixed(2))}</span>
        </div>
    )

}