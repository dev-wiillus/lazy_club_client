import React from "react";
import { ControllerRenderProps, UseFormSetValue } from "react-hook-form";

type CheckboxGroupProps = {
  label: string;
  items: {
    value: string;
    label: string;
    defaultChecked?: boolean;
  }[];
  formSetValue?: UseFormSetValue<any>;
  formFieldProps?: ControllerRenderProps;
};

// TODO: list로 value를 저장할 수 있도록 하려면? 선택된 checkbox의 value들로
// TODO: checkbox -> checktag
export default function CheckboxGroup({
  label,
  items,
  formSetValue,
  ...formFieldProps
}: CheckboxGroupProps) {
  return (
    <div className="w-full space-y-2">
      <input hidden />
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <div className="pl-2">
        {items.map((item) => (
          <div className="form-control" key={item.value}>
            <label className="label cursor-pointer">
              <span className="label-text font-normal">{item.label}</span>
              <input
                type="checkbox"
                className="checkbox"
                defaultChecked={item.defaultChecked}
                value={item.value}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
