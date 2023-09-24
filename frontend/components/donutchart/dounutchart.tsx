'use client'


import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import { styled } from '@mui/material';
import styles from './dounutchart.module.css'

Chart.register(ArcElement);

function DonutChart() {
  const data = {

    labels: [
      'section 1', 'section 2', 'section 3'
    ],

    datasets: [
      {
        label: 'dounts',
        data: [45, 34, 45],
        backgroundColor: ['#93E409', '#197DFD', '#253232'],
      },
    ],
  };

  const options = {
    // maintainAspectRatio: false,
    circumference: 180,
    rotation: -90,
  };

  return (
    <div className={styles['chart-donut']}>
      <Doughnut options={options} data={data} />
    </div>
  );
}

export default DonutChart;
