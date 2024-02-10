import React from 'react';
import StatCollection from '../dashboard/statCollection';

const SummaryStatWidget = () => {
    return (
        <div className="py-10 px-10 grid grid-cols-1 sm:grid-cols-2 gap-4 drop-shadow-md">
            <div className='w-full bg-gradient-to-r from-white to-cyan-50 rounded-xl p-5'>
                <div>
                    <p className='font-semibold'>All Time Requests</p>
                    <p className='text-xs text-slate-500'>Gas, Lab Euipment and Equipment Maintanance</p>
                    <p className='text-3xl font-semibold py-2'>331</p>
                </div>
            </div>
            <div className='w-full'>
                <StatCollection />
            </div>
        </div>
    );
};

export default SummaryStatWidget;
