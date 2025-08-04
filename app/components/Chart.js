import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";
import { getLocalStorage } from "./helper/Local";
import { getData } from "./helper/Counter";

ChartJS.register(ArcElement, Tooltip, Legend, Title);


const DoughnutChart = () => {
      
    const labels = [...new Set(getLocalStorage("list")?.filter(itm => itm?.type == "EXPENCE")?.map(itm => itm?.selectedCategory.name))];
    const dataValues =  getData(getLocalStorage("list"));
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Milk Consumption",
          data: dataValues,
          backgroundColor: [
            "#4ade80", // green
            "#60a5fa", // blue
            "#fbbf24", // yellow
            "#f87171", // red
            "#a78bfa", // purple
          ],
          borderColor: "#fff",
          borderWidth: 3,
        },
      ],
    };
  
    const options = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Expenses Structure",
          color: "#111",
      font: {
        size: 18,
        weight: "bold",
      },
      padding: {  
        top: 10,
        bottom: -12,
        
      },
        },
        legend: {
          position: "right",
        },
        tooltip: {
          callbacks: {
            label: (tooltipItem) => `${tooltipItem.raw} Rupees`,
          },
        },
      },
    };
  
    return (
      <div className="w-100 h-100 mx-auto">
        <Doughnut data={data} options={options}  />
      </div>
    );
  };
  
  export default DoughnutChart;
  