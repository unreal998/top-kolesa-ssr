import { Box, Stack } from '@mui/material';
import { ReactNode } from 'react';

type ButtonWithIconProps = {
  button: ReactNode;
  icon: ReactNode;
};

export function ButtonWithIcon(props: ButtonWithIconProps) {
  return (
    <Stack direction="row" alignItems="center">
      {props.button}
      <Box
        bgcolor="#fff"
        borderRadius="9999px"
        padding="5px"
        marginLeft="-15px"
        zIndex="9">
        {props.icon}
      </Box>
    </Stack>
  );
}
