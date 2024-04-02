'use client';

import { Box, Link, Stack, Typography } from '@mui/material';
import { Wrapper } from '@googlemaps/react-wrapper';
import { useEffect, useRef, useState } from 'react';
import { getDictionary } from '../../get-dictionary';

import { GOOGLE_MAP_KEY } from '../../shared/keys';
import { montserrat } from '@/shared/constants';

function MyMapComponent({
  center,
  zoom,
}: {
  center: google.maps.LatLngLiteral;
  zoom: number;
}) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref !== null) {
      const map = new window.google.maps.Map(ref.current as HTMLInputElement, {
        center,
        zoom,
      });
      const myLatLng = {
        lat: 49.238440161453745,
        lng: 28.403964997993405,
      };
      new google.maps.Marker({
        position: myLatLng,
        map,
        title: 'tireCenterGlobal',
      });
      const mySeccondLatLng = {
        lat: 49.20398,
        lng: 28.49831,
      };
      new google.maps.Marker({
        position: mySeccondLatLng,
        map,
        title: 'tireCenterTyrePlus',
      });
    }
  });

  return (
    <Box
      width="50%"
      height="500px"
      ref={ref}
      id="map"
      sx={{
        '@media (max-width: 1025px)': {
          width: '80%',
        },
        '@media (max-width: 650px)': {
          height: '400px',
        },
        '@media (max-width: 520px)': {
          height: '30rem',
        },
      }}
    />
  );
}

export function GoogleMap({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
}) {
  const center = { lat: 49.23290247396144, lng: 28.458753231671704 };
  const [zoom, setZoom] = useState(12);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 600) {
        setZoom(11);
      } else {
        setZoom(12);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const contactPhones = [
    {
      phone: '(063) 253-77-44',
      link: 'tel:+380632537744',
    },
    {
      phone: '(097) 273-77-44',
      link: 'tel:+380972737744',
    },
    {
      phone: '(099) 273-77-44',
      link: 'tel:+380992737744',
    },
  ];

  return (
    <Box
      id="mapMainPages"
      ref={ref}
      sx={{
        backgroundImage: 'url(./imgs/ourServiceImgs/bg.jpg)',
        backgroundSize: 'contain',
      }}>
      <Box
        display="flex"
        flexDirection="row"
        padding="4rem"
        justifyContent="space-around"
        alignItems="center"
        sx={{
          '@media (min-width: 1900px)': {
            width: '110rem',
            margin: '0 auto',
          },
          '@media (max-width: 1025px)': {
            flexDirection: 'column',
            gap: '3rem',
          },
        }}>
        <Stack
          gap="10px"
          pr={'1rem'}
          sx={{
            '@media (min-width: 2000px)': {
              width: '80rem',
              margin: '0 auto',
            },
            '@media (max-width: 500px)': {
              paddingLeft: '2rem',
            },
          }}>
          <Typography
            variant="h3"
            fontWeight="900"
            color="#000"
            className={montserrat.className}
            pb={'1rem'}
            sx={{
              '@media (max-width: 1025px)': {
                textAlign: 'center',
              },
            }}>
            {dictionary.howToFindUS}
          </Typography>
          <Stack>
            <Typography
              variant="h5"
              fontWeight="600"
              className={montserrat.className}
              color="#000">
              {dictionary.officeBased}
            </Typography>
            <Typography
              variant="body1"
              fontWeight="400"
              color="#000"
              fontSize={'1rem'}
              sx={{
                '@media (max-width: 605px)': {
                  fontSize: '1.1rem',
                },
              }}>
              {`${dictionary.tireCenterGlobal}: ${dictionary.headerAddress}`}
            </Typography>
            <Typography
              variant="body1"
              fontWeight="400"
              color="#000"
              fontSize={'1rem'}
              sx={{
                '@media (max-width: 605px)': {
                  fontSize: '1.1rem',
                },
              }}>
              {`${dictionary.tireCenterTyrePlus}: ${dictionary.headerAddress2}`}
            </Typography>
          </Stack>
          <Stack>
            <Typography
              variant="h5"
              fontWeight="600"
              className={montserrat.className}
              color="#000">
              {dictionary.waitingForCall}
            </Typography>
            {contactPhones.map((phone, i) => (
              <Typography
                key={i}
                variant="body1"
                fontWeight="400"
                color="#000"
                fontSize={'1rem'}
                sx={{
                  '@media (max-width: 605px)': {
                    fontSize: '1.1rem',
                  },
                }}>
                <Link
                  href={phone.link}
                  color="inherit"
                  style={{ textDecoration: 'none' }}>
                  {phone.phone}
                </Link>
              </Typography>
            ))}
          </Stack>
          <Stack>
            <Typography
              variant="h5"
              fontWeight="600"
              className={montserrat.className}
              color="#000">
              {dictionary.ourMail}
            </Typography>
            <Typography
              variant="body1"
              fontWeight="400"
              color="#000"
              fontSize={'1rem'}
              sx={{
                '@media (max-width: 605px)': {
                  fontSize: '1.1rem',
                },
              }}>
              <Link
                href="mailto:topkolesa@gmail.com"
                color="inherit"
                style={{ textDecoration: 'none' }}>
                topkolesa@gmail.com
              </Link>
            </Typography>
          </Stack>
        </Stack>
        <Wrapper apiKey={GOOGLE_MAP_KEY}>
          <MyMapComponent center={center} zoom={zoom} />
        </Wrapper>
      </Box>
    </Box>
  );
}
