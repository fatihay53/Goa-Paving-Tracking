import React, {useState} from "react";
import GeneralUtils from "../../../../utils/GeneralUtils";

export default function ExternalRentTable({selectedData,setExternalCostTotal,setExternalRentValue}) {
    const [totalAmount, setTotalAmount] = useState(0);

    const getInitialData=()=>{
        let data ;
        if (!GeneralUtils.isNullOrEmpty(selectedData)){
            data =  {
                ...JSON.parse(selectedData.external_rent_json)
            }
        }else{
            data = {
                ofUnitTrucks: 0,
                hoursTrucks: 0,
                rateTrucks: 0,
                ofUnitEquipent: 0,
                hoursEquipent: 0,
                rateEquipent: 0
            }
        }
        return data;
    }

    const [externalRent, setExternalRent] = useState(getInitialData());

    React.useEffect(() => {
        let total = externalRent.ofUnitTrucks * externalRent.hoursTrucks * externalRent.rateTrucks + externalRent.ofUnitEquipent * externalRent.hoursEquipent * externalRent.rateEquipent;
        setTotalAmount(total);
        setExternalCostTotal(total);
        setExternalRentValue(externalRent);
        }, [externalRent.ofUnitTrucks, externalRent.hoursTrucks, externalRent.rateTrucks, externalRent.ofUnitEquipent, externalRent.hoursEquipent, externalRent.rateEquipent]);

    const onChangeOfUnitTrucks = (e) => {
        setExternalRent({
            ofUnitTrucks: e.target.value,
            hoursTrucks: externalRent.hoursTrucks,
            rateTrucks: externalRent.rateTrucks,
            ofUnitEquipent: externalRent.ofUnitEquipent,
            hoursEquipent: externalRent.hoursEquipent,
            rateEquipent: externalRent.rateEquipent
        })
    }

    const onChangeHoursTrucks = (e) => {
        setExternalRent({
            ofUnitTrucks: externalRent.ofUnitTrucks,
            hoursTrucks: e.target.value,
            rateTrucks: externalRent.rateTrucks,
            ofUnitEquipent: externalRent.ofUnitEquipent,
            hoursEquipent: externalRent.hoursEquipent,
            rateEquipent: externalRent.rateEquipent
        })
    }

    const onChangeRateTrucks = (e) => {
        setExternalRent({
            ofUnitTrucks: externalRent.ofUnitTrucks,
            hoursTrucks: externalRent.hoursTrucks,
            rateTrucks: e.target.value,
            ofUnitEquipent: externalRent.ofUnitEquipent,
            hoursEquipent: externalRent.hoursEquipent,
            rateEquipent: externalRent.rateEquipent
        })
    }

    const onChangeOfUnitEquipent = (e) => {
        setExternalRent({
            ofUnitTrucks: externalRent.ofUnitTrucks,
            hoursTrucks: externalRent.hoursTrucks,
            rateTrucks: externalRent.rateTrucks,
            ofUnitEquipent: e.target.value,
            hoursEquipent: externalRent.hoursEquipent,
            rateEquipent: externalRent.rateEquipent
        })
    }

    const onChangeHoursEquipent = (e) => {
        setExternalRent({
            ofUnitTrucks: externalRent.ofUnitTrucks,
            hoursTrucks: externalRent.hoursTrucks,
            rateTrucks: externalRent.rateTrucks,
            ofUnitEquipent: externalRent.ofUnitEquipent,
            hoursEquipent: e.target.value,
            rateEquipent: externalRent.rateEquipent
        })
    }

    const onChangeRateEquipent = (e) => {
        setExternalRent({
            ofUnitTrucks: externalRent.ofUnitTrucks,
            hoursTrucks: externalRent.hoursTrucks,
            rateTrucks: externalRent.rateTrucks,
            ofUnitEquipent: externalRent.ofUnitEquipent,
            hoursEquipent: externalRent.hoursEquipent,
            rateEquipent: e.target.value
        })
    }


    return (
        <div>
            <table id="customers">
                <tr>
                    <th style={{textAlign: 'center', backgroundColor: 'orange'}} colSpan="5">External Rent</th>
                </tr>
                <tr>
                    <th>#</th>
                    <th># of Units</th>
                    <th>Hours</th>
                    <th>Rate</th>
                    <th>Total</th>
                </tr>
                <tr>
                    <td>Trucks</td>
                    <td><input type="numeric" value={externalRent.ofUnitTrucks} onChange={onChangeOfUnitTrucks}/></td>
                    <td><input type="numeric" value={externalRent.hoursTrucks} onChange={onChangeHoursTrucks}/></td>
                    <td><input type="numeric" value={externalRent.rateTrucks} onChange={onChangeRateTrucks}/></td>
                    <td>$ {GeneralUtils.numberFormatter((externalRent.ofUnitTrucks * externalRent.hoursTrucks * externalRent.rateTrucks).toFixed(2))}</td>
                </tr>
                <tr>
                    <td>Equipent</td>
                    <td><input type="numeric" value={externalRent.ofUnitEquipent} onChange={onChangeOfUnitEquipent}/>
                    </td>
                    <td><input type="numeric" value={externalRent.hoursEquipent} onChange={onChangeHoursEquipent}/></td>
                    <td><input type="numeric" value={externalRent.rateEquipent} onChange={onChangeRateEquipent}/></td>
                    <td>$ {GeneralUtils.numberFormatter((externalRent.ofUnitEquipent * externalRent.hoursEquipent * externalRent.rateEquipent).toFixed(2))}</td>
                </tr>
            </table>
            <span style={{float: 'right'}}>Sum of Total Internal Rent: $ {GeneralUtils.numberFormatter(totalAmount.toFixed(2))}</span>
        </div>
    )

}