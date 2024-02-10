'use client'

import React, { useEffect, useState } from 'react';
import StatCollection from '../dashboard/statCollection';
import { REQUESTS_QUERY } from '@/gql/query';
import client from '@/gql/client';
import { useLazyQuery } from '@apollo/client';
import PartialLoading from '../common/partialLoading';
import PartialError from '../common/partialError';

const SummaryStatWidget = () => {
    const [getRequests, { loading, error, data }] = useLazyQuery(REQUESTS_QUERY, { client });
    const [count, setCount] = useState(0);

    useEffect(() => {
        getRequests({
            variables: {
                page: 1,
                pageSize: 1,
                requestType: 'REQUEST'
            }
        });
    }, []);

    useEffect(() => {
        data ? setCount(data?.getRequestsWithUser?.totalItems) : setCount(0);
    }, [data]);

    return (
        <div className="py-10 px-10 grid grid-cols-1 sm:grid-cols-2 gap-4 drop-shadow-md max-w-screen-lg">
            {loading ? (
                <div className='flex justify-center w-full col-span-2'>
                    <PartialLoading color="light" />
                </div>
            ) : (
                error ? (
                    <div className='flex justify-center w-full col-span-2'>
                        <PartialError color='light' />
                    </div>
                ) : (
                    <>
                        <div className='w-full bg-gradient-to-r from-white to-cyan-50 rounded-xl p-5'>
                            <div>
                                <p className='font-semibold'>All Time Requests</p>
                                <p className='text-xs text-slate-500'>Gas, Lab Euipment and Equipment Maintanance</p>
                                <p className='text-3xl font-semibold py-2'>{count}</p>
                            </div>
                        </div>
                        <div className='w-full'>
                            <StatCollection />
                        </div>
                    </>
                )
            )}
        </div>
    );
};

export default SummaryStatWidget;
