'use client'

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

interface Props {
    color?: 'light' | 'dark'
}

export function PartialError({color}: Props) {
    return (
        <div className="flex items-center gap-3">
            <FontAwesomeIcon className={`${color === 'light' ? 'text-white' : 'text-blue-500'}`} icon={faTriangleExclamation} />
            <span className={`${color === 'light' ? 'text-white' : 'text-blue-500'}`}>Oops! An error occurred while fetching data</span>
        </div>
    );
};

export default PartialError;
