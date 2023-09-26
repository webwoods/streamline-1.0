import React from 'react'
import styles from '@/styles/dounutchart.module.css'
import DonutChart from './dounutchart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

function DounutChartandFull() {
    return (
        <div>
            <div className={styles['row-chart-icon']}>
                <div >
                    <div className={styles['text-dounut-chart']}>All Time Requests</div>
                    <div className={styles['text-dounut-chart-subtitle']}>Gas, Lab Euipment and Equipment Maintanance</div>
                    <div className={styles['text-dounut-chart-48']}>331</div>
                </div>
                <div className={styles['icon-pacement']}>
                    <FontAwesomeIcon icon={faInfoCircle} className={styles["info-icon"]} />
                </div>
            </div>

            <div className={styles['chart-outer-container']}>
                <DonutChart />
            </div>
        </div>

    )
}

export default DounutChartandFull