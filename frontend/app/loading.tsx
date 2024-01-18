'use client'
import React from 'react';
import { Spinner } from '@nextui-org/react';

const Loading: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <Spinner color="primary" />
            <span className="ml-2">Loading...</span>
        </div>
    );
};

export default Loading;
