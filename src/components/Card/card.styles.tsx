import styled from "styled-components";
import { color, space, layout, flexbox } from "styled-system";
import { Box } from "../Box";

export const CardContainer = styled(Box)`
  background: #ffffff;
  border-radius: 4.5px;
  box-shadow: 0px 0px 3px 2px rgba(0, 0, 0, 0.12);
  padding: 10px;
  margin: 5px;
  ${color}
  ${space}
  ${layout}
  ${flexbox}
`;
