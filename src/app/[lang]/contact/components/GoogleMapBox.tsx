'use client';

import { Wrapper } from '@googlemaps/react-wrapper';
import { GoogleMaps } from './GoogleMaps';
import { Box, Grid, Typography, styled } from '@mui/material';
import { useState } from 'react';
import { BASE_COLORS, montserrat } from '@/shared/constants';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { GOOGLE_MAP_KEY } from '@/shared/keys';
import { getDictionary } from '@/get-dictionary';


const StyledHeadingText = styled(Typography)({
  textAlign: 'start',
  fontSize: '1.2rem',
  fontWeight: '600',
});

const StyledSubHeading = styled(Typography)({
  textAlign: 'start',
  fontSize: '1rem',
  fontWeight: '600',
});
const StyledText = styled(Typography)({
  textAlign: 'start',
  fontSize: '1rem',
});

function GoogleMapBox({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
}) {
  const [address1, setAddress1] = useState<boolean>(true);

  return (
    <Box
      id="googleMapBox"
      sx={{
        '@media (max-width: 800px)': {
          width: '90%',
          margin: '0 auto',
        },
      }}>
      <Box
        display={'flex'}
        pt={10}
        width={'85%'}
        alignItems={'center'}
        justifyContent={'center'}
        m={'0 auto'}>
        <MapsHomeWorkIcon
          sx={{ color: BASE_COLORS.DEFAULT_BLUE }}
          fontSize="large"
        />
        <Typography
          className={montserrat.className}
          variant="h4"
          fontWeight="600"
          ml={1}>
          {dictionary.ourStores}
        </Typography>
      </Box>
      <Box
        display={'flex'}
        justifyContent={'center'}
        pt={3}
        m={'0 auto'}
        width={'100%'}
        sx={{
          '@media (max-width: 800px)': {
            flexDirection: 'column',
          },
        }}>
        <Grid
          container
          border={`2px solid ${BASE_COLORS.DEFAULT_BLUE}`}
          borderRadius={2}>
          <Grid
            item
            width={'33.3%'}
            sx={{
              '@media (max-width: 800px)': {
                width: '100%',
              },
            }}>
            <Box height="100%" display="flex" flexDirection="column">
              <Box
                onClick={() => setAddress1(true)}
                height={'50%'}
                bgcolor={address1 ? BASE_COLORS.BACKGROUND_WHITE : ''}
                display={'flex'}
                flexDirection={'column'}
                p={2}
                sx={{
                  cursor: 'pointer',
                  borderTopLeftRadius: '20px',
                  '@media (max-width: 800px)': {
                    display: 'inline-block',
                    height: '100%',
                    borderTopLeftRadius: '6px',
                    borderTopRightRadius: '6px',
                    cursor: 'default',
                  },
                }}>
                <Box
                  sx={{
                    '@media (max-width: 800px)': {
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '0.5rem',
                    },
                  }}>
                  <StyledHeadingText className={montserrat.className}>
                    {dictionary.headerCity},
                  </StyledHeadingText>
                  <StyledHeadingText className={montserrat.className}>
                    {dictionary.headerAddress}
                  </StyledHeadingText>
                </Box>
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  pt={2.5}
                  pb={1.5}>
                  <CalendarMonthIcon
                    sx={{
                      color: BASE_COLORS.DEFAULT_BLUE,
                      paddingRight: '0.5rem',
                    }}
                  />
                  <StyledSubHeading className={montserrat.className}>
                    {dictionary.openingHours}:
                  </StyledSubHeading>
                </Box>
                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  sx={{
                    '@media (max-width: 800px)': {
                      width: '15rem',
                      margin: '0 auto',
                    },
                  }}>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <StyledText>{dictionary.workDays}:</StyledText>
                    <StyledText>9:00 - 18:00</StyledText>
                  </Box>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <StyledText>{dictionary.st}:</StyledText>
                    <StyledText>9:00 - 16:00</StyledText>
                  </Box>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <StyledText>{dictionary.su}:</StyledText>
                    <StyledText>{dictionary.closed}</StyledText>
                  </Box>
                </Box>
              </Box>
              <Box
                onClick={() => setAddress1(false)}
                height={'50%'}
                bgcolor={!address1 ? BASE_COLORS.BACKGROUND_WHITE : ''}
                display={'flex'}
                flexDirection={'column'}
                p={2}
                sx={{
                  cursor: 'pointer',
                  borderBottomLeftRadius: '20px',
                  '@media (max-width: 800px)': {
                    display: 'none',
                    cursor: 'default',
                  },
                }}>
                <Box
                  sx={{
                    '@media (max-width: 800px)': {
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '0.5rem',
                    },
                  }}>
                  <StyledHeadingText className={montserrat.className}>
                    {dictionary.headerCity},
                  </StyledHeadingText>
                  <StyledHeadingText className={montserrat.className}>
                    {dictionary.headerAddress2}
                  </StyledHeadingText>
                </Box>
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  pt={2.5}
                  pb={1.5}>
                  <CalendarMonthIcon
                    sx={{
                      color: BASE_COLORS.DEFAULT_BLUE,
                      paddingRight: '0.5rem',
                    }}
                  />
                  <StyledSubHeading className={montserrat.className}>
                    {dictionary.openingHours}:
                  </StyledSubHeading>
                </Box>
                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  sx={{
                    '@media (max-width: 800px)': {
                      width: '15rem',
                      margin: '0 auto',
                    },
                  }}>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <StyledText>{dictionary.workDays}:</StyledText>
                    <StyledText>9:00 - 18:00</StyledText>
                  </Box>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <StyledText>{dictionary.st}:</StyledText>
                    <StyledText>9:00 - 16:00</StyledText>
                  </Box>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <StyledText>{dictionary.su}:</StyledText>
                    <StyledText>{dictionary.closed}</StyledText>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item width={'66.7%'}>
            <Box
              sx={{
                '@media (max-width: 800px)': {
                  width: '150%',
                },
              }}>
              <Wrapper apiKey={GOOGLE_MAP_KEY}>
                <GoogleMaps
                  center={
                    address1
                      ? {
                          lat: 49.238440161453745,
                          lng: 28.403964997993405,
                        }
                      : {
                          lat: 49.20398,
                          lng: 28.49831,
                        }
                  }
                  zoom={16}
                />
              </Wrapper>
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          border={`2px solid ${BASE_COLORS.DEFAULT_BLUE}`}
          borderRadius={2}
          sx={{
            '@media (min-width: 800px)': {
              display: 'none',
            },
            '@media (max-width: 800px)': {
              display: 'block',
              mt: '2rem',
            },
          }}>
          <Grid
            item
            width={'33.3%'}
            sx={{
              '@media (max-width: 800px)': {
                width: '100%',
              },
            }}>
            <Box height="100%" display="flex" flexDirection="column">
              <Box
                height={'50%'}
                bgcolor={BASE_COLORS.BACKGROUND_WHITE}
                display={'flex'}
                flexDirection={'column'}
                p={2}
                sx={{
                  borderBottomLeftRadius: '20px',
                  borderTopLeftRadius: '6px',
                  borderTopRightRadius: '6px',
                }}>
                <Box
                  sx={{
                    '@media (max-width: 800px)': {
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '0.5rem',
                    },
                  }}>
                  <StyledHeadingText className={montserrat.className}>
                    {dictionary.headerCity},
                  </StyledHeadingText>
                  <StyledHeadingText className={montserrat.className}>
                    {dictionary.headerAddress2}
                  </StyledHeadingText>
                </Box>
                <Box
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  pt={2.5}
                  pb={1.5}>
                  <CalendarMonthIcon
                    sx={{
                      color: BASE_COLORS.DEFAULT_BLUE,
                      paddingRight: '0.5rem',
                    }}
                  />
                  <StyledSubHeading className={montserrat.className}>
                    {dictionary.openingHours}:
                  </StyledSubHeading>
                </Box>
                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  sx={{
                    '@media (max-width: 800px)': {
                      width: '15rem',
                      margin: '0 auto',
                    },
                  }}>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <StyledText>{dictionary.workDays}:</StyledText>
                    <StyledText>9:00 - 18:00</StyledText>
                  </Box>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <StyledText>{dictionary.st}:</StyledText>
                    <StyledText>9:00 - 16:00</StyledText>
                  </Box>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <StyledText>{dictionary.su}:</StyledText>
                    <StyledText>{dictionary.closed}</StyledText>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item width={'66.7%'}>
            <Box
              sx={{
                '@media (max-width: 800px)': {
                  width: '150%',
                },
              }}>
              <Wrapper apiKey={GOOGLE_MAP_KEY}>
                <GoogleMaps
                  center={{
                    lat: 49.203685111,
                    lng: 28.498228111,
                  }}
                  zoom={16}
                />
              </Wrapper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default GoogleMapBox;
