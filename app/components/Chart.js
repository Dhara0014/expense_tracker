
"use client";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";
import { getData, getRandomColor } from "./helper/Counter";

ChartJS.register(ArcElement, Tooltip, Legend, Title);


const DoughnutChart = ({dataList}) => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
      const list = dataList || [];
      const labels = [...new Set(list.filter(itm => itm.type === "EXPENSE").map(itm => itm.selectedCategory?.name))];

      const dataValues = getData(list);
      const colors = labels.map(() => getRandomColor());

      setChartData({
        labels,
        datasets: [
          {
            data: dataValues,
            backgroundColor: colors,
            borderColor: "#fff",
            borderWidth: 3,
          },
        ],
      });
    }, [dataList]);
  
    if (!chartData) return null; 
    const options = {
      responsive: true,
      
      plugins: {        
        
        legend: {
          position: "bottom",          
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem) => ` ${tooltipItem.raw} (₹)`,
          },
        },
      },
    };

  
    return (
      <div className="w-100 h-100 mx-auto">
        <Doughnut data={chartData} options={options}  />
      </div>
    );
  };
  
  export default DoughnutChart;
  