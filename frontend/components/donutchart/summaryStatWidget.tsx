import React from 'react';
import styles from '@/styles/dounutchart.module.css';
import StatCollection from '../dashboard/statCollection';
import DounutChartandFull from './dounutchartandfull';

const SummaryStatWidget = () => {
    return (
        <div className={styles['chart-container']}>
            <div className={styles['row']}>
                <div className={styles['custom-container']}>
                    <DounutChartandFull />
                </div>
                <StatCollection />
            </div>
        </div>
    );
};

export default SummaryStatWidget;
