import React from "react";
import { ColorProps, TypographyProps, LetterSpacingProps } from "styled-system";

import { SpanContainer } from "./span.styles";

interface ISpanProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

type SpanProps = ISpanProps & ColorProps & TypographyProps & LetterSpacingProps;

export const Span: React.FC<SpanProps> = ({ children, ...rest }) => {
  return (
    <SpanContainer {...rest}>
      {children}
    </SpanContainer>
  );
};
