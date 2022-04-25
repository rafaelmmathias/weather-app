import styled from "styled-components";
import { color, layout } from "styled-system";

export const InputContainer = styled.input`
  border-radius: 7px;
  height: 30px;
  border-color: #dbdbdb;
  border-width: 1px;
  border-style: solid;
  font-size: 14px;
  padding-left: 10px;
  padding-right: 10px;
  color: #1b1b1b;
  ${color}
  ${layout}
`;
