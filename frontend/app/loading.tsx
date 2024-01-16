'use client'

import React from 'react';
import { Spinner } from '@nextui-org/react';

const Loading: React.FC = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
            <Spinner color="primary" />
            <span style={{ marginLeft: '8px' }}>Loading...</span>
        </div>
    );
};

export default Loading;
