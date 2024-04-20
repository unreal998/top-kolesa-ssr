'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getShopItems, setSelectedItemId } from '@/redux/slices/shopPageSlice';
import { selectSelectedItemData } from '@/redux/slices/selectors/shopPageSelectors';

import { Box, Stack, styled } from '@mui/material';

import Tooltips from './Tooltips';
import Header from './Header';
import BuyOptions from './BuyOptions';
import TireImg from './TireImg';
import FullInfo from './FullInfo';
import TopRated from './TopRated';
import Loader from '@/shared/components/Loader';

import { BASE_COLORS } from '@/shared/constants';
import { type getDictionary } from '@/get-dictionary';

type ContainerProps = {
  itemDetailId: string;
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
  lang: string;
};

const StyledItemBox = styled(Stack)({
  backgroundColor: BASE_COLORS.BACKGROUND_WHITE,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '50px',
  padding: '4rem 2rem',
  borderRadius: '0.75rem',
  width: '80rem',
  margin: 'auto',
  '@media (max-width: 1500px)': {
    padding: '2rem',
    width: '90%',
  },
  '@media (max-width: 1300px)': {
    padding: '2rem 1rem',
    width: '70rem',
  },
  '@media (max-width: 1200px)': {
    gap: '0',
    justifyContent: 'space-around',
    width: '64rem',
  },
  '@media (max-width: 990px)': {
    gap: '0',
    justifyContent: 'space-around',
    width: '95%',
  },
  '@media (max-width: 918px)': {
    flexDirection: 'column',
    width: '90%',
    paddingTop: '5%',
  },
});

function Container({ itemDetailId, dictionary, lang }: ContainerProps) {
  const dispatch = useDispatch();
  const selectedItemData = useSelector(selectSelectedItemData());
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const selectedItemName = itemDetailId.split('-');
    const selectedItemId = selectedItemName[selectedItemName.length - 1];
    dispatch(getShopItems(''));
    dispatch(setSelectedItemId(selectedItemId || ''));
  }, [dispatch]);

  useEffect(() => {
    if (selectedItemData) {
      setLoading(false);
    }
  }, [selectedItemData]);

  return (
    <>
      {loading ? (
        <Box
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          height={'50vh'}>
          <Loader />
        </Box>
      ) : (
        <Stack
          padding="5% 1%"
          gap="10px"
          m={'auto'}
          sx={{
            '@media (max-width: 1300px)': {
              padding: '5% 1%',
            },
          }}>
          <StyledItemBox>
            <TireImg />
            <Stack mx={1}>
              <Header dictionary={dictionary} />
              <BuyOptions
                lang={lang}
                tireId={selectedItemData?.id}
                dictionary={dictionary}
              />
              <Tooltips dictionary={dictionary} />
            </Stack>
          </StyledItemBox>
          <FullInfo dictionary={dictionary} />
          <TopRated dictionary={dictionary} />
        </Stack>
      )}
    </>
  );
}

export default Container;
