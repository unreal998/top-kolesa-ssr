import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedWidth, toggleFullMenu } from '@/redux/slices/shopPageSlice';
import { selectFilterData } from '@/redux/slices/selectors/filterSelectors';

import {
  selectSearchInput,
  selectSelectedWidth,
} from '@/redux/slices/selectors/shopPageSelectors';

import { type getDictionary } from '@/get-dictionary';

import ClearIcon from '@mui/icons-material/Clear';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { FILTER_COLORS, montserrat } from '@/shared/constants';

const ButtonsContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  overflowY: 'auto',
  maxHeight: '472px',
  width: '372px',
});

const StyledButton = styled(Button)({
  height: '59px',
  border: 'none',
  fontSize: '1.2rem',
  color: `${FILTER_COLORS.TEXT_MAIN}`,
  '&:hover': {
    backgroundColor: `${FILTER_COLORS.BACKGROUND_GREY}`,
    border: 'none',
    borderColor: 'transparent',
  },
  '&:focus': {
    borderColor: 'transparent',
  },
});

function FilterFullMenuWidthData({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
}) {
  const dispatch = useDispatch();
  const searchInput = useSelector(selectSearchInput);
  const selectedWidth = useSelector(selectSelectedWidth);
  const filtersParams = useSelector(selectFilterData());
  const [filteredWidthOptions, setFilteredWidthOptions] = useState(
    filtersParams.width,
  );

  useEffect(() => {
    const filtered = filtersParams.width
      .filter((option) => option.includes(searchInput))
      .sort((a, b) => Number(a) - Number(b));
    setFilteredWidthOptions(filtered);
  }, [searchInput, filtersParams.width]);

  const handleWidthClick = useCallback(
    (width: string) => {
      dispatch(setSelectedWidth(width));
      dispatch(toggleFullMenu());
    },
    [dispatch],
  );

  const handleResetFilterDiametr = () => {
    dispatch(setSelectedWidth(''));
  };

  return (
    <>
      <Box
        onClick={handleResetFilterDiametr}
        sx={{
          display: 'flex',
          alignItems: 'center',
          fontSize: '12px',
          marginBottom: '12px',
          width: 'fit-content',
          cursor: selectedWidth.length > 0 ? 'pointer' : 'default',
          color:
            selectedWidth.length > 0
              ? FILTER_COLORS.TEXT_MAIN
              : FILTER_COLORS.BUTTON_RESET_FILTER_INACTIVE,
          transition: 'all 0.2s ease',
        }}>
        <ClearIcon
          style={{
            color:
              selectedWidth.length > 0
                ? FILTER_COLORS.BUTTON_RESET_FILTER
                : FILTER_COLORS.BUTTON_RESET_FILTER_INACTIVE,
            transition: 'all 0.2s ease',
          }}
        />
        <Typography variant="subtitle2" pt={0.2} sx={{}}>
          {dictionary.resetFilter}
        </Typography>
      </Box>
      <ButtonsContainer>
        {filteredWidthOptions.length > 0 ? (
          filteredWidthOptions.slice(1).map((widthOption) => (
            <StyledButton
              key={widthOption}
              className={montserrat.className}
              variant="outlined"
              onClick={() => handleWidthClick(widthOption)}
              style={{
                backgroundColor:
                  widthOption === selectedWidth
                    ? `${FILTER_COLORS.BACKGROUND_GREY}`
                    : 'transparent',
              }}>
              {widthOption}
            </StyledButton>
          ))
        ) : (
          <Box
            paddingLeft={1.2}
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '200px',
            }}>
            <Typography
              variant="subtitle2"
              sx={{
                marginTop: '20px',
              }}>
              {dictionary.noMatchesFound}
            </Typography>
          </Box>
        )}
      </ButtonsContainer>
    </>
  );
}

export default FilterFullMenuWidthData;
