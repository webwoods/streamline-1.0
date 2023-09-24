import React from 'react';
import styles from './dounutchart.module.css'
import StatCollection from '../dashboard/statCollection';
import DonutChart from './dounutchart';
import DounutChartandFull from './dounutchartandfull';

const TwoComponentRow = () => {
    return (
        <div className={styles['chart-container']}>
            <div className={styles.row}>
                <div className={styles['custom-container']}>
                    <DounutChartandFull />
                </div>
                <StatCollection />
            </div>
        </div>
    );
};

export default TwoComponentRow;
