import React, {useEffect, useState} from "react";
import GeneralUtils from "../../../../utils/GeneralUtils";

export default function ResultTable({setProfit,subContractorTotal,materialsTotal,employeeTotal,externalRentTotal,internalRentTotal,equipmentCostTotal,coldMillingTotal,trafficControlTotal,totalM2,setBidValue,bidValue}) {
    const [totalAmount,setTotalAmount] = useState(0);
    const [totalAmountM2,setTotalAmountM2] = useState(0);
    const [totalAmountTonne,setTotalAmountTonne] = useState(0);
    const [totalBidAmount,setTotalBidAmount] = useState(0);
    const [totalBidAmountM2,setTotalBidAmountM2] = useState(0);
    const [totalBidAmountTonne,setTotalBidAmountTonne] = useState(0);
    const [profitAmount,setProfitAmount] = useState(0);
    const [profitAmountM2,setProfitAmountM2] = useState(0);
    const [profitAmountTonne,setProfitAmountTonne] = useState(0);

    const [bid,setBid] = useState(bidValue ? bidValue : 0);

    useEffect(()=>{
        calculateTotals();
        },[bid,subContractorTotal,materialsTotal,employeeTotal,externalRentTotal,internalRentTotal,equipmentCostTotal,coldMillingTotal,trafficControlTotal])

    useEffect(()=>{
        calculateTotals();
    },[])

    const onChange=(e)=>{
        let val = e.target.value;
        setBid(val);
        setBidValue(parseFloat(GeneralUtils.changeDecimalSeperator(val.toString(),',','.')));
    }

    const calculateTotals=()=>{
        let total=0;

        total += subContractorTotal;
        total += employeeTotal;
        total += materialsTotal.materialsTotal ? materialsTotal.materialsTotal : 0 ;
        total += externalRentTotal;
        total += internalRentTotal;
        total += equipmentCostTotal;
        total += coldMillingTotal;
        total += trafficControlTotal;

        let totalamount = GeneralUtils.numberFormatter((total*1).toFixed(2));
        let totalamountm2 =GeneralUtils.numberFormatter((total / parseFloat(totalM2)).toFixed(2));
        let totalamounttonne = GeneralUtils.numberFormatter((total / materialsTotal.quantityTotal).toFixed(2));

        setTotalAmount(totalamount);
        setTotalAmountM2(totalamountm2);
        setTotalAmountTonne(totalamounttonne);

        let totalbidamountm2 = GeneralUtils.numberFormatter(((total / parseFloat(totalM2))*parseFloat(GeneralUtils.changeDecimalSeperator(bid.toString(),',','.'))).toFixed(2));
        let totalbidamount = GeneralUtils.numberFormatter((total*parseFloat(GeneralUtils.changeDecimalSeperator(bid.toString(),',','.'))).toFixed(2));
        let totalbidamountonne = GeneralUtils.numberFormatter(((total / materialsTotal.quantityTotal) * parseFloat(GeneralUtils.changeDecimalSeperator(bid.toString(),',','.'))).toFixed(2));
        setTotalBidAmount(totalbidamount);
        setTotalBidAmountM2(totalbidamountm2);
        setTotalBidAmountTonne(totalbidamountonne);

        let profit = GeneralUtils.numberFormatter((parseFloat(''+GeneralUtils.changeDecimalSeperator(''+totalbidamount,',','.')) - parseFloat(''+GeneralUtils.changeDecimalSeperator(''+totalamount,',','.'))).toFixed(2));
        setProfitAmount(profit);
        setProfitAmountM2(GeneralUtils.numberFormatter((parseFloat(''+GeneralUtils.changeDecimalSeperator(''+totalbidamountm2,',','.')).toFixed(2) - parseFloat(''+GeneralUtils.changeDecimalSeperator(''+totalamountm2,',','.')).toFixed(2)).toFixed(2)));
        setProfitAmountTonne(GeneralUtils.numberFormatter((parseFloat(''+GeneralUtils.changeDecimalSeperator(''+totalbidamountonne,',','.')).toFixed(2) - parseFloat(''+GeneralUtils.changeDecimalSeperator(''+totalamounttonne,',','.')).toFixed(2)).toFixed(2)));
        setProfit(profit);
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
                    <td style={{color:'red'}}>${ totalAmountM2 }</td>
                    <td style={{color:'red'}}>${ totalAmountTonne }</td>
                    <td style={{color:'red'}}>${ totalAmount }</td>
                </tr>
                <tr>
                    <td>Total Bid % <input value={bid} onChange={onChange}/></td>
                    <td>${ totalBidAmountM2}</td>
                    <td>${ totalBidAmountTonne }</td>
                    <td>${ totalBidAmount }</td>
                </tr>
                <tr>
                    <td>Profit</td>
                    <td style={{color:'green'}}>${ profitAmountM2 }</td>
                    <td style={{color:'green'}}>${ profitAmountTonne }</td>
                    <td style={{color:'green'}}>${ profitAmount }</td>
                </tr>
            </table>
        </div>
    )
}
