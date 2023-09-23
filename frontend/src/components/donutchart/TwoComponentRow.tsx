import React from 'react';
import styles from './dounutchart.module.css'
import StatCollection from '../dashboard/statCollection';
import DonutChart from './dounutchart';

const TwoComponentRow = () => {
    return (
        <div className={styles['chart-container']}>
            <div className={styles.row}>
                <div className={styles['custom-container']}>
                    <DonutChart />
                </div>
                <StatCollection />
            </div>
        </div>
    );
};

export default TwoComponentRow;
