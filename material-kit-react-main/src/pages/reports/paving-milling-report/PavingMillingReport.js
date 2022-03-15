// material
import React, {useEffect, useState} from "react";
import MLineChart from "../../../components/mcomponents/charts/MLineChart";
import MBarChart from "../../../components/mcomponents/charts/MBarChart";
import {Calendar} from 'primereact/calendar';
import moment from 'moment';
import {Button} from 'primereact/button';
import GeneralUtils from "../../../utils/GeneralUtils";
import EstimateTemplateService from "../../../services/EstimateTemplateService";

//

// ----------------------------------------------------------------------
export default function PavingMillingReport() {

    const estimateTemplateService = new EstimateTemplateService();
    const [chartData, setChartData] = useState([]);
    const [xAxis, setXAxis] = useState([]);
    const [chartDataBar, setChartDataBar] = useState([]);
    const [xAxisBar, setXAxisBar] = useState([]);
    const [startDate, setStartDate] = useState(new Date(moment().subtract(7, "days").format(GeneralUtils.DATE_FORMAT_MOMENT)));
    const [endDate, setEndDate] = useState(new Date());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        requestCharts();
    }, [])

    const requestCharts = async () => {
        setLoading(true);
        await estimateTemplateService.getProfitReportDaily({
            startDate: moment(new Date(startDate)).format(GeneralUtils.DATE_FORMAT_MOMENT),
            endDate: moment(new Date(endDate)).format(GeneralUtils.DATE_FORMAT_MOMENT)
        }).then(res => {
            if (res.status == 200) {
                setData(res);
            }
        });

        estimateTemplateService.getProfitReportTotal({
            startDate: moment(new Date(startDate)).format(GeneralUtils.DATE_FORMAT_MOMENT),
            endDate: moment(new Date(endDate)).format(GeneralUtils.DATE_FORMAT_MOMENT)
        }).then(res => {
            if (res.status == 200) {
                setDataBarChart(res);
            }
        });
        setLoading(false);
    }

    const saveForm = () => {
        requestCharts();
    }

    const setData = (res) => {
        let resultMap = new Map();
        let labelMap = new Map();
        let pavingMillingMap = new Map();
        let labelArr = []; //date ler
        let pavingMillingArr = []; // Paving Milling

        res.data.forEach(e => {
            let date = e.date;
            let label = labelMap.get(date);
            if (label === null || label === undefined) {
                labelMap.set(date, date);
                labelArr.push(date);
            }

            let pavingMilling = pavingMillingMap.get(e.name);
            if (pavingMilling === null || pavingMilling === undefined) {
                pavingMillingMap.set(e.name, e.name);
                pavingMillingArr.push(e.name);
            }
        });

        res.data.forEach(e => {
            let name = e.name;
            let date = e.date;

            let data = resultMap.get(date);
            if (data === null || data === undefined) {
                resultMap.set(date, [{name: name, profit: e.sumProfit}]);
            } else {
                data.push({name: name, profit: e.sumProfit});
                resultMap.set(date, data);
            }
        });

        for (const [key, value] of resultMap.entries()) {//ilgili tarihte değeri yoksa 0 yap
            pavingMillingArr.forEach(elem => {
                let a = value.filter(e => e.name === elem);
                if (a.length == 0) {
                    value.push({name: elem, profit: 0})
                    resultMap.set(key, value)
                }
            })
        }

        let chartData = [];
        pavingMillingArr.forEach(elem => {
            let data = [];
            for (const [key, value] of resultMap.entries()) {
                let filtered = value.filter(el => el.name == elem);
                if (filtered.length != 0) {
                    data.push(filtered[0].profit);
                }
            }
            chartData.push({name: elem, data: data})
        })

        setChartData(chartData);
        setXAxis(labelArr);
    }

    const setDataBarChart = (res) => {
        let data = [];
        let labelArr = [];
        res.data.forEach(e => {
            let name = e.name;
            data.push(e.sumProfit);
            labelArr.push(name);
        });

        setChartDataBar([{data: data}]);
        setXAxisBar(labelArr);
    }

    return (
        <form onSubmit={(event) => event.preventDefault()} style={{backgroundColor:'#f3f3fe'}}>
            <div role="main">
                <ul className="form-section page-section">
                    <li className="form-line">
                        <div className="form-input-wide" data-layout="half">
                            <div className="p-fluid grid formgrid" style={{paddingRight: '1em'}}>
                                <label htmlFor="icon">Start Date</label>
                                <Calendar id="icon" value={startDate} onChange={(e) => setStartDate(e.value)}
                                          dateFormat={GeneralUtils.DATE_FORMAT_CALENDAR}
                                          showIcon/>
                            </div>
                        </div>
                        <div className="form-input-wide" data-layout="half">
                            <div className="p-fluid grid formgrid" style={{paddingRight: '1em'}}>
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
                                    style={{float: 'right'}}
                                    onClick={saveForm}
                                    className="p-button-success form-submit-button submit-button jf-form-buttons"
                                    data-component="button" data-content="">
                                Submit
                            </Button>
                        </div>
                    </li>
                    <li className="form-line">
                        <div className="form-input-wide" data-layout="full">
                            <MLineChart chartData={chartData} chartTitle='Paving Milling Profit Report(Daily)'
                                        xAxis={xAxis}/>
                        </div>
                    </li>
                    <li className="form-line">
                        <div className="form-input-wide" data-layout="full">
                            <MBarChart chartData={chartDataBar} chartTitle='Paving Milling Profit Report(Total)'
                                       xAxis={xAxisBar}/>
                        </div>
                    </li>
                </ul>
            </div>
        </form>
    )
}
