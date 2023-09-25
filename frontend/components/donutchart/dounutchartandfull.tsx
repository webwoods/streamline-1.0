import React from 'react'
import styles from '@/styles/dounutchart.module.css'
import DonutChart from './dounutchart'

function DounutChartandFull() {
    return (
        <div>
            <div className={styles['text-dounut-chart']}>All Time Requests</div>
            <div className={styles['text-dounut-chart-subtitle']}>Gas, Lab Euipment and Equipment Maintanance</div>
            <div className={styles['text-dounut-chart-48']}>331</div>

            <DonutChart />
        </div>

    )
}

export default DounutChartandFull