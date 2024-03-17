'use client';

import { Box, styled } from '@mui/material';
import { BASE_COLORS } from '../../../shared/constants';

const SecDividerContainer = styled(Box)({
  width: '100px',
  height: '3px',
  textAlign: 'center',
  backgroundColor: BASE_COLORS.DEFAULT_BLUE,
});

const SecDividerAnimation = styled(Box)({
  width: '20%',
  height: '5px',
  textAlign: 'center',
  backgroundColor: BASE_COLORS.DEFAULT_BLUE,
  marginTop: '-1px',
  WebkitAnimation:
    'slide-right 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) infinite alternate-reverse both',
  animation:
    'slide-right 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) infinite alternate-reverse both',

  '@-webkit-keyframes slide-right': {
    '0%': {
      WebkitTransform: 'translateX(0)',
      transform: 'translateX(0)',
    },
    '100%': {
      WebkitTransform: 'translateX(100px)',
      transform: 'translateX(100px)',
    },
  },
  '@keyframes slide-right': {
    '0%': {
      WebkitTransform: 'translateX(0)',
      transform: 'translateX(0)',
    },
    '100%': {
      WebkitTransform: 'translateX(100px)',
      transform: 'translateX(100px)',
    },
  },
});

export function SliderCarousel() {
  return (
    <SecDividerContainer>
      <SecDividerAnimation />
    </SecDividerContainer>
  );
}
