'use client';

import { Box } from '@mui/material';

import { ContactMainInfo } from './ContactMainInfo';
import GoogleMapBox from './GoogleMapBox';
import { getDictionary } from '../../../../get-dictionary';

export function ContactPage({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
}) {
  return (
    <Box
      m={'3% auto 10%'}
      maxWidth={'60rem'}
      sx={{
        '@media (max-width: 1500px)': {
          m: '3% 20% 10%',
        },
        '@media (max-width: 1111px)': {
          m: '3% 15% 10%',
        },
        '@media (max-width: 960px)': {
          m: '3% 10% 10%',
        },
      }}>
      <ContactMainInfo dictionary={dictionary} />
      <GoogleMapBox dictionary={dictionary} />
    </Box>
  );
}
