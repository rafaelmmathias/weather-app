import React from "react";
import { Heading } from "../";
import { Box } from "../";
import { Card, CardProps } from "../Card";
import { Paragraph } from "../Typography";

interface ErrorInlineProps {
  title?: string;
  message: string;
  containerProps?: CardProps;
}

export const ErrorInline: React.FC<ErrorInlineProps> = ({
  title,
  message,
  containerProps,
  ...rest
}) => {
  return (
    <Box {...rest}>
      <Card padding={10} backgroundColor={"#FF4D4D"} {...containerProps}>
        {title && (
          <Box mb={10}>
            <Heading>{title}</Heading>
          </Box>
        )}
        <Box>
          <Paragraph color="#fff">{message}</Paragraph>
        </Box>
      </Card>
    </Box>
  );
};
