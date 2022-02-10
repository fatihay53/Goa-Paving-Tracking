// material
import React, {useEffect, useState} from "react";
import MLineChart from "../../../components/mcomponents/charts/MLineChart";
import TimeCardService from "../../../services/TimeCardService";
import MBarChart from "../../../components/mcomponents/charts/MBarChart";
//

// ----------------------------------------------------------------------

export default function TimeCardReport() {

    const timeCardService = new TimeCardService();
    const [chartData, setChartData] = useState([]);
    const [xAxis, setXAxis] = useState([]);
    const [chartDataBar, setChartDataBar] = useState([]);
    const [xAxisBar, setXAxisBar] = useState([]);

    useEffect(() => {
        timeCardService.getTimeCardReport().then(res => {
            if (res.status == 200) {
                setData(res);
            }
        });

        timeCardService.getTimeCardReportTotal().then(res => {
            if (res.status == 200) {
                setDataBarChart(res);
            }
        });
    }, [])

    const setData = (res) => {
        let resultMap = new Map();
        let labelMap = new Map();
        let labelArr = [];
        let nameSurnameArr = [];
        res.data.forEach(e => {
            let name = e.name;
            let surname = e.surname;
            let totalHourArr = resultMap.get(name + " " + surname);
            if (totalHourArr === null || totalHourArr === undefined) {
                resultMap.set(name + " " + surname, [e.total_hour_double]);
                nameSurnameArr.push(name + " " + surname);
            } else {
                totalHourArr.push(e.total_hour_double);
            }
        });

        res.data.forEach(e => {
            let date = e.date;
            let label = labelMap.get(date);
            if (label === null || label === undefined) {
                labelMap.set(date, date);
                labelArr.push(date);
            }
        });

        let chartData = [];
        nameSurnameArr.map(e => {
            let employeeData = resultMap.get(e);
            chartData.push({name: e, data: employeeData})
        })

        setChartData(chartData);
        setXAxis(labelArr);
    }

    const setDataBarChart = (res) => {
        let data = [];
        let labelArr = [];
        res.data.forEach(e => {
            let name = e.name;
            let surname = e.surname;
            data.push(e.total);
            labelArr.push(name + " " + surname);
        });

        setChartDataBar([{data: data}]);
        setXAxisBar(labelArr);
    }

    return (
        <React.Fragment>
            <div style={{marginBottom:'0.5em'}}>
                <MLineChart chartData={chartData} chartTitle='Time Card Report (Daily)' xAxis={xAxis}/>
            </div>
            <div>
            <MBarChart chartData={chartDataBar} chartTitle='Time Card Report (Total)' xAxis={xAxisBar}/>
            </div>
        </React.Fragment>
    )
}
