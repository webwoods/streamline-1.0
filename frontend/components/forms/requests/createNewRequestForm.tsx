'use client'

import React, { Dispatch, useCallback, useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import CreateBlock from './createBlock';
import AddItemsBlock from './addItemsBlock';
import VerifyBlock from './verifyBlock';
import { formInputStyles } from '../styles';

export default function CreateNewRequestForm() {

  const [currentUser, setCurrentUser] = useState("");
  const [activeBlock, setActiveBlock] = useState(0);
  const [formData, setFormData] = useState<any>();

  const onDataSubmit = useCallback((data: any) => {
    setFormData((prevData: any) => ({
      ...prevData,
      ...data,
    }));
  }, []);

  const blocks = [
    <CreateBlock
      formInputStyles={formInputStyles}
      user={currentUser}
      key={0}
      onNext={() => setActiveBlock(1)}
      onDataSubmit={onDataSubmit}
    />,
    <AddItemsBlock formInputStyles={formInputStyles} key={1} onNext={() => setActiveBlock(2)} onBack={() => setActiveBlock(0)} />,
    <VerifyBlock key={2} onVerify={() => { }} onBack={() => setActiveBlock(1)} />
  ];

  useEffect(() => {
    const parsedCookie = parseCookies()['currentUser'];
    setCurrentUser(parsedCookie);
    // console.log(parsedCookie);
  }, []);

  useEffect(() => { console.log(formData) }, [formData, onDataSubmit]);

  return (
    <div className='w-full flex flex-col items-center'>
      {blocks[activeBlock]}
    </div>
  );
}