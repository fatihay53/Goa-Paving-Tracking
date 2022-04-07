import React, {useEffect, useState} from "react";
import GeneralUtils from "../../../../utils/GeneralUtils";
import EstimateTemplateService from "../../../../services/EstimateTemplateService";
import {toast} from "react-toastify";

export default function EmployeeTableForeman({selectedData,updateDt}) {
    const estimateTemplateService = new EstimateTemplateService();
    const [role,setRole] = useState({})
    const [totalAmount, setTotalAmount] = useState(0);

    const getInitialDataEmployeeValue=()=>{
        let data;
        if (!GeneralUtils.isNullOrEmpty(selectedData.employee_foreman_json)){
            data = new Map(Object.entries(JSON.parse(selectedData.employee_foreman_json)))
        }else{
            data = new Map()
        }
        return data;
    }

    const [employeeValues, setEmployeeValues] = useState(getInitialDataEmployeeValue());

    const getInitialData=()=>{
        let data ;
        if (!GeneralUtils.isNullOrEmpty(selectedData)){
            data = [
                ...JSON.parse(selectedData.employee_json)
            ]
        }else{
            data = []
        }
        return data;
    }
    const [employees, setEmployees] = useState(getInitialData());

    useEffect(()=>{
        let role = localStorage.getItem('role');
        setRole(role);
        if (role === 'ROLE_SUPERVISOR'){
            calculateTotalAmount();
        }
    },[])

    React.useEffect(() => {
        if (role === 'ROLE_SUPERVISOR'){
            calculateTotalAmount();
        }
    }, [employees]);

    const onChangeInput = (e, empId,timeDeserve) => {
        let value;
        if (e.target.value === null || e.target.value === undefined || e.target.value === '') {
            value = 0;
        } else {
            if (e.target.value.includes(".")){
                return toast.warning("Please use comma(,)")
            }
            value = e.target.value;
        }
        setEmployeeValues(map => new Map(map.set(empId, {id: empId, employeeHour: value,timeDeserve,...employees.filter(e => e.id == empId)[0]})));
    }

    const onChangeInputTimeDeserve = (e, empId,employeeHour) => {
        let value;
        if (e.target.value === null || e.target.value === undefined || e.target.value === '') {
            value = 0;
        } else {
            if (e.target.value.includes(".")){
                return toast.warning("Please use comma(,)")
            }
            value = e.target.value;
        }
        setEmployeeValues(map => new Map(map.set(empId, {id: empId, timeDeserve: value,employeeHour,...employees.filter(e => e.id == empId)[0]})));
    }

    const calculateTotalAmount = () => {
        let total=0;
        employees.map((elem, index) => {
            let empl= employeeValues.get(''+elem.id);
            if (!GeneralUtils.isNullOrEmpty(empl)){
                total += empl.hourlyCost * (empl.employeeHour+empl.timeDeserve);
            }
        })
        setTotalAmount(total);
    }

    const saveForm=()=>{
        estimateTemplateService.updateForemanData({id:selectedData.id,employeeForemanData:Object.fromEntries(employeeValues)}).then(res=>{
            if (res.status == 200){
                updateDt();
            }
        })
    }

    return (
        <div>
            <table id="customers">
                <tr>
                    <th  style={{textAlign:'center',backgroundColor:'orange'}} colSpan={role === 'ROLE_SUPERVISOR' ? "7" : "6"}>Foreman Entering</th>
                </tr>
                {employees.length > 0 && <tr>
                    <th>Employee Id</th>
                    <th>Name</th>
                    <th>Surname</th>
                    {role === 'ROLE_SUPERVISOR'&&<th>Hourly Cost</th>}
                    <th>Estimate Hour</th>
                    <th>Employee Hour</th>
                    <th>Time Deserve</th>
                </tr>}
                {employees.length > 0 &&
                employees.map((elem, index) => {
                    return (
                        <tr>
                            <td>{elem.id}</td>
                            <td>{elem.name}</td>
                            <td>{elem.surname}</td>
                            {role === 'ROLE_SUPERVISOR'&&<td>${elem?.hourlyCost}</td>}
                            <td>{elem.estimateProjectHour}</td>
                            <td><input disabled={role !== 'ROLE_FOREMAN'} value={employeeValues.get(''+elem.id)? employeeValues.get(''+elem.id).employeeHour : 0} onChange={(e)=>onChangeInput(e,''+elem.id,employeeValues.get(''+elem.id)?.timeDeserve)} /></td>
                            <td><input disabled={role !== 'ROLE_FOREMAN'} value={employeeValues.get(''+elem.id)? employeeValues.get(''+elem.id).timeDeserve : 0} onChange={(e)=>onChangeInputTimeDeserve(e,''+elem.id,employeeValues.get(''+elem.id)?.employeeHour)} /></td>
                        </tr>
                    )
                })}
            </table>
            {role === 'ROLE_SUPERVISOR'&&<span style={{float: 'right'}}>Sum of Total Labour : $ {GeneralUtils.numberFormatter(totalAmount.toFixed(2))}</span>}

            <li className="form-line" data-type="control_button" id="id_2">
                <div id="cid_2" className="form-input-wide" data-layout="full">
                    <div data-align="auto"
                         className="form-buttons-wrapper form-buttons-auto   jsTest-button-wrapperField">
                        {role === 'ROLE_FOREMAN'&&<button id="input_2" type="submit"
                                onClick={saveForm}
                                className="form-submit-button submit-button jf-form-buttons jsTest-submitField"
                                data-component="button" data-content="">
                            Submit
                        </button>}
                    </div>
                </div>
            </li>
        </div>
    )
}