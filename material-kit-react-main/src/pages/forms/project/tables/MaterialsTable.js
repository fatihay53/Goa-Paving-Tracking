import React, {useEffect, useState} from "react";
import MaterialsService from "../../../../services/MaterialsService";
import GeneralUtils from "../../../../utils/GeneralUtils";

export default function MaterialsTable({selectedData,setTotal,setMaterialsTotal,setMaterialsValue}) {
    const [totalAmount,setTotalAmount] = useState(0);
    const [materials,setMaterials] = useState([]);

    const materialsService  = new MaterialsService();

    const getInitialData=()=>{
        let data ;
        if (!GeneralUtils.isNullOrEmpty(selectedData)){
            data =  new Map(Object.entries(JSON.parse(selectedData.materials_json)))
        }else{
            data = new Map()
        }
        return data;
    }

    const [materialsValues, setMaterialsValues] = useState(getInitialData());

    useEffect(()=>{
        materialsService.findAll().then(res=>{
            if (res.status == 200){
                setMaterials(res.data);
            }
        })
    },[])

    React.useEffect(() => {
        calculateTotalAmount();
        setMaterialsValue(Object.fromEntries(materialsValues));
    }, [materialsValues]);

    const calculateTotalAmount=()=>{
        let total=0;
        let rateTotal=0;
        let quantityTotal=0;
        for(let [key, value] of materialsValues) {
            total+= value.total;
            rateTotal+=value.rateValue;
            quantityTotal+=value.quantityValue;
        }
        setTotalAmount(total);
        setMaterialsTotal({materialsTotal:total,rateTotal,quantityTotal});
    }

    const onChangeQuantityInput=(e,materialId)=>{
        let value =e.target.value;

        let material = materialsValues.get(materialId);
        let rateValue = material&&material.rateValue ? material.rateValue  : 0;
        setMaterialsValues(map => new Map(map.set(materialId,{id:materialId,quantityValue:value,rateValue,total: rateValue*value})));
    }

    const onChangeRateInput=(e,materialId)=>{
        let value;
        if (e.target.value === null || e.target.value === undefined || e.target.value === ''){
            value = 0;
        }else{
            value = parseFloat(e.target.value);
        }
        let material = materialsValues.get(materialId);
        let quantityValue = material&&material.quantityValue ? material.quantityValue :0;
        setMaterialsValues(map => new Map(map.set(materialId,{id:materialId,rateValue:value,quantityValue,total: quantityValue*value})));
    }

    return(
        <div>
            <table id="customers">
                <tr>
                    <th  style={{textAlign:'center',backgroundColor:'orange'}} colSpan="4">Materials</th>
                </tr>
                <tr>
                    <th>#</th>
                    <th>Quantity</th>
                    <th>Rate</th>
                    <th>Total</th>
                </tr>
                {materials.length>0 &&
                    materials.map(elem=>{
                        return <tr>
                            <td>{elem.name}</td>
                            <td><input type="number" value={materialsValues.get(''+elem.id)? materialsValues.get(''+elem.id).quantityValue : 0} onChange={(e)=>onChangeQuantityInput(e,''+elem.id)} /></td>
                            <td><input type="number" value={materialsValues.get(''+elem.id)? materialsValues.get(''+elem.id).rateValue : 0} onChange={(e)=>onChangeRateInput(e,''+elem.id)} /></td>
                            <td>${materialsValues.get(''+elem.id)? GeneralUtils.numberFormatter((materialsValues.get(''+elem.id).total).toFixed(2)) : 0}</td>
                        </tr>
                    })
                }
            </table>
            <span style={{float:'right'}}>Sum of Total Materials: $ {GeneralUtils.numberFormatter(totalAmount.toFixed(2))}</span>
        </div>
    )

}