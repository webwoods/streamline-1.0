'use client'

import React, { useEffect } from "react";
import Chart from "chart.js/auto";

function SpendingTrendsChart() {
  useEffect(() => {
    var ctx = document.getElementById('myChart') as HTMLCanvasElement | null | string;
    var existingChart = Chart.getChart(ctx as HTMLCanvasElement);

    if (existingChart) {
      // If a chart instance with this canvas exists, destroy it
      existingChart.destroy();
    }

    if (ctx) {
      var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          datasets: [{
            data: [86, 114, 106, 106, 107, 111, 133],
            label: "Spending",
            borderColor: "rgb(62,149,205)",
            backgroundColor: "rgb(62,149,205,0.1)",
          }]
        },
      });
    }
  }, []);

  return (
    <>
      {/* Filled line chart */}
      <h1 className=" mx-auto mt-10 text-xl font-semibold capitalize ">Spending Trends</h1>
      <div className="w-[1100px] h-screen flex mx-auto my-auto">
        <div className='border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl'>
          <canvas id='myChart'></canvas>
        </div>
      </div>
    </>
  );
}

export default SpendingTrendsChart;
