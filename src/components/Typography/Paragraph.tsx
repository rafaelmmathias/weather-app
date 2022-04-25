import React from "react";
import { ColorProps, TypographyProps } from "styled-system";

import { ParagraphContainer } from "./paragraph.styles";

interface IParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

type ParagraphProps = IParagraphProps & ColorProps & TypographyProps;

export const Paragraph: React.FC<ParagraphProps> = ({ children, ...rest }) => {
  return (
    <ParagraphContainer {...rest}>
      {children}
    </ParagraphContainer>
  );
};
