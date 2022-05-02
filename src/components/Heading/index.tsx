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

interface IHeadingContainerProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

type ParagraphProps = IHeadingContainerProps & HeadingContainerProps;

export const Heading: React.FC<ParagraphProps> = ({ children, ...rest }) => {
  return <HeadingContainer {...rest}>{children}</HeadingContainer>;
};
