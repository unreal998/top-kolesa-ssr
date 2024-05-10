import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSelectedProfile,
  toggleFullMenu,
} from '@/redux/slices/shopPageSlice';
import { selectFilterData } from '@/redux/slices/selectors/filterSelectors';
import { type getDictionary } from '@/get-dictionary';
import {
  selectSearchInput,
  selectSelectedProfile,
} from '@/redux/slices/selectors/shopPageSelectors';

import { Box, Button, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from '@mui/material/styles';

import { FILTER_COLORS } from '@/shared/constants';
import { montserrat } from '@/shared/constants';

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

function FilterFullMenuProfileData({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
}) {
  const dispatch = useDispatch();
  const searchInput = useSelector(selectSearchInput);
  const selectedProfile = useSelector(selectSelectedProfile);
  const filtersParams = useSelector(selectFilterData());
  const [filteredProfileOptions, setFilteredProfileOptions] = useState(
    filtersParams.height,
  );

  useEffect(() => {
    const filtered = filtersParams.height
      .filter((option) => option.includes(searchInput))
      .sort((a, b) => Number(a) - Number(b));
    setFilteredProfileOptions(filtered);
  }, [searchInput, filtersParams.height]);

  const handleProfileClick = useCallback(
    (profile: string) => {
      dispatch(setSelectedProfile(profile));
      dispatch(toggleFullMenu());
    },
    [dispatch],
  );

  const handleResetFilterDiametr = () => {
    dispatch(setSelectedProfile(''));
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
          cursor: selectedProfile.length > 0 ? 'pointer' : 'default',
          color:
            selectedProfile.length > 0
              ? FILTER_COLORS.TEXT_MAIN
              : FILTER_COLORS.BUTTON_RESET_FILTER_INACTIVE,
          transition: 'all 0.2s ease',
        }}>
        <ClearIcon
          style={{
            color:
              selectedProfile.length > 0
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
        {filteredProfileOptions.length > 0 ? (
          filteredProfileOptions.map((heightOption) => (
            <StyledButton
              key={heightOption}
              variant="outlined"
              className={montserrat.className}
              onClick={() => handleProfileClick(heightOption)}
              style={{
                backgroundColor:
                  heightOption === selectedProfile
                    ? `${FILTER_COLORS.BACKGROUND_GREY}`
                    : 'transparent',
              }}>
              {heightOption}
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

export default FilterFullMenuProfileData;
