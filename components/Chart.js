"use client";

import { useState, useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from "chart.js";
import { getRandomColor } from "./helper/Counter";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function DoughnutChart({ expenses, months, selectedMonth, setSelectedMonth }) {

  const chartData = useMemo(() => {
    const grouped = {};
    expenses.forEach((exp) => {
      grouped[exp.Categories.name] = (grouped[exp.Categories.name] || 0) + exp.price;
    });

    return {
      labels: Object.keys(grouped),
      datasets: [
        {
          label: "Expenses",
          data: Object.values(grouped),
          backgroundColor: Object.keys(grouped).map(() => getRandomColor()),
          borderWidth: 1,
        },
      ],
    };
  }, [expenses]);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
      <div className="mb-4">
        <select
          className="p-2 border rounded-md shadow-sm"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {chartData.labels.length > 0 ? (
        <Doughnut
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: `Expenses for ${selectedMonth}`,
              },
              legend: {
                position: "bottom",
              },
            },
          }}
        />
      ) : (
        <p className="text-gray-500 text-center">No expenses for {selectedMonth}</p>
      )}
    </div>
  );
}
