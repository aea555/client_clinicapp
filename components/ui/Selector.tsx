import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { ChangeHandler, RefCallBack } from "react-hook-form";
import { KeyValuePair } from "types/RoleKeyValuePairs.type";

type RoleSelectorProps = {
  onChange: ChangeHandler;
  onBlur: ChangeHandler;
  ref: RefCallBack;
  name: string;
  label: string;
  keyValuePairs: KeyValuePair[];
};

export default function Selector({
  onChange,
  onBlur,
  ref,
  name,
  label,
  keyValuePairs,
}: RoleSelectorProps) {
  console.log(keyValuePairs)
  return (
    <div className="flex w-full flex-1 flex-wrap gap-4 md:flex-nowrap">
      <Select
        name={name}
        onChange={(event) => {
          const value = event.target.value;
          onChange({ target: { name, value } });
        }}
        onBlur={onBlur}
        ref={ref}
        label={label}
        className="max-w-xs"
      >
        <>
          {keyValuePairs.map((v) => {
            return <SelectItem key={v.key}>{v.label}</SelectItem>;
          })}
        </>
      </Select>
    </div>
  );
}
