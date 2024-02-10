'use client'

import React from 'react';
import { Spinner } from '@nextui-org/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

const Error: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <FontAwesomeIcon icon={faTriangleExclamation} />
            <span className="ml-2">Oops! An error occurred while fetching data</span>
        </div>
    );
};

export default Error;
