import React, {useState} from "react";

export default function SubContractorTable() {
    const [subContractor,setSubContractor] = useState({quantityHours:0,rateHours:0,quantityM2:0,rateM2:0});
    const [totalAmount,setTotalAmount] = useState(0);

    React.useEffect(() => {
        setTotalAmount(subContractor.quantityHours*subContractor.rateHours + subContractor.quantityM2*subContractor.rateM2);
    }, [subContractor.quantityHours,subContractor.rateHours,subContractor.quantityM2,subContractor.rateM2]);

    const onChangeQuantiyHours=(e)=> {
        setSubContractor({quantityHours:e.target.value,rateHours:subContractor.rateHours,quantityM2:subContractor.quantityM2,rateM2:subContractor.rateM2})
    }

    const onChangeRateHours=(e)=> {
        setSubContractor({quantityHours:subContractor.quantityHours,rateHours:e.target.value,quantityM2:subContractor.quantityM2,rateM2:subContractor.rateM2})
    }

    const onChangeQuantityM2=(e)=> {
        setSubContractor({quantityHours:subContractor.quantityHours,rateHours:subContractor.rateHours,quantityM2:e.target.value,rateM2:subContractor.rateM2})
    }

    const onChangeRateM2=(e)=> {
        setSubContractor({quantityHours:subContractor.quantityHours,rateHours:subContractor.rateHours,quantityM2:subContractor.quantityM2,rateM2:e.target.value})
    }
    return(
        <div>
            <table id="customers">
                <tr>
                    <th  style={{textAlign:'center',backgroundColor:'orange'}} colSpan="4">Sub-Contractor</th>
                </tr>
                <tr>
                    <th>#</th>
                    <th>Quantity</th>
                    <th>Rate</th>
                    <th>Total</th>
                </tr>
                <tr>
                    <td>Hours</td>
                    <td><input type="numeric" value={subContractor.quantityHours} onChange={onChangeQuantiyHours}/></td>
                    <td><input type="numeric" value={subContractor.rateHours} onChange={onChangeRateHours}/></td>
                    <td>$ {subContractor.quantityHours*subContractor.rateHours}</td>
                </tr>
                <tr>
                    <td>M2</td>
                    <td><input type="numeric" value={subContractor.quantityM2} onChange={onChangeQuantityM2}/></td>
                    <td><input type="numeric" value={subContractor.rateM2} onChange={onChangeRateM2}/></td>
                    <td>$ {subContractor.quantityM2*subContractor.rateM2}</td>
                </tr>
            </table>
            <span style={{float:'right'}}>Total : $ {totalAmount}</span>
        </div>
    )

}