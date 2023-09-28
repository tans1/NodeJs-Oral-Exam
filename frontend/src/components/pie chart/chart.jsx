import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart() {
  const points = useSelector(state => state.result).Points;
  const data = {
    labels: ["Success", "Failure"],
    datasets: [
      {
        label: " :",
        data: [points, 100-points],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)"
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)"
        ],
        borderWidth: 1
      }
    ]
  };
  return (
    <div className="w-[400px]">
      <Pie data={data} />
    </div>
  );
}

export default PieChart;
