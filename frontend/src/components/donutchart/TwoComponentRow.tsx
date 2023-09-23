import React from 'react';
import styles from './dounutchart.module.css'
import StatCollection from '../dashboard/statCollection';
import DonutChart from './dounutchart';

const TwoComponentRow = () => {
    return (
        <div className={styles.row}>
            <DonutChart />
            <StatCollection />
        </div>
    );
};

export default TwoComponentRow;
