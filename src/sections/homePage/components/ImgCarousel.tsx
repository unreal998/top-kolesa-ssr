import Slider from 'react-slick';
import { Box, styled } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import { useRef, WheelEvent } from 'react';
import { SliderItem } from '@/shared/types';

const settings = {
  slidesToShow: 5,
  responsive: [
    {
      breakpoint: 1650,
      settings: {
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        arrows: false,
        dots: true,
      },
    },
    {
      breakpoint: 740,
      settings: {
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 0,
        arrows: false,
        dots: true,
      },
    },
    {
      breakpoint: 421,
      settings: {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        arrows: true,
        dots: false,
      },
    },
  ],
};

const SlyderBox = styled(Box)({
  '.slick-dots li button:before': {
    color: '#fff',
    fontSize: '7px',
  },
  '.slick-dots li.slick-active button:before': {
    color: '#fff',
  },
});

export function ImgCarousel({ sliderData }: { sliderData: SliderItem[] }) {
  const sliderRef = useRef<Slider | null>(null);

  const onWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (sliderRef.current) {
      const threshold = 10;

      if (Math.abs(event.deltaX) > threshold) {
        if (event.deltaX > 0) {
          sliderRef.current.slickNext();
        } else if (event.deltaX < 0) {
          sliderRef.current.slickPrev();
        }
      }
    }
  };

  return (
    <SlyderBox onWheel={onWheel}>
      <Slider {...settings} ref={sliderRef}>
        {sliderData.map((item, i) => (
          <Box
            key={i}
            sx={{ '@media (max-width: 421px)': { marginLeft: '3%' } }}>
            {item.description}
          </Box>
        ))}
      </Slider>
    </SlyderBox>
  );
}
