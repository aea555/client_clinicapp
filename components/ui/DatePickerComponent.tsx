import { DatePicker } from "@nextui-org/react";
import { ChangeHandler, RefCallBack } from "react-hook-form";

type DatePickerProps = {
  onChange: ChangeHandler;
  onBlur: ChangeHandler;
  ref: RefCallBack;
  name: string;
};

export default function DatePickerComponent({
  onChange,
  onBlur,
  ref,
  name,
}: DatePickerProps) {
  return (
    <DatePicker
      name={name}
      onChange={(date)=> {
        const value = date ? date.toDate('Europe/Istanbul').toISOString() : '' 
        onChange({ target: { name, value } }); 
      }}
      label="Doğum tarihi"
      onBlur={onBlur}
      ref={ref}
    />
  );
}
