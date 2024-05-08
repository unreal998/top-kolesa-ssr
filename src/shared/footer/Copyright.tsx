import { CopyrightOutlined } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { BASE_COLORS } from '../constants';

export function Copyright() {
  return (
    <Typography
      lineHeight="1.7"
      color={BASE_COLORS.DEFAULT_GREY}
      variant="body1"
      textAlign={'start'}>
      Copyright{' '}
      {
        <CopyrightOutlined
          sx={{
            fontSize: '1rem',
            verticalAlign: 'top',
          }}
        />
      }{' '}
      2024 TopKolesa. All Rights Reserved.
    </Typography>
  );
}
