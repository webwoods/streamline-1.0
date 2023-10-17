'use client'

import styles from '@/styles/forms.module.css';
import { TextInput, DateInput, SelectInput, TextAreaInput } from '../inputs';
import { Button } from '@nextui-org/button';
import { useState } from 'react';

interface BlockProps {
  hidden: boolean;
  onClick: () => void;
}

function CreateBlock({ hidden, onClick }: BlockProps) {
  return (
    !hidden ?
    (<div className={styles.block}>
      <h1 className={[styles.title].join(" ")}>Create</h1>
      <h2 className={[styles.title].join(" ")}>New Request</h2>

      <div className={[styles.fieldContainer].join(" ")}>
        <TextInput label='Requested by' />
        <DateInput label='Created date' />
        <DateInput label='Expect response by' />
        <TextInput label='Forward to' />
        <SelectInput label='Request Type' />
        <TextAreaInput label='Remarks' />
      </div>

      <div className={styles.buttonContainer}>
        <Button className={[styles.button].join(" ")}>Cancel</Button>
        <Button className={[styles.button, styles.buttonCta].join(" ")}>Next</Button>
      </div>
    </div>) : 
    (<div className={styles.block}>
        hidden
      </div>)
  );
}

export default function CreateNewRequestForm() {
  const [isCreateOn, setCreateOn] = useState(false);

  const handleBlockClick = () => {
    setCreateOn(!isCreateOn);
  };

  return (
    <div style={{ height: '1000px', width: '100%', backgroundColor: "darkgray" }}>
      <div className={[styles.formArea].join(" ")}>
        <CreateBlock hidden={isCreateOn} onClick={handleBlockClick} />
      </div>
    </div>
  );
}