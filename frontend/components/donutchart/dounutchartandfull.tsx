import React from 'react'
import styles from '@/styles/dounutchart.module.css'
import DonutChart from './dounutchart'

function DounutChartandFull() {
    return (
        <div className={styles['chart-outer-container']}>
            <DonutChart />
        </div>
    )
}

export default DounutChartandFull