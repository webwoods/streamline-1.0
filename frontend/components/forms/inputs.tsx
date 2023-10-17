import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import styles from '@/styles/forms.module.css';

interface TextInputProps {
  label: string
}

export function TextInput({ label }: TextInputProps) {
  return (
    <div className={[styles.input].join("")}>
      <label>{label}</label>
      <Input type="text" className={[styles.labelspace].join(" ")}></Input>
    </div>
  );
}

export function TextAreaInput({ label }: TextInputProps) {
  return (
    <div className={[styles.input].join("")}>
      <label>{label}</label>
      <Textarea className={[styles.labelspace].join(" ")}></Textarea>
    </div>
  );
}

export function SelectInput({ label }: TextInputProps) {
  return (
    <div className={[styles.input].join("")}>
      <label>{label}</label>
      <Select className={[styles.labelspace].join(" ")}>
      {/* {(requestType) => <SelectItem key={requestType.value}>{requestType.label}</SelectItem>} */}
      <SelectItem key="Gas">Gas</SelectItem>
      <SelectItem key="Lab equipment">Lab equipment</SelectItem>
      </Select>
    </div>
  );
}

export function DateInput({ label }: TextInputProps) {
  return (
    <div className={[styles.input].join("")}>
      <label>{label}</label>
      <Input type='date' className={[styles.labelspace].join(" ")}></Input>
    </div>
  );
}