import React from "react";
import { LayoutProps } from "styled-system";
import { SelectContainer } from "./select.styles";

interface SelectStyledProps extends LayoutProps {}

interface SelectOption extends React.OptionHTMLAttributes<HTMLOptionElement> {
  value: string;
  label: string;
}
export interface SelectOptions extends Array<SelectOption> {}

interface ISelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  items: SelectOptions;
}

type SelectProps = ISelectProps & SelectStyledProps;

export const Select: React.FC<SelectProps> = ({ items, ...rest }) => {
  return (
    <SelectContainer {...rest}>
      {items.map(({ label, value, ...itemPropsRest }, index) => (
        <option {...itemPropsRest} value={value} key={`${rest.id}-${index}`}>
          {label}
        </option>
      ))}
    </SelectContainer>
  );
};
