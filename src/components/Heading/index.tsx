import React from "react";
import { ColorStyleProps, SpaceProps, TypographyProps } from "styled-system";
import { HeadingContainer } from "./heading.styles";

interface HeadingContainerProps
  extends ColorStyleProps,
    SpaceProps,
    ColorStyleProps,
    TypographyProps {
  children: React.ReactNode;
}

export const Heading: React.FC<HeadingContainerProps> = ({
  children,
  ...rest
}) => {
  return <HeadingContainer {...rest}>{children}</HeadingContainer>;
};
