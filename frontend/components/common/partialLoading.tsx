'use client'

import React from 'react';
import { Spinner } from '@nextui-org/react';

interface Props {
    color?: 'light' | 'dark'
}

export function PartialLoading({ color }: Props) {
    return (
        <div className="flex items-center justify-center gap-3">
            <Spinner color={`${color === 'light' ? 'white' : 'primary'}`} />
            <span className={`${color === 'light' ? 'text-white' : 'text-blue-500'}`}>PartialLoading...</span>
        </div>
    );
};

export default PartialLoading;
