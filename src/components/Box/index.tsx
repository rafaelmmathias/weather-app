import React from "react";
import {
  BackgroundColorProps,
  BackgroundImageProps,
  BackgroundSizeProps,
  BorderProps,
  ColorProps,
  FlexboxProps,
  GridProps,
  LayoutProps,
  PositionProps,
  SpaceProps,
} from "styled-system";
import { BoxContainer } from "./box.styles";

interface BoxStyledProps
  extends ColorProps,
    SpaceProps,
    BorderProps,
    PositionProps,
    FlexboxProps,
    LayoutProps,
    GridProps,
    BackgroundImageProps,
    BackgroundSizeProps,
    BackgroundColorProps {}

interface IBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

type BoxProps = IBoxProps & BoxStyledProps;

export const Box: React.FC<BoxProps> = ({ children, ...rest }) => {
  return <BoxContainer {...rest}>{children}</BoxContainer>;
};
