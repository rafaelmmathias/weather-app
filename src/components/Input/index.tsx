import React, { InputHTMLAttributes } from "react";
import { InputContainer } from "./input.styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = (props) => {
  return <InputContainer {...props} />;
};
