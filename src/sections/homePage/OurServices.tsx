'use client';

import { Box, Typography } from '@mui/material';
import Slider from 'react-slick';
import { BASE_COLORS } from '../../shared/constants';
import { SliderCarousel } from './components/SliderCarousel';
import { motion } from 'framer-motion';
import StoreIcon from '@mui/icons-material/Store';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import HandymanIcon from '@mui/icons-material/Handyman';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import styled from '@emotion/styled';
import { useRef, WheelEvent } from 'react';
import { type getDictionary } from '../../get-dictionary';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  arrows: false,
  responsive: [
    {
      breakpoint: 2400,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 1020,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 605,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const StyledServicesBox = styled(Box)({
  width: '80rem',
  margin: '2rem auto',
  '.slick-dots li button:before': {
    color: BASE_COLORS.DEFAULT_BLUE,
    fontSize: '8px',
  },
  '.slick-dots li.slick-active button:before': {
    color: BASE_COLORS.DEFAULT_BLUE,
  },
  '.slick-slide > div': {
    margin: '0 10px',
  },
  '@media (min-width: 2400px)': {
    width: '110rem',
  },
  '@media (max-width: 1350px)': {
    width: '70rem',
  },
  '@media (max-width: 1020px)': {
    width: '50rem',
  },
  '@media (max-width: 650px)': {
    width: '40rem',
  },
  '@media (max-width: 605px)': {
    width: '100%',
  },
});

const hoverAnimationBack = {
  rest: {
    y: -100,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  hover: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

const hoverAnimationHeader = {
  rest: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  hover: {
    y: 30,
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
    },
  },
};

const HoverDiv = styled(motion.div)({
  position: 'absolute',
  width: '25rem',
  margin: 'auto',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '@media (max-width: 1350px)': {
    width: '20rem',
  },
  '@media (max-width: 650px)': {
    width: '18rem',
  },
  '@media (max-width: 605px)': {
    width: '30rem',
  },
});

const StyledAnimatedheader = styled(Typography)({
  fontWeight: '600',
  position: 'absolute',
  bottom: -35,
  left: 0,
  right: 0,
  padding: '1.2rem 0.4rem',
  backgroundColor: BASE_COLORS.DEFAULT_BLUE,
  width: '70%',
  textAlign: 'center',
  color: '#fff',
  margin: 'auto',
  '@media (max-width: 1350px)': {
    padding: '1rem 0.3rem',
    bottom: -28,
    width: '14.5rem',
    fontSize: '1.4rem',
  },
  '@media (max-width: 800px)': {
    padding: '1rem 0rem',
    width: '15rem',
    fontSize: '1.5rem',
  },
  '@media (max-width: 650px)': {
    width: '14rem',
    fontSize: '1.4rem',
  },
  '@media (max-width: 605px)': {
    padding: '1.5rem 3rem',
    width: '17rem',
    fontSize: '2rem',
  },
});

export function OurServices({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
}) {
  const sliderRef = useRef<Slider | null>(null);

  const onWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (sliderRef.current) {
      const threshold = 10;

      if (Math.abs(e.deltaX) > threshold) {
        if (e.deltaX > 0) {
          sliderRef.current.slickNext();
        } else if (e.deltaX < 0) {
          sliderRef.current.slickPrev();
        }
      }
    }
  };

  const services = [
    {
      title: 'tireSelectionService',
      description: 'tireSelectionServiceDesription',
      imgSrc: './imgs/ourServiceImgs/sr-img-1-1.jpg',
      icon: (
        <StoreIcon
          sx={{
            width: '70px',
            height: '70px',
            marginBottom: '20px',
            color: '#fff',
          }}
        />
      ),
    },
    {
      title: 'diskSelectionService',
      description: 'diskSelectionServiceSubtitle',
      imgSrc: './imgs/ourServiceImgs/sr-img-1-2.jpg',
      icon: (
        <ScreenSearchDesktopIcon
          sx={{
            width: '70px',
            height: '70px',
            marginBottom: '20px',
            color: '#fff',
          }}
        />
      ),
    },
    {
      title: 'serviceStation',
      description: 'serviceStationDescription',
      imgSrc: './imgs/ourServiceImgs/sr-img-1-3.jpg',
      icon: (
        <HandymanIcon
          sx={{
            width: '70px',
            height: '70px',
            marginBottom: '20px',
            color: '#fff',
          }}
        />
      ),
    },
    {
      title: 'storage',
      description: 'storageDescription',
      imgSrc: './imgs/ourServiceImgs/sr-img-1-4.jpg',
      icon: (
        <WarehouseIcon
          sx={{
            width: '70px',
            height: '70px',
            marginBottom: '20px',
            color: '#fff',
          }}
        />
      ),
    },
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      paddingY="4rem"
      justifyContent="center"
      alignItems="center"
      gap="20px"
      sx={{
        backgroundImage: 'url(./imgs/bg-4.jpg)',
        backgroundSize: 'contain',
      }}>
      <Typography
        variant="h2"
        color="#000"
        fontWeight="800"
        textAlign={'center'}
        mb={1}>
        {dictionary.ourServices}
      </Typography>
      <SliderCarousel />
      <StyledServicesBox>
        <Box onWheel={onWheel}>
          <Slider ref={sliderRef} {...settings}>
            {services.map((service, i) => (
              <Box key={i} position="relative" mb={5} width="25rem">
                <motion.div initial="rest" whileHover="hover" animate="rest">
                  <Box
                    component="img"
                    src={service.imgSrc}
                    m={'auto'}
                    width={'25rem'}
                    sx={{
                      '@media (max-width: 1350px)': {
                        width: '20rem',
                      },
                      '@media (max-width: 650px)': {
                        width: '18rem',
                      },
                      '@media (max-width: 605px)': {
                        width: '30rem',
                      },
                    }}
                  />
                  <motion.div variants={hoverAnimationHeader}>
                    <StyledAnimatedheader variant="h5">
                      {dictionary[service.title as keyof typeof dictionary]}
                    </StyledAnimatedheader>
                  </motion.div>
                  <HoverDiv variants={hoverAnimationBack}>
                    <Box textAlign={'center'} p={'0, 3rem'}>
                      {service.icon}
                      <Typography
                        variant="h5"
                        fontWeight="600"
                        width={250}
                        textAlign={'center'}
                        color={'#fff'}
                        m={'auto'}
                        pb={2}>
                        {dictionary[service.title as keyof typeof dictionary]}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        width={250}
                        textAlign={'center'}
                        color={'#fff'}
                        m={'auto'}>
                        {
                          dictionary[
                            service.description as keyof typeof dictionary
                          ]
                        }
                      </Typography>
                    </Box>
                  </HoverDiv>
                </motion.div>
              </Box>
            ))}
          </Slider>
        </Box>
      </StyledServicesBox>
    </Box>
  );
}
