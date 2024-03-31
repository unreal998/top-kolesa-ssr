import { useSelector } from 'react-redux';

import { Box, Stack, Typography, styled } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { BASE_COLORS } from '@/shared/constants';
import { selectCurrentPageItemList } from '@/redux/slices/selectors/shopPageSelectors';
import { ShopItemCard } from '../../shop/components/ShopItemCard';
import { useRef, WheelEvent } from 'react';
import { type getDictionary } from '@/get-dictionary';

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1250,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const SlyderBox = styled(Box)({
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
});

export default function TopRated({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
}) {
  const shopItems = useSelector(selectCurrentPageItemList());
  const similarItems = shopItems.sort((a, b) => b.rate - a.rate).slice(0, 9);
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

  return (
    <Stack
      spacing={'1rem'}
      m={'2rem auto 3rem'}
      maxWidth={'80rem'}
      sx={{
        '@media (max-width: 1500px)': {
          width: '100%',
        },
        '@media (max-width: 1025px)': {
          width: '90%',
        },
      }}>
      <Typography
        variant="h4"
        pl={'10%'}
        fontWeight={700}
        sx={{
          '@media (max-width: 918px)': {
            textAlign: 'center',
            paddingLeft: '0',
          },
        }}>
        {dictionary.topRated}
      </Typography>
      <SlyderBox onWheel={onWheel}>
        <Slider {...settings} ref={sliderRef}>
          {similarItems.map((item) => (
            <Box key={item.id} padding={1} sx={{ width: '100%' }}>
              <ShopItemCard
                id={item.id}
                brand={item.brand}
                name={item.name}
                width={item.width}
                height={item.height}
                diametr={item.diametr}
                rating={item.rate}
                price={item.price_uah}
                imgName={item.image_file}
                country={item.country}
                season={item.season}
                year={item.year}
                speed={item.speed}
                weight={item.weight}
                param={item.param}
                dictionary={dictionary}
              />
            </Box>
          ))}
        </Slider>
      </SlyderBox>
    </Stack>
  );
}
