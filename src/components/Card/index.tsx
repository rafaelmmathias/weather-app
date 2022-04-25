import React from "react";
import {
  BackgroundColorProps,
  FlexboxProps,
  LayoutProps,
  SpaceProps,
} from "styled-system";
import { CardContainer } from "./card.styles";

export interface CardProps
  extends BackgroundColorProps,
    SpaceProps,
    LayoutProps,
    FlexboxProps {
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, ...rest }) => {
  return <CardContainer {...rest}>{children}</CardContainer>;
};
