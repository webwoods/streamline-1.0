'use client'

import styles from '@/styles/forms.module.css';
import { TextInput, DateInput, SelectInput, TextAreaInput } from '../inputs';
import { Button } from '@nextui-org/button';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { Input, Select, SelectItem, Textarea } from '@nextui-org/react';

function CreateBlock() {
  const [hidden, setHidden] = useState(false);

  const handleBlockClick = () => {
    setHidden(!hidden);
  }

  const handleCancel = () => { }

  const handleNext = () => {
    setHidden(true);
  }

  const formInputStyles = {
    base: "w-full",
    inputWrapper: "rounded-[0.25rem]"
  }

  return (
    <div className='w-96 max-w-3xl py-10'>
      <div className="flex items-center justify-center flex-col">
        <h1 className="leading-5 font-semibold text-lg">Create</h1>
        <h2 className="text-slate-400 text-sm">New Request</h2>
      </div>

      <div className='flex flex-col items-center pt-10 gap-3'>
        <Input
          label="Requested by"
          labelPlacement='outside'
          placeholder='Enter Id'
          radius='none'
          classNames={{ ...formInputStyles }} />
        <Input
          type='date'
          label="Created date"
          labelPlacement='outside'
          placeholder='Select date'
          radius='none'
          classNames={{ ...formInputStyles }} />
        <Input
          type='date'
          label="Expect response by"
          labelPlacement='outside'
          placeholder='Select date'
          radius='none'
          classNames={{ ...formInputStyles }} />
        <Select
          radius='none'
          label="Type"
          labelPlacement='outside'
          placeholder='Select Request Type'
          classNames={{
            trigger: "rounded-[0.25rem]",
            popover: "rounded-sm",
          }}
          listboxProps={{
            itemClasses: {
              base: "rounded-[0.25rem]"
            }
          }}
        >
          <SelectItem key="Gas">Gas</SelectItem>
          <SelectItem key="Lab equipment">Lab equipment</SelectItem>
        </Select>
        <Textarea
          label="Remarks"
          labelPlacement='outside'
          radius='none'
          classNames={{
            inputWrapper: "rounded-[0.25rem]"
          }}
        />

        <div className='w-full flex gap-3 pt-5'>
          <Button className='w-full rounded-[0.25rem] bg-slate-200 hover:bg-slate-300'>Cancel</Button>
          <Button className='w-full rounded-[0.25rem] text-slate-50 bg-slate-800 hover:text-accent-yellow hover:bg-slate-700'>Next</Button>
        </div>

      </div>
    </div>
  );
}

function AddItemsBlock() {
  const [hidden, setHidden] = useState(true);
  const [requestId, setRequestId] = useState('GR221');

  const handleBlockClick = () => {
    setHidden(!hidden);
  }

  const handleCancel = () => { }

  const handleVerify = () => {
    setHidden(true);
  }

  return (
    <div className={styles.block}>
      {
        !hidden &&
        <div className={styles.meta} onClick={handleBlockClick}>
          <h1 className={[styles.title].join(" ")}>Add items</h1>
          <h2 className={[styles.title].join(" ")}>{requestId}</h2>
        </div>
      }

      {
        hidden &&
        <div className={[styles.metaHidden, styles.textWithIcon].join(" ")} onClick={handleBlockClick}>
          <h1 className={[styles.title].join(" ")}>Add items</h1>
          <FontAwesomeIcon icon={faCircleCheck} />
        </div>
      }

      {
        !hidden &&
        <div>
          <div className={[styles.fieldContainer].join(" ")}>
            <TextInput label='Search item' />
          </div>

          <div className={styles.buttonContainer}>
            <Button className={[styles.button].join(" ")} onClick={handleCancel}>Cancel</Button>
            <Button className={[styles.button, styles.buttonCta].join(" ")} onClick={handleVerify}>Verify</Button>
          </div>
        </div>
      }
    </div>
  );
}

export default function CreateNewRequestForm() {

  return (
    <div className='w-full flex flex-col items-center'>
      <CreateBlock />
    </div>
  );
}