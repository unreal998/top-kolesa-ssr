'use client';

import { Box, Grid, Link, Typography, styled } from '@mui/material';
import { BASE_COLORS } from '../../../../shared/constants';

import PhoneIcon from '@mui/icons-material/Phone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { contactPhones } from '../../../../shared/constants';
import { getDictionary } from '../../../../get-dictionary';

const StyledHeadingText = styled(Typography)({
  textAlign: 'center',
  fontSize: '1.2rem',
  fontWeight: '600',
  paddingLeft: '0.5rem',
});

const StyledText = styled(Typography)({
  fontSize: '1rem',
});

/* test */

export function ContactMainInfo({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
}) {
  return (
    <>
      <Typography
        variant="h2"
        fontWeight="800"
        color={`${BASE_COLORS.DEFAULT_BLUE}`}
        textAlign={'center'}>
        {dictionary.contactLabel}
      </Typography>
      <Box display={'flex'} flexDirection={'column'} gap={5}>
        <StyledText pt={'4rem'} pb={'2rem'}>
          {dictionary.contactText}
        </StyledText>
        <Box>
          <Grid
            container
            gap={3}
            justifyContent={'center'}
            sx={{
              '@media (max-width: 690px)': {
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              },
            }}>
            <Grid
              item
              bgcolor={BASE_COLORS.BACKGROUND_WHITE}
              height={'13rem'}
              borderRadius={2}
              width={'45%'}
              sx={{
                '@media (max-width: 1700px)': {
                  height: '14rem',
                },
                '@media (max-width: 690px)': {
                  width: '90%',
                },
                '@media (max-width: 340px)': {
                  height: '17rem',
                },
              }}>
              <Box display={'flex'} flexDirection={'column'} m={3}>
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  <PhoneIcon sx={{ color: BASE_COLORS.DEFAULT_BLUE }} />
                  <StyledHeadingText>{dictionary.contactUs}</StyledHeadingText>
                </Box>
                <Box display={'flex'} flexDirection={'column'} p={2}>
                  {contactPhones.map((item, i) => (
                    <Box
                      key={i}
                      display={'flex'}
                      justifyContent={'space-between'}
                      sx={{
                        '@media (max-width: 830px)': {
                          justifyContent: 'center',
                        },
                      }}>
                      <StyledText
                        sx={{
                          '@media (max-width: 830px)': {
                            display: 'none',
                          },
                        }}>
                        {item.operator}
                      </StyledText>
                      <StyledText>
                        <Link
                          href={item.link}
                          color="inherit"
                          style={{ textDecoration: 'none' }}>
                          {item.phone}
                        </Link>
                      </StyledText>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              bgcolor={BASE_COLORS.BACKGROUND_WHITE}
              height={'13rem'}
              borderRadius={2}
              width={'45%'}
              sx={{
                '@media (max-width: 1700px)': {
                  height: '14rem',
                },
                '@media (max-width: 690px)': {
                  width: '90%',
                },
                '@media (max-width: 340px)': {
                  height: '17rem',
                },
              }}>
              <Box display={'flex'} flexDirection={'column'} m={3}>
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  <AlternateEmailIcon
                    sx={{ color: BASE_COLORS.DEFAULT_BLUE }}
                  />
                  <StyledHeadingText>{dictionary.ourMail}</StyledHeadingText>
                </Box>
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  p={2}
                  sx={{
                    '@media (max-width: 830px)': {
                      justifyContent: 'center',
                    },
                  }}>
                  <StyledText
                    sx={{
                      '@media (max-width: 830px)': {
                        display: 'none',
                      },
                    }}>
                    E-mail
                  </StyledText>
                  <StyledText>topkolesa@gmail.com</StyledText>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              width={'45%'}
              bgcolor={BASE_COLORS.BACKGROUND_WHITE}
              height={'13rem'}
              sx={{
                '@media (max-width: 1700px)': {
                  height: '14rem',
                },
                '@media (max-width: 690px)': {
                  width: '90%',
                },
                '@media (max-width: 340px)': {
                  height: '17rem',
                },
              }}
              borderRadius={2}>
              <Box display={'flex'} flexDirection={'column'} m={3}>
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  <CalendarMonthIcon sx={{ color: BASE_COLORS.DEFAULT_BLUE }} />
                  <StyledHeadingText>
                    {dictionary.openingHours}
                  </StyledHeadingText>
                </Box>
                <Box display={'flex'} flexDirection={'column'} p={2}>
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    sx={{
                      '@media (max-width: 690px)': {
                        width: '15rem',
                        margin: '0 auto',
                      },
                    }}>
                    <StyledText>{dictionary.workDays}:</StyledText>
                    <StyledText>9:00 - 18:00</StyledText>
                  </Box>
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    sx={{
                      '@media (max-width: 690px)': {
                        width: '15rem',
                        margin: '0 auto',
                      },
                    }}>
                    <StyledText>{dictionary.st}:</StyledText>
                    <StyledText>9:00 - 16:00</StyledText>
                  </Box>
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    sx={{
                      '@media (max-width: 690px)': {
                        width: '15rem',
                        margin: '0 auto',
                      },
                    }}>
                    <StyledText>{dictionary.su}:</StyledText>
                    <StyledText>{dictionary.closed}</StyledText>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              width={'45%'}
              bgcolor={BASE_COLORS.BACKGROUND_WHITE}
              height={'13rem'}
              borderRadius={2}
              sx={{
                '@media (max-width: 1700px)': {
                  height: '14rem',
                },
                '@media (max-width: 690px)': {
                  width: '90%',
                },
                '@media (max-width: 340px)': {
                  height: '17rem',
                },
              }}>
              <Box display={'flex'} flexDirection={'column'} m={3}>
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}>
                  <LocalShippingIcon sx={{ color: BASE_COLORS.DEFAULT_BLUE }} />
                  <StyledHeadingText>{dictionary.delivery}</StyledHeadingText>
                </Box>
                <Box display={'flex'} flexDirection={'column'} p={2}>
                  <Box display={'flex'} flexDirection={'column'} gap={2}>
                    <StyledText>{dictionary.deliveryShort1}</StyledText>
                    <StyledText>{dictionary.deliveryShort2}</StyledText>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
