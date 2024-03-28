import React, { useCallback, useRef } from 'react';
import { Box, Divider, Stack } from '@mui/material';
import { Apps, FormatAlignJustify } from '@mui/icons-material';
import styled from '@emotion/styled';
import { BASE_COLORS } from '@/shared/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setCardView } from '@/redux/slices/shopPageSlice';
import { selectCardView } from '@/redux/slices/selectors/shopPageSelectors';
import { ShopHeaderSort } from '../ShopHeaderSort';
import { type getDictionary } from '@/get-dictionary';

const ViewButton = styled(Box)({
  backgroundColor: BASE_COLORS.BACKGROUND_WHITE,
  padding: '10px',
  paddingBottom: '7px',
  borderRadius: '7px',
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: BASE_COLORS.DEFAULT_BLUE,
    color: '#fff',
  },
  '&.isSelected': {
    cursor: 'pointer',
    backgroundColor: BASE_COLORS.DEFAULT_BLUE,
    color: '#fff',
  },
});

const StyledDivider = styled(Divider)({
  width: '75%',
  '@media (max-width: 1900px)': {
    width: '70%',
  },
  '@media (max-width: 1700px)': {
    width: '65%',
  },
  '@media (max-width: 1600px)': {
    width: '63%',
  },
  '@media (max-width: 1500px)': {
    width: '60%',
  },
  '@media (max-width: 1350px)': {
    width: '55%',
  },
  '@media (max-width: 1250px)': {
    width: '50%',
  },
  '@media (max-width: 1050px)': {
    width: '45%',
  },
  '@media (max-width: 1000px)': {
    width: '45%',
  },
  '@media (max-width: 990px)': {
    width: '40%',
  },
  '@media (max-width: 930px)': {
    width: '30%',
  },
  '@media (max-width: 870px)': {
    maxWidth: '3rem',
  },
});

export function ShopHeaderBar({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
}) {
  const dispatch = useDispatch();
  const cardView = useSelector(selectCardView);
  const tableButton = useRef();
  const cardButton = useRef();

  const handleCardViewChange = useCallback(() => {
    const cardButtonElement = cardButton.current as unknown as HTMLElement;
    const tableButtonElement = tableButton.current as unknown as HTMLElement;
    cardButtonElement.classList.add('isSelected');
    tableButtonElement.classList.remove('isSelected');
    dispatch(setCardView(true));
  }, []);

  const handleTableViewChange = useCallback(() => {
    const cardButtonElement = cardButton.current as unknown as HTMLElement;
    const tableButtonElement = tableButton.current as unknown as HTMLElement;
    cardButtonElement.classList.remove('isSelected');
    tableButtonElement.classList.add('isSelected');
    dispatch(setCardView(false));
  }, []);

  return (
    <Stack
      alignItems="center"
      justifyContent="space-between"
      direction="row"
      width="95%"
      gap="2rem"
      sx={{
        '@media (max-width: 930px)': {
          marginLeft: '3rem',
        },
        '@media (max-width: 918px)': {
          display: 'none',
        },
      }}>
      <Stack
        justifyContent="space-around"
        direction="row"
        width="10%"
        gap="1rem"
        sx={{
          '@media (max-width: 1400px)': {
            width: '5rem',
            gap: '0.75rem',
            paddingRight: '0.5rem',
          },
        }}>
        <ViewButton
          ref={cardButton}
          onClick={handleCardViewChange}
          className={cardView ? 'isSelected' : ''}
          sx={{ transition: 'all 0.3s ease-in-out' }}>
          <Apps />
        </ViewButton>
        <ViewButton
          ref={tableButton}
          onClick={handleTableViewChange}
          className={!cardView ? 'isSelected' : ''}
          sx={{ transition: 'all 0.3s ease-in-out' }}>
          <FormatAlignJustify />
        </ViewButton>
      </Stack>
      <StyledDivider />
      <ShopHeaderSort dictionary={dictionary} />
    </Stack>
  );
}
