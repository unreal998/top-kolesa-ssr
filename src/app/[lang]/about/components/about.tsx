'use client';

import { Box, List, ListItem, Stack, Typography, styled } from '@mui/material';
import { BASE_COLORS, montserrat } from '@/shared/constants';
import CheckIcon from '@mui/icons-material/Check';
import { type getDictionary } from '@/get-dictionary';
import { BASE_COLORS } from '@/shared/constants';

const StyledHeadingText = styled(Typography)({
  padding: '4rem 0 1.5rem',
  textAlign: 'center',
  fontSize: '2rem',
  fontWeight: '600',
});

const StyledText = styled(Typography)({
  fontSize: '1.1rem',
});

const StyledListItem = styled(ListItem)({
  fontSize: '1.1rem',
  listStylePosition: 'inside',
});

const WHY_WE_LIST = [
  'whyWeText1',
  'whyWeText2',
  'whyWeText3',
  'whyWeText4',
  'whyWeText5',
  'whyWeText6',
  'whyWeText7',
  'whyWeText8',
  'whyWeText9',
];

function AboutPage({
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
      <Typography
        variant="h2"
        fontWeight="800"
        color={`${BASE_COLORS.DEFAULT_BLUE}`}
        className={montserrat.className}
        textAlign={'center'}>
        {dictionary.aboutLabel}
      </Typography>
      <StyledHeadingText className={montserrat.className}>
        {dictionary.welcomeHeader}
      </StyledHeadingText>
      <StyledText>{dictionary.welcomeText}</StyledText>
      <StyledHeadingText className={montserrat.className}>
        {dictionary.whyWeHeader}
      </StyledHeadingText>
      <List>
        {WHY_WE_LIST.map((item, i) => (
          <StyledListItem key={i}>
            <Stack direction="row" spacing={1}>
              <CheckIcon
                sx={{
                  color: `${BASE_COLORS.DEFAULT_BLUE}`,
                  fontSize: '1.2rem',
                }}
              />
              <Typography>
                {dictionary[item as keyof typeof dictionary]}
              </Typography>
            </Stack>
          </StyledListItem>
        ))}
      </List>
      <StyledHeadingText className={montserrat.className}>
        {dictionary.historyHeader}
      </StyledHeadingText>
      <StyledText>{dictionary.historyText}</StyledText>
      <StyledHeadingText className={montserrat.className}>
        {dictionary.deliveryHeader}
      </StyledHeadingText>
      <StyledText>{dictionary.deliveryText}</StyledText>
      <StyledHeadingText className={montserrat.className}>
        {dictionary.staffHeader}
      </StyledHeadingText>
      <StyledText>{dictionary.staffText}</StyledText>
      <StyledHeadingText className={montserrat.className}>
        {dictionary.productsHeader}
      </StyledHeadingText>
      <StyledText>{dictionary.productsText}</StyledText>
    </Box>
  );
}

export default AboutPage;
