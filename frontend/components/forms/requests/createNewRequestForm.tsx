'use client'

import styles from '@/styles/forms.module.css';
import { TextInput, DateInput, SelectInput, TextAreaInput } from '../inputs';
import { Button } from '@nextui-org/button';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

function CreateBlock() {
  const [hidden, setHidden] = useState(false);

  const handleBlockClick = () => {
    setHidden(!hidden);
  }

  const handleCancel = () => { }

  const handleNext = () => {
    setHidden(true);
  }

  return (
    <div className={styles.block}>
      {
        !hidden &&
        <div className={styles.meta} onClick={handleBlockClick}>
          <h1 className={[styles.title].join(" ")}>Create</h1>
          <h2 className={[styles.title].join(" ")}>New Request</h2>
        </div>
      }

      {
        hidden &&
        <div className={[styles.metaHidden, styles.textWithIcon].join(" ")} onClick={handleBlockClick}>
          <h1 className={[styles.title].join(" ")}>Create</h1>
          <FontAwesomeIcon icon={faCircleCheck} />
        </div>
      }

      {
        !hidden &&
        <div>
          <div className={[styles.fieldContainer].join(" ")}>
            <TextInput label='Requested by' />
            <DateInput label='Created date' />
            <DateInput label='Expect response by' />
            <TextInput label='Forward to' />
            <SelectInput label='Request Type' />
            <TextAreaInput label='Remarks' />
          </div>

          <div className={styles.buttonContainer}>
            <Button className={[styles.button].join(" ")} onClick={handleCancel}>Cancel</Button>
            <Button className={[styles.button, styles.buttonCta].join(" ")} onClick={handleNext}>Next</Button>
          </div>
        </div>
      }
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
    <div style={{ height: '1000px', width: '100%', backgroundColor: "darkgray" }}>
      <div className={[styles.formArea].join(" ")}>
        <CreateBlock />
        <AddItemsBlock />
      </div>
    </div>
  );
}