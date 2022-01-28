import {BaseOptionChart} from "../../components/charts";
import {Box, Card, CardHeader} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import {merge} from 'lodash';
import {fNumber} from "../../utils/formatNumber";

const CHART_DATA = [
    {   name: 'Gelir',
        type: 'column',
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
    },
    {   name: 'Gider',
        type: 'column',
        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
    }
    ];

export default function BarChartEx() {
    const chartOptions = merge(BaseOptionChart(), {
        tooltip: {
            marker: {show: false},
            y: {
                formatter: (seriesName) => fNumber(seriesName),
                title: {
                    formatter: (seriesName) => `#${seriesName}`
                }
            }
        },
        plotOptions: {
            bar: {horizontal: false, barHeight: '28%', borderRadius: 2}
        },
        labels: [
            '01/01/2003',
            '02/01/2003',
            '03/01/2003',
            '04/01/2003',
            '05/01/2003',
            '06/01/2003',
            '07/01/2003',
            '08/01/2003',
            '09/01/2003',
            '10/01/2003',
            '11/01/2003'
        ],
        //xaxis: { type: 'datetime' },

    });

    return (
        <Card>
            <CardHeader title="Conversion Rates" subheader="(+43%) than last year"/>
            <Box sx={{mx: 3}} dir="ltr">
                <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} height={364}/>
            </Box>
        </Card>
    );
}