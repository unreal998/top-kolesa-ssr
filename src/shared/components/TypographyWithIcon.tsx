import { Stack } from '@mui/material';
import { ReactNode } from 'react';

type TypographyWithIconProps = {
  typography: ReactNode;
  icon: ReactNode;
};

export function TypographyWithIcon(props: TypographyWithIconProps) {
  return (
    <Stack display="flex" flexDirection="row" gap="10px" alignItems="center">
      {props.icon}
      {props.typography}
    </Stack>
  );
}
