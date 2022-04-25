import React from "react";
import { BackgroundColorProps, LayoutProps, SpaceProps } from "styled-system";
import { CardContainer } from "./card.styles";

export interface CardProps
  extends BackgroundColorProps,
    SpaceProps,
    LayoutProps {
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, ...rest }) => {
  return <CardContainer {...rest}>{children}</CardContainer>;
};
