import React from 'react';
import StatCollection from '../dashboard/statCollection';
import DounutChartandFull from './dounutchartandfull';

const SummaryStatWidget = () => {
    return (
        <div className="max-w-screen-lg mx-auto pb-5 px-6 grid grid-cols-1 sm:grid-cols-2 gap-4 drop-shadow-md">
            <div className='w-full bg-gradient-to-r from-white to-cyan-50 rounded-xl p-5'>
                <div>
                    <p className='font-semibold'>All Time Requests</p>
                    <p className='text-xs text-slate-500'>Gas, Lab Euipment and Equipment Maintanance</p>
                    <p className='text-3xl font-semibold py-2'>331</p>
                </div>
                {/* <DounutChartandFull /> */}
            </div>
            <div className='w-full'>
                <StatCollection />
            </div>
        </div>
    );
};

export default SummaryStatWidget;
