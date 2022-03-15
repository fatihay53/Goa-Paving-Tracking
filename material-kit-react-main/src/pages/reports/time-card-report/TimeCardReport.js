// material
import React, {useEffect, useState} from "react";
import MLineChart from "../../../components/mcomponents/charts/MLineChart";
import TimeCardService from "../../../services/TimeCardService";
import MBarChart from "../../../components/mcomponents/charts/MBarChart";
import {Calendar} from 'primereact/calendar';
import moment from 'moment';
import { Button } from 'primereact/button';
import GeneralUtils from "../../../utils/GeneralUtils";

//

// ----------------------------------------------------------------------

export default function TimeCardReport() {

    const timeCardService = new TimeCardService();
    const [chartData, setChartData] = useState([]);
    const [xAxis, setXAxis] = useState([]);
    const [chartDataBar, setChartDataBar] = useState([]);
    const [xAxisBar, setXAxisBar] = useState([]);
    const [startDate, setStartDate] = useState(new Date(moment().subtract(7,"days").format(GeneralUtils.DATE_FORMAT_MOMENT)));
    const [endDate, setEndDate] = useState(new Date());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        requestCharts();
    }, [])

    const requestCharts= async ()=>{
        setLoading(true);
        await timeCardService.getTimeCardReport({startDate:moment(new Date(startDate)).format(GeneralUtils.DATE_FORMAT_MOMENT),endDate:moment(new Date(endDate)).format(GeneralUtils.DATE_FORMAT_MOMENT)}).then(res => {
            if (res.status == 200) {
                setData(res);
            }
        });

        timeCardService.getTimeCardReportTotal({startDate:moment(new Date(startDate)).format(GeneralUtils.DATE_FORMAT_MOMENT),endDate:moment(new Date(endDate)).format(GeneralUtils.DATE_FORMAT_MOMENT)}).then(res => {
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

        res.data.forEach(e => {//namesurname ve tarihleri tekilleştirme
            let date = e.date;
            let name = e.name;
            let surname = e.surname;

            let label = labelMap.get(date);
            if (label === null || label === undefined) {
                labelMap.set(date, date);
                labelArr.push(date);
            }

            let pavingMilling = labelMap.get(e.name);
            if (pavingMilling === null || pavingMilling === undefined) {
                labelMap.set(name, name);
                nameSurnameArr.push(name + " " + surname);
            }
        });


        res.data.forEach(e => {
            let name = e.name;
            let surname = e.surname;
            let date = e.date;

            let data = resultMap.get(date);
            if (data === null || data === undefined) {
                resultMap.set(date, [{name: name + " " + surname, total_hour_double: e.total_hour_double}]);
            } else {
                data.push({name: name + " " + surname, total_hour_double: e.total_hour_double});
                resultMap.set(date, data);
            }
        });

        for (const [key, value] of resultMap.entries()) {//ilgili tarihte değeri yoksa 0 yap
            nameSurnameArr.forEach(elem => {
                let a = value.filter(e => e.name === elem);
                if (a.length == 0) {
                    value.push({name: elem, total_hour_double: 0})
                    resultMap.set(key, value)
                }
            })
        }

        let chartData = [];
        nameSurnameArr.forEach(elem => {
            let data = [];
            for (const [key, value] of resultMap.entries()) {
                let filtered = value.filter(el => el.name == elem);
                if (filtered.length != 0) {
                    data.push(filtered[0].total_hour_double);
                }
            }
            chartData.push({name: elem, data: data})
        })

        setChartData(chartData);
        setXAxis(labelArr);
    }

    const setDataBarChart = (res) => {
        let data = [];
        let dataTimeDeserve = [];
        let labelArr = [];
        res.data.forEach(e => {
            let name = e.name;
            let surname = e.surname;
            data.push(e.total);
            dataTimeDeserve.push(e.timeDeserveTotal);
            labelArr.push(name + " " + surname);
        });

        setChartDataBar([{data: data},{data: dataTimeDeserve}]);
        setXAxisBar(labelArr);
    }

    return (
        <form onSubmit={(event) => event.preventDefault()} style={{backgroundColor:'#f3f3fe'}}>
            <div role="main">
                <ul className="form-section page-section">
                    <li className="form-line">
                        <div className="form-input-wide" data-layout="half">
                            <div className="p-fluid grid formgrid" style={{paddingRight:'1em'}}>
                                <label htmlFor="icon">Start Date</label>
                                <Calendar id="icon" value={startDate} onChange={(e) => setStartDate(e.value)}
                                          dateFormat={GeneralUtils.DATE_FORMAT_CALENDAR}
                                          showIcon/>
                            </div>
                        </div>
                        <div className="form-input-wide" data-layout="half">
                            <div className="p-fluid grid formgrid" style={{paddingRight:'1em'}}>
                                <label htmlFor="icon">End Date</label>
                                <Calendar id="icon" value={endDate} onChange={(e) => setEndDate(e.value)}
                                          dateFormat={GeneralUtils.DATE_FORMAT_CALENDAR}
                                          showIcon/>
                            </div>
                        </div>
                    </li>
                    <li className="form-line">
                        <div className="form-input-wide" data-layout="full">
                            <Button type="submit"
                                    loading={loading}
                                    style={{float:'right'}}
                                    onClick={saveForm}
                                    className="p-button-success form-submit-button submit-button jf-form-buttons"
                                    data-component="button" data-content="">
                                Submit
                            </Button>
                        </div>
                    </li>
                    <li className="form-line">
                        <div className="form-input-wide" data-layout="full">
                            <MLineChart chartData={chartData} chartTitle='Time Card Report (Daily With Time Deserve)'
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
