import React, { useEffect, useState } from 'react';
import { Box, Link, Rating, Stack, Typography, styled } from '@mui/material';
import { BASE_COLORS, FILTER_COLORS, montserrat } from '@/shared/constants';
import { ShopItem } from '@/redux/slices/shopPageSlice';
import { SHOP_ITEM_TIRES_IMG_PREFIX } from '@/shared/keys';
import { motion } from 'framer-motion';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { type getDictionary } from '@/get-dictionary';

type ShopItemTableProps = ShopItem & {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
};

const HoverableBox = styled(motion.div)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 'calc(100% - 50%)',
  backgroundColor: 'rgba(248,248,248,0.85)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',

  '@media (max-width: 2000px)': {
    right: 'calc(100% - 45%)',
  },
});

const hoverAnimationBackVariants = {
  initial: {
    x: 100,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  hover: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  rest: {
    x: 100,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

const StyledText = styled(Typography)({
  fontSize: '1rem',
  color: FILTER_COLORS.TEXT_MAIN,
});

const StyledTextBold = styled(Typography)({
  fontSize: '1rem',
  color: FILTER_COLORS.TEXT_MAIN,
  fontWeight: 600,
});

export function ShopItemTable({
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
}: ShopItemTableProps) {
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
      href={`/item?id=${id.toString()}`}
      sx={{
        textDecoration: 'none',
        outline: 'none',
        textAlign: 'center',
      }}>
      <Box
        position="relative"
        onMouseEnter={handleHoverOpen}
        onMouseLeave={handleHoverClose}
        onTouchStart={handleHoverOpen}
        onTouchEnd={handleHoverClose}>
        <Box
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
          }}>
          <Box
            sx={{
              backgroundImage: imgName
                ? `url("${SHOP_ITEM_TIRES_IMG_PREFIX}${imgName}")`
                : `url("./imgs/noPhotoImg.jpg")`,
              width: '30rem',
              height: '12rem',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              '@media (max-width: 1150px)': {
                width: '20rem',
              },
            }}
          />
          <Stack
            bgcolor={BASE_COLORS.BACKGROUND_WHITE}
            display={'flex'}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap="5px"
            width="100%"
            height={'12rem'}
            px={'2rem'}>
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
              fontWeight="600"
              className={montserrat.className}
              color="#000"
              height={'4.5rem'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}>
              {brand} {name} {width}/{height} R{diametr} {weight}
              {speed} {param}
            </Typography>
            <Typography
              variant="h6"
              className={montserrat.className}
              fontWeight="600"
              color={BASE_COLORS.DEFAULT_BLUE}>
              {price} {dictionary.uah}
            </Typography>
          </Stack>
          <HoverableBox
            variants={hoverAnimationBackVariants}
            animate={hoverWindow ? 'hover' : 'rest'}
            exit="rest"
            sx={{
              opacity: hoverWindow ? 1 : 0,
            }}>
            <Box
              width={'130%'}
              px={'1.5rem'}
              mr={'0.7rem'}
              sx={{
                '@media (max-width: 1150px)': {
                  px: '15%',
                  mr: '25%',
                },
                '@media (max-width: 650px)': {
                  px: '15%',
                  mr: '15%',
                },
                '@media (max-width: 400px)': {
                  px: '5%',
                  mr: '5%',
                },
              }}>
              <Box
                display={'flex'}
                justifyContent={'center'}
                textAlign={'center'}
                gap={'0.5rem'}
                mb={'0.5rem'}>
                <InfoOutlinedIcon
                  fontSize="medium"
                  sx={{ color: BASE_COLORS.DEFAULT_BLUE }}
                />
                <StyledTextBold>{dictionary.shortInfo}</StyledTextBold>
              </Box>
              <Box>
                {tableData.map((item, index) => (
                  <Box
                    key={index}
                    display={'flex'}
                    justifyContent={'space-between'}>
                    <StyledText className={montserrat.className}>
                      {item.title}
                    </StyledText>
                    <StyledTextBold className={montserrat.className}>
                      {item.info}
                    </StyledTextBold>
                  </Box>
                ))}
              </Box>
            </Box>
          </HoverableBox>
        </Box>
      </Box>
    </Link>
  );
}
