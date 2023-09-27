import React from 'react';
import styles from '@/styles/dounutchart.module.css';
import StatCollection from '../dashboard/statCollection';
import DounutChartandFull from './dounutchartandfull';

const SummaryStatWidget = () => {
    return (
        <div className={styles['chart-container']}>
            <div className={styles['row']}>
                <div className={styles['custom-container']}>
                    <div className={styles['chart-info']}>
                        <div className={styles['text-dounut-chart']}>All Time Requests</div>
                        <div className={styles['text-dounut-chart-subtitle']}>Gas, Lab Euipment and Equipment Maintanance</div>
                        <div className={styles['text-dounut-chart-48']}>331</div>
                    </div>
                    <DounutChartandFull />
                </div>
                <StatCollection />
            </div>
        </div>
    );
};

export default SummaryStatWidget;
