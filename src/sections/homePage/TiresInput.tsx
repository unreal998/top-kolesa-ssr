'use client';

import { ImgCarousel } from './components/ImgCarousel';

import { Box, Stack, Typography, styled } from '@mui/material';

import { SliderItem } from '../../shared/types';
import { BASE_COLORS } from '../../shared/constants';
import { type getDictionary } from '../../get-dictionary';
import TiresFilter from './TiresFilter';
import { getFilterData } from '@/redux/slices/filterSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const StyledTagLine = styled(Typography)({
  fontWeight: '800',
  color: '#ffffff',
  position: 'absolute',
  left: '4%',
  '@media (min-width: 2399px)': {
    width: '35rem',
    left: '18vw',
  },
  '@media (max-width: 1680px)': {
    width: '10rem',
  },
  '@media (max-width: 1100px)': {
    fontSize: '3rem',
  },
  '@media (max-width: 975px)': {
    display: 'none',
  },
});

const StyledServicesBox = styled(Box)({
  margin: 'auto',
  padding: '1rem 0 1rem 25px',
  width: '70rem',
  '@media (max-width: 1650px)': {
    width: '40rem',
  },
  '@media (max-width: 1200px)': {
    width: '50rem',
  },
  '@media (max-width: 740px)': {
    width: '35rem',
  },
  '@media (max-width: 420px)': {
    margin: 'auto',
    width: '180px',
  },
});

const sliderData: SliderItem[] = [
  {
    imgSource: '',
    description: (
      <Box
        sx={{
          backgroundImage: 'url(./imgs/tireBrands/michelinLogo.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          width: '200px',
          height: '70px',
          userSelect: 'none',
          backgroundColor: '#fff',
          '@media (max-width: 520px)': {
            width: '170px',
            height: '60px',
          },
        }}
      />
    ),
  },
  {
    imgSource: '',
    description: (
      <Box
        sx={{
          backgroundImage: 'url(./imgs/tireBrands/goodyearLogo.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          width: '200px',
          height: '70px',
          userSelect: 'none',
          backgroundColor: '#06469d',
          '@media (max-width: 520px)': {
            width: '170px',
            height: '60px',
          },
        }}
      />
    ),
  },
  {
    imgSource: '',
    description: (
      <Box
        sx={{
          backgroundImage: 'url(./imgs/tireBrands/continentalLogo.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          width: '200px',
          height: '80px',
          userSelect: 'none',
          '@media (max-width: 520px)': {
            width: '170px',
            height: '60px',
          },
        }}
      />
    ),
  },
  {
    imgSource: '',
    description: (
      <Box
        sx={{
          backgroundImage: 'url(./imgs/tireBrands/linglongLogo.jpg)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          width: '200px',
          height: '70px',
          userSelect: 'none',
          backgroundColor: '#fff',
          backgroundPosition: 'center',
          marginX: '1px',
          '@media (max-width: 520px)': {
            width: '170px',
            height: '60px',
          },
        }}
      />
    ),
  },
  {
    imgSource: '',
    description: (
      <Box
        sx={{
          backgroundImage: 'url(./imgs/tireBrands/fuldaLogo.jpg)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          width: '180px',
          height: '70px',
          userSelect: 'none',
          '@media (max-width: 520px)': {
            width: '170px',
            height: '60px',
          },
        }}
      />
    ),
  },
];

export function TiresInput({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
}) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFilterData());
  }, [dispatch]);

  return (
    <>
      <Box
        display="flex"
        padding="5%"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        position={'relative'}
        sx={{
          backgroundImage: 'url(./imgs/hero-1-2.jpg)',
          backgroundSize: 'cover',
        }}>
        <StyledTagLine
          variant="h2"
          top={'35%'}
          sx={{
            '@media (max-width: 1680px)': {
              top: '20%',
            },
            '@media (max-width: 1100px)': {
              top: '35%',
            },
          }}>
          {dictionary.tireSelectorTitle1}
        </StyledTagLine>
        <StyledTagLine
          variant="h2"
          top={'48%'}
          sx={{
            '@media (max-width: 1100px)': {
              left: '77%',
              top: '35%',
            },
          }}>
          {dictionary.tireSelectorTitle2}
        </StyledTagLine>
        <Stack direction="row" alignContent={'center'}>
          <TiresFilter dictionary={dictionary} />
        </Stack>
      </Box>
      <Stack bgcolor={BASE_COLORS.DEFAULT_BLUE}>
        <Box
          sx={{
            backgroundImage: 'url(./imgs/bg-brand.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            '@media (max-width: 1560px)': {
              backgroundPosition: 'right',
            },
            '@media (max-width: 1260px)': {
              backgroundPosition: 'center',
            },
          }}>
          <Stack
            gap="10px"
            justifyContent="space-around"
            padding="2rem"
            direction="column"
            sx={{
              '@media (min-width: 2000px)': {
                margin: 'auto',
              },
              '@media (max-width: 500px)': {
                padding: '2rem 0',
              },
            }}>
            <Stack gap="10px" color="#fff">
              <Typography
                fontWeight="900"
                variant="h2"
                m={'auto'}
                sx={{
                  '@media (max-width: 700px)': {
                    fontSize: '3rem',
                  },
                  '@media (max-width: 570px)': {
                    fontSize: '2.4rem',
                  },
                }}>
                {dictionary.officialRepresentative}
              </Typography>
            </Stack>
            <StyledServicesBox>
              <ImgCarousel sliderData={sliderData} />
            </StyledServicesBox>
            <Typography
              variant="subtitle1"
              m={'auto'}
              color="#fff"
              fontSize={'20px'}
              sx={{
                '@media (max-width: 600px)': {
                  fontSize: '1.3rem',
                },
                '@media (max-width: 400px)': {
                  fontSize: '1.3rem',
                },
              }}>
              {dictionary.popularBrandsSubtitle}
            </Typography>
          </Stack>
          <Box
            height="40px"
            sx={{
              backgroundImage: 'url(./imgs/brand-shape.png)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              '@media (min-width: 2000px)': {
                display: 'none',
              },
            }}
          />
        </Box>
      </Stack>
    </>
  );
}
