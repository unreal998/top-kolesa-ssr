import { useSelector } from 'react-redux';

import { Box, Rating, Typography } from '@mui/material';

import { selectSelectedItemData } from '@/redux/slices/selectors/shopPageSelectors';
import { BASE_COLORS, FONTS, montserrat } from '@/shared/constants';
import { type getDictionary } from '@/get-dictionary';

export default function Header({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
}) {
  const selectedItemData = useSelector(selectSelectedItemData());

  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        m={1}
        sx={{
          '@media (max-width: 918px)': {
            margin: '2rem auto 1rem',
          },
        }}>
        <Rating name="read-only" value={selectedItemData?.rate} readOnly />
      </Box>
      <Typography
        variant="h4"
        className={montserrat.className}
        fontWeight={600}
        pb={2}
        width={'fit-content'}>
        {selectedItemData?.brand} {selectedItemData?.name}{' '}
        {selectedItemData?.width}/{selectedItemData?.height} R
        {selectedItemData?.diametr}
      </Typography>
      <Box borderBottom={`1px dashed ${BASE_COLORS.DEFAULT_BLUE}`} mx={1} />
      <Box display={'flex'} justifyContent={'space-between'} mt={2}>
        <Box display={'flex'}>
          <Typography
            fontSize="0.8rem"
            className={montserrat.className}
            fontWeight={600}
            color={BASE_COLORS.DEFAULT_GREY}
            variant="body1">
            {dictionary.availability}:
          </Typography>
          <Typography
            fontSize="0.8rem"
            color={BASE_COLORS.DEFAULT_GREY}
            fontFamily={FONTS.MAIN_TEXT_FAMILY}
            variant="body1"
            pl={0.5}>
            {dictionary.inStock}
          </Typography>
        </Box>
      </Box>
    </>
  );
}
