// material
import React, {useEffect, useState} from "react";
import MLineChart from "../../../components/mcomponents/charts/MLineChart";
import TimeCardService from "../../../services/TimeCardService";
import MBarChart from "../../../components/mcomponents/charts/MBarChart";
import {Calendar} from 'primereact/calendar';
import moment from 'moment';
import { Button } from 'primereact/button';

//

// ----------------------------------------------------------------------
const DATE_FORMAT = 'yy-mm-dd';
const DATE_FORMAT_MOMENT = 'YYYY-MM-DD';

export default function PavingMillingReport() {

    const timeCardService = new TimeCardService();
    const [chartData, setChartData] = useState([]);
    const [xAxis, setXAxis] = useState([]);
    const [chartDataBar, setChartDataBar] = useState([]);
    const [xAxisBar, setXAxisBar] = useState([]);
    const [startDate, setStartDate] = useState(new Date(moment().subtract(7,"days").format(DATE_FORMAT_MOMENT)));
    const [endDate, setEndDate] = useState(new Date());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        requestCharts();
    }, [])

    const requestCharts= async ()=>{
        setLoading(true);
        await timeCardService.getTimeCardReport({startDate:moment(new Date(startDate)).format(DATE_FORMAT_MOMENT),endDate:moment(new Date(endDate)).format(DATE_FORMAT_MOMENT)}).then(res => {
            if (res.status == 200) {
                setData(res);
            }
        });

        timeCardService.getTimeCardReportTotal({startDate:moment(new Date(startDate)).format(DATE_FORMAT_MOMENT),endDate:moment(new Date(endDate)).format(DATE_FORMAT_MOMENT)}).then(res => {
            if (res.status == 200) {
                setDataBarChart(res);
            }
        });
        setLoading(false);
    }

    const saveForm=()=>{
        requestCharts();
    }

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
        <form onSubmit={(event) => event.preventDefault()}>
            <div role="main">
                <ul className="form-section page-section">
                    <li className="form-line">
                        <div className="form-input-wide" data-layout="half">
                            <div className="p-fluid grid formgrid" style={{paddingRight:'1em'}}>
                                <label htmlFor="icon">Start Date</label>
                                <Calendar id="icon" value={startDate} onChange={(e) => setStartDate(e.value)}
                                          dateFormat={DATE_FORMAT}
                                          showIcon/>
                            </div>
                        </div>
                        <div className="form-input-wide" data-layout="half">
                            <div className="p-fluid grid formgrid" style={{paddingRight:'1em'}}>
                                <label htmlFor="icon">End Date</label>
                                <Calendar id="icon" value={endDate} onChange={(e) => setEndDate(e.value)}
                                          dateFormat={DATE_FORMAT}
                                          showIcon/>
                            </div>
                        </div>
                    </li>
                    <li className="form-line">
                        <div className="form-input-wide" data-layout="full">
                            <Button type="submit"
                                    loading={loading}
                                    style={{float:'right',marginRight:'2.5em'}}
                                    onClick={saveForm}
                                    className="p-button-success form-submit-button submit-button jf-form-buttons"
                                    data-component="button" data-content="">
                                Submit
                            </Button>
                        </div>
                    </li>
                    <li className="form-line">
                        <div className="form-input-wide" data-layout="full">
                            <MLineChart chartData={chartData} chartTitle='Time Card Report (Daily)'
                                        xAxis={xAxis}/>
                        </div>
                    </li>
                    <li className="form-line">
                        <div className="form-input-wide" data-layout="full">
                            <MBarChart chartData={chartDataBar} chartTitle='Time Card Report (Total)'
                                       xAxis={xAxisBar}/>
                        </div>
                    </li>
                </ul>
            </div>
        </form>
    )
}
