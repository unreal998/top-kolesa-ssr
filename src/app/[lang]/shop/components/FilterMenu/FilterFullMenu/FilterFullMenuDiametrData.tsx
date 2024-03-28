import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilterData } from '@/redux/slices/selectors/filterSelectors';
import { type getDictionary } from '@/get-dictionary';
import {
  selectSearchInput,
  selectSelectedDiametr,
} from '@/redux/slices/selectors/shopPageSelectors';
import {
  setSelectedDiametr,
  toggleFullMenu,
} from '@/redux/slices/shopPageSlice';

import ClearIcon from '@mui/icons-material/Clear';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { FILTER_COLORS } from '@/shared/constants';

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

function FilterFullMenuDiametr({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
}) {
  const dispatch = useDispatch();
  const searchInput = useSelector(selectSearchInput);
  const selectedDiametr = useSelector(selectSelectedDiametr);
  const filtersParams = useSelector(selectFilterData());
  const [filteredDiamenrOptions, setFilteredDiamenrOptions] = useState(
    filtersParams.diametr,
  );

  useEffect(() => {
    const filtered = filtersParams.diametr.filter((option) =>
      option.includes(searchInput),
    );

    setFilteredDiamenrOptions(filtered);
  }, [searchInput, filtersParams.diametr]);

  const handleDiametrClick = useCallback(
    (diametr: string) => {
      dispatch(setSelectedDiametr(diametr));
      dispatch(toggleFullMenu());
    },
    [dispatch],
  );

  const handleResetFilterDiametr = () => {
    dispatch(setSelectedDiametr(''));
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
          cursor: 'pointer',
          color:
            selectedDiametr.length > 0
              ? FILTER_COLORS.TEXT_MAIN
              : FILTER_COLORS.BUTTON_RESET_FILTER_INACTIVE,
          transition: 'all 0.2s ease',
        }}>
        <ClearIcon
          style={{
            color:
              selectedDiametr.length > 0
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
        {filteredDiamenrOptions.length > 0 ? (
          filteredDiamenrOptions.slice(1).map((diametrOption) => (
            <StyledButton
              key={diametrOption}
              variant="outlined"
              onClick={() => handleDiametrClick(diametrOption)}
              style={{
                backgroundColor:
                  diametrOption === selectedDiametr
                    ? `${FILTER_COLORS.BACKGROUND_GREY}`
                    : 'transparent',
              }}>
              {diametrOption}
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

export default FilterFullMenuDiametr;
