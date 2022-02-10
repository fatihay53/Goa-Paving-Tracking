import {Box, Card} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import React from "react";

export default function MBarChart({xAxis, chartData, chartTitle}) {
    const options = {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: false,
                }
            },
            dataLabels: {
                enabled: true
            },
            title: {
                text: chartTitle,
                align: 'left'
            },
            xaxis: {
                categories: xAxis
            }
        }

    return (
        <Card>
            <Box sx={{p: 3, pb: 1}} dir="ltr">
                <ReactApexChart type="bar" series={chartData} options={options} height={364}/>
            </Box>
        </Card>
    )
}