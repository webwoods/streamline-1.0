'use client'

import React, { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import CreateBlock from './createBlock';
import AddItemsBlock from './addItemsBlock';
import VerifyBlock from './verifyBlock';

const formInputStyles = {
  base: "w-full",
  inputWrapper: "rounded-[0.25rem]"
}

export default function CreateNewRequestForm() {

  const [currentUser, setCurrentUser] = useState("");
  const [activeBlock, setActiveBlock] = useState(2);

  const blocks = [
    <CreateBlock formInputStyles={formInputStyles} user={currentUser} key={0} onNext={() => setActiveBlock(1)} />,
    <AddItemsBlock formInputStyles={formInputStyles} key={1} onNext={() => setActiveBlock(2)} onBack={() => setActiveBlock(0)} />,
    <VerifyBlock key={2} onVerify={() => {}} onBack={() => setActiveBlock(1)} />
  ];

  useEffect(() => {
    const parsedCookie = parseCookies()['currentUser'];
    setCurrentUser(parsedCookie);
    console.log(parsedCookie);
  }, []);

  return (
    <div className='w-full flex flex-col items-center'>
      {blocks[activeBlock]}
    </div>
  );
}