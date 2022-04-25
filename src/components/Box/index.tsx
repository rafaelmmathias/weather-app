import React from "react";
import {
  BorderProps,
  ColorStyleProps,
  FlexboxProps,
  GridProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
} from "styled-system";
import { BoxContainer } from "./box.styles";

interface BoxProps
  extends ColorStyleProps,
    SpaceProps,
    BorderProps,
    PositionProps,
    FlexboxProps,
    LayoutProps,
    GridProps {
  children: React.ReactNode;
}

export const Box: React.FC<BoxProps> = ({ children, ...rest }) => {
  return <BoxContainer {...rest}>{children}</BoxContainer>;
};
