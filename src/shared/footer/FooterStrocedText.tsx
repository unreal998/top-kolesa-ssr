import { Box, Stack } from '@mui/material';
import { ReactNode } from 'react';
import { BASE_COLORS } from '../constants';

type FooterStrocedTextProps = {
  text: ReactNode;
};

export function FooterStrocedText(props: FooterStrocedTextProps) {
  return (
    <Stack justifyContent="flex-start">
      {props.text}
      <Stack paddingTop="16px" direction="row" alignItems="center" gap="5px">
        <Box bgcolor={BASE_COLORS.DEFAULT_BLUE} width="40px" height="2px" />
        <Box bgcolor={BASE_COLORS.DEFAULT_BLUE} width="5px" height="2px" />
      </Stack>
    </Stack>
  );
}
