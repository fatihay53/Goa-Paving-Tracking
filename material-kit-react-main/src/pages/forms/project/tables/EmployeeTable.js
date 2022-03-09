import {Button} from "@mui/material";
import MDialog from "../../../../components/mcomponents/MDialog";
import React, {useState} from "react";
import SelectEmployee from "../../../../components/mcomponents/SelectEmployee";
import {toast} from "react-toastify";
import GeneralUtils from "../../../../utils/GeneralUtils";

export default function EmployeeTable({selectedData,estimateProjectHour,setEmployeeTotal,setEmployeeValue}) {
    const [showDialog, setShowDialog] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [showedHtml, setShowedHtml] = useState({});
    const [employeeValues, setEmployeeValues] = useState(new Map());


   /* React.useEffect(() => {
        calculateTotalAmount();
    }, [employeeValues]);*/

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

    React.useEffect(() => {
        calculateTotalAmount();
    }, [employees]);

    const addCrews = () => {

        if (estimateProjectHour === null || estimateProjectHour === undefined || estimateProjectHour === '') {
            return toast.warning("Please enter estimate project hour.")
        }
        setShowDialog(true);
        //setEmployeeValues(employeeValues => new Map());
        setShowedHtml(<SelectEmployee restriction="findAllEmployees"
                                      setSelections={(selections) => calculateEmployeeValues(selections)}/>);
    }

    const calculateEmployeeValues=(selections)=>{
        let employeeArr = [];
        selections.map(elem=>{
            let employeeValue = {
                id: elem.id,
                name: elem.name,
                surname: elem.surname,
                hourlyCost: elem.hourly_cost,
                estimateProjectHour : estimateProjectHour,
                totalCost : elem.hourly_cost * estimateProjectHour
            }
            employeeArr.push(employeeValue);
        })
        setEmployees(employeeArr);
    }

    const onChangeInput = (e, empId, hourlyCost) => {
        let value;
        if (e.target.value === null || e.target.value === undefined || e.target.value === '') {
            value = 0;
        } else {
            value = parseFloat(e.target.value);
        }
        setEmployeeValues(map => new Map(map.set(empId, {id: empId, hour: value, total: hourlyCost * value})));
    }

    /*const calculateTotalAmount = () => {
        let total = 0;

        for (let [key, value] of employeeValues) {
            total += value.total;
        }
        setTotalAmount(total);
    }*/

    const calculateTotalAmount = () => {
        let total=0;
        employees.map((elem, index) => {
            total += elem.hourlyCost * estimateProjectHour;
        })
        setTotalAmount(total);
        setEmployeeTotal(total);
        setEmployeeValue(employees);
    }

    return (
        <div>
            <table id="customers">
                <tr>
                    <Button size="large" style={{color: 'white'}} variant="contained" color="warning"
                            onClick={addCrews}>
                        Add Crews
                    </Button>
                </tr>
                {employees.length > 0 && <tr>
                    <th>Employee Id</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Hourly Cost</th>
                    <th>Estimate Hour</th>
                    <th>Total Cost</th>
                </tr>}
                {employees.length > 0 &&
                employees.map((elem, index) => {
                    return (
                        <tr>
                            <td>{elem.id}</td>
                            <td>{elem.name}</td>
                            <td>{elem.surname}</td>
                            <td>${elem.hourlyCost}</td>
                            <td>{elem.estimateProjectHour}</td>
                            {/*
                            <td><input value={employeeValues.get(elem.id)? employeeValues.get(elem.id).value : 0} onChange={(e)=>onChangeInput(e,elem.id,elem.hourly_cost)} /></td>

                            <td>${employeeValues.get(elem.id)? employeeValues.get(elem.id).total : 0}</td>
                            */}
                            <td>${GeneralUtils.numberFormatter(elem.totalCost)}</td>
                        </tr>
                    )
                })}
            </table>
            <span style={{float: 'right'}}>Sum of Total Labour : $ {GeneralUtils.numberFormatter(totalAmount.toFixed(2))}</span>
            {showDialog && <MDialog showedHtml={showedHtml} showDialog={showDialog} setShowDialog={setShowDialog}/>}
        </div>
    )
}