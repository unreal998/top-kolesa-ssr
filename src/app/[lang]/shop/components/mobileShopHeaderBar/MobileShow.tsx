import { Box } from '@mui/material';
import { BASE_COLORS } from '../../../../shared/constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectCardView } from '../../selectors';
import { useCallback } from 'react';
import { actions } from '../../reducer';
import styled from '@emotion/styled';
import { Apps, FormatAlignJustify } from '@mui/icons-material';

const ViewButton = styled(Box)({
  backgroundColor: BASE_COLORS.BACKGROUND_WHITE,
  padding: '10px',
  paddingBottom: '7px',
  borderRadius: '7px',
  '&.isSelected': {
    cursor: 'pointer',
    backgroundColor: BASE_COLORS.DEFAULT_BLUE,
    color: '#fff',
  },
});

export function MobileShow() {
  const dispatch = useDispatch();
  const cardView = useSelector(selectCardView);

  const handleCardViewChange = useCallback(() => {
    dispatch(actions.setCardView(false));
  }, []);

  const handleTableViewChange = useCallback(() => {
    dispatch(actions.setCardView(true));
  }, []);

  return (
    <>
      {cardView ? (
        <ViewButton
          onClick={handleCardViewChange}
          className={cardView ? 'isSelected' : ''}
          m={'auto'}
          sx={{ transition: 'all 0.3s ease-in-out' }}>
          <FormatAlignJustify />
        </ViewButton>
      ) : (
        <ViewButton
          onClick={handleTableViewChange}
          className={!cardView ? 'isSelected' : ''}
          sx={{ transition: 'all 0.3s ease-in-out' }}
          m={'auto'}>
          <Apps />
        </ViewButton>
      )}
    </>
  );
}
