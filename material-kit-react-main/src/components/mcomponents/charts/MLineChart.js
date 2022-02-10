import {Box, Card} from "@mui/material";
import ReactApexChart from "react-apexcharts";
import React from "react";

export default function MLineChart({xAxis, chartData, chartTitle}) {
    const options = {
        chart: {
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 1.8,
        },
        title: {
            text: chartTitle,
            align: 'left'
        },
        grid: {
            row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
            },
        },
        xaxis: {
            categories: xAxis
        }
    }

    return (
        <Card>
            <Box sx={{p: 3, pb: 1}} dir="ltr">
                <ReactApexChart type="line" series={chartData} options={options} height={364}/>
            </Box>
        </Card>
    )
}