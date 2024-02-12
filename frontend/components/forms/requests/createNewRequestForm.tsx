'use client'

import React, { useCallback, useEffect, useState } from 'react';
import CreateBlock from './createBlock';
import AddItemsBlock from './addItemsBlock';
import VerifyBlock from './verifyBlock';
import { formInputStyles } from '../styles';
import { useRouter } from 'next/navigation';

export default function CreateNewRequestForm() {

  const [activeBlock, setActiveBlock] = useState(0);
  const [formData, setFormData] = useState<any>();

  const router = useRouter();

  const onDataSubmit = useCallback((data: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      ...data,
    }));
  }, []);

  useEffect(() => {
    if (formData === null) {
      setActiveBlock(0);
    }
  }, [formData]);

  const blocks = [
    <CreateBlock
      formInputStyles={formInputStyles}
      key={0}
      onNext={() => {
        alert('data successfully saved!');
        setActiveBlock(1);
      }}
      onDataSubmit={onDataSubmit}
      savedData={formData}
    />,
    <AddItemsBlock
      formInputStyles={formInputStyles}
      key={1}
      onNext={() => {
        alert('data successfully saved!');
        setActiveBlock(2);
      }}
      onBack={() => setActiveBlock(0)}
      onDataSubmit={onDataSubmit}
      savedData={formData}
    />,
    <VerifyBlock
      key={2}
      onVerify={() => {
        setFormData(null);
        router.push('/requests');
      }}
      onBack={() => setActiveBlock(1)}
      data={formData}
    />
  ];

  return (
    <div className='w-full flex flex-col items-center'>
      {blocks[activeBlock]}
    </div>
  );
}