import { Box, Button, Typography, styled } from '@mui/material';
import { BASE_COLORS } from '@/shared/constants';
import { type getDictionary } from '../../../../get-dictionary';
import { montserrat } from '@/shared/constants';

const StyledHeadingText = styled(Typography)({
  marginTop: '1rem',
  textAlign: 'center',
  fontSize: '2rem',
  fontWeight: '600',
});

function NoFilterResults({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
}) {
  return (
    <Box
      m={'3% auto 10%'}
      maxWidth={'60rem'}
      minHeight={'40vh'}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
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
      <Typography
        variant="h3"
        fontWeight="800"
        fontSize={'3.4rem'}
        mb={'4rem'}
        color={`${BASE_COLORS.DEFAULT_BLUE}`}
        textAlign={'center'}>
        {dictionary.noResultsHeader}
      </Typography>

      <Box
        textAlign={'center'}
        sx={{
          '@media (max-width: 630px)': {
            width: '90%',
          },
        }}>
        <StyledHeadingText className={montserrat.className}>
          {dictionary.noResultsText1}{' '}
        </StyledHeadingText>
        <StyledHeadingText className={montserrat.className}>
          {dictionary.noResultsText2}
        </StyledHeadingText>
      </Box>
    </Box>
  );
}

export default NoFilterResults;
