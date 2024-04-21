import React, { useEffect, useState } from 'react';
import { Box, Rating, Stack, Typography, styled } from '@mui/material';
import {
  BASE_COLORS,
  FILTER_COLORS,
  FONTS,
  montserrat,
} from '@/shared/constants';
import { ShopItem } from '@/redux/slices/shopPageSlice';
import { SHOP_ITEM_TIRES_IMG_PREFIX } from '@/shared/keys';
import { motion } from 'framer-motion';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { type getDictionary } from '@/get-dictionary';
import Link from 'next/link';

type ShopItemCardProps = ShopItem & {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
};

const HoverableBox = styled(motion.div)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 'calc(100% - 216px)',
  backgroundColor: 'rgba(248,248,248,0.85)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  opacity: 1,

  '@media (max-width: 1050px)': {
    with: '1rem',
  },
  '@media (max-width: 1200px)': {
    bottom: 'calc(100% - 195px)',
  },
  '@media (max-width: 800px)': {
    bottom: 'calc(100% - 175px)',
  },
  '@media (max-width: 500px)': {
    bottom: 'calc(100% - 150px)',
  },
  '@media (max-width: 400px)': {
    bottom: 'calc(100% - 130px)',
  },
});

const hoverAnimationBackVariants = {
  initial: {
    y: 100,
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
  rest: {
    y: 100,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

const StyledText = styled(Typography)({
  fontFamily: `${FONTS.MAIN_TEXT_FAMILY}`,
  fontSize: '1rem',
  color: FILTER_COLORS.TEXT_MAIN,
});

const StyledTextBold = styled(Typography)({
  fontSize: '1rem',
  color: FILTER_COLORS.TEXT_MAIN,
  fontWeight: 600,
});

export function ShopItemCard({
  id,
  brand,
  name,
  width,
  height,
  diametr,
  imgName,
  rating,
  price,
  country,
  season,
  year,
  speed,
  weight,
  param,
  dictionary,
}: ShopItemCardProps) {
  const [value, setValue] = useState<number | null>(2);
  const [hoverWindow, setHoverWindow] = useState<boolean>(false);

  useEffect(() => {
    setValue(rating);
  }, [rating]);

  const tableData = [
    { title: `${dictionary.width}`, info: width },
    { title: `${dictionary.diametr}`, info: diametr },
    { title: `${dictionary.profile}`, info: height },
    { title: `${dictionary.country}`, info: country },
    { title: `${dictionary.season}`, info: season },
    { title: `${dictionary.year}`, info: year },
  ];

  const handleHoverOpen = () => {
    setHoverWindow(true);
  };

  const handleHoverClose = () => {
    setHoverWindow(false);
  };
  return (
    <Link
      href={encodeURI(
        `${brand} ${name} ${width} ${height} r${diametr} ${weight}${speed} ${id}`
          .toLowerCase()
          .replace('/', ' ')
          .replaceAll(' ', '-'),
      )}>
      <Stack
        direction="column"
        gap="1rem"
        alignItems="center"
        justifyContent="center"
        position="relative"
        onMouseEnter={handleHoverOpen}
        onMouseLeave={handleHoverClose}
        onTouchStart={handleHoverOpen}
        onTouchEnd={handleHoverClose}>
        <Box style={{ width: '100%' }}>
          <Box
            sx={{
              backgroundImage: imgName
                ? `url("${SHOP_ITEM_TIRES_IMG_PREFIX}${imgName}")`
                : `url("./imgs/noPhotoImg.jpg")`,
              width: '100%',
              height: '12rem',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              marginBottom: '1rem',
            }}
          />
          <Box
            bgcolor={BASE_COLORS.BACKGROUND_WHITE}
            display={'flex'}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="5px"
            width="80%"
            padding="10%"
            height={'5rem'}
            sx={{
              '@media (max-width: 2050px)': {
                height: '4rem',
              },
              '@media (max-width: 1150px)': {
                width: '87%',
                p: '6%',
              },
              '@media (max-width: 550px)': {
                height: '7rem',
                width: '87%',
                p: '6%',
              },
            }}>
            <Rating
              name="read-only"
              value={value}
              readOnly
              sx={{
                paddingBottom: '0.5rem',
              }}
            />
            <Typography
              variant="subtitle1"
              className={montserrat.className}
              fontWeight="600"
              color="#000"
              height={'3rem'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}>
              {brand} {name}
            </Typography>
            <Typography
              variant="subtitle1"
              className={montserrat.className}
              fontWeight="600"
              color="#000"
              height={'3rem'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}>
              {width}/{height} R{diametr} {weight}
              {speed} {param}
            </Typography>
            <Typography
              variant="h6"
              className={montserrat.className}
              fontWeight="600"
              color={BASE_COLORS.DEFAULT_BLUE}>
              {price} {dictionary.uah}
            </Typography>
          </Box>
          <HoverableBox
            variants={hoverAnimationBackVariants}
            animate={hoverWindow ? 'hover' : 'rest'}
            exit="rest"
            sx={{
              opacity: hoverWindow ? 1 : 0,
            }}>
            <Box
              width={'100%'}
              px={'20%'}
              sx={{
                '@media (max-width: 1150px)': {
                  px: '35%',
                },
                '@media (max-width: 550px)': {
                  px: '28%',
                },
              }}>
              <Box
                mt={'5%'}
                justifyContent={'center'}
                textAlign={'center'}
                mb={'0.5rem'}
                sx={{
                  '@media (max-width: 1150px)': {
                    mt: '1rem',
                  },
                }}>
                <InfoOutlinedIcon
                  fontSize="large"
                  sx={{ color: BASE_COLORS.DEFAULT_BLUE }}
                />
                <StyledTextBold className={montserrat.className}>
                  {dictionary.shortInfo}
                </StyledTextBold>
              </Box>
              <Box>
                {tableData.map((item, index) => (
                  <Box
                    key={index}
                    display={'flex'}
                    justifyContent={'space-between'}>
                    <StyledText>{item.title}</StyledText>
                    <StyledTextBold className={montserrat.className}>
                      {item.info}
                    </StyledTextBold>
                  </Box>
                ))}
              </Box>
            </Box>
          </HoverableBox>
        </Box>
      </Stack>
    </Link>
  );
}
