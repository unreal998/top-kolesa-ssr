import { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type getDictionary } from '@/get-dictionary';
import {
  selectSearchInput,
  selectSelectedSeason,
} from '@/redux/slices/selectors/shopPageSelectors';
import {
  setSeasonChange,
  toggleFullMenu,
  setResetSeason,
} from '@/redux/slices/shopPageSlice';

import styled from '@emotion/styled';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import {
  FILTER_COLORS,
  FONTS,
  BASE_COLORS,
  montserrat,
} from '@/shared/constants';

const CheckBoxContainer = styled(FormGroup)({
  display: 'grid',
  paddingLeft: '10px',
  gridTemplateColumns: 'repeat(2, 1fr)',
  overflowY: 'auto',
  maxHeight: '400px',
  width: '362px',
});

function FilterFullMenuSeasonData({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
}) {
  const dispatch = useDispatch();
  const selectedSeason = useSelector(selectSelectedSeason);
  const searchInput = useSelector(selectSearchInput);
  const [season, setSeason] = useState(selectedSeason);

  const filteredSeasons = useMemo(() => {
    return [dictionary.winter, dictionary.summer, dictionary.allseason].filter(
      (season) => season.toLowerCase().includes(searchInput.toLowerCase()),
    );
  }, [searchInput]);

  const handleSeasonChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, seasonName: string) => {
      const updatedSeasons = e.target.checked
        ? [...season, seasonName]
        : season.filter((s) => s !== seasonName);
      setSeason(updatedSeasons);
    },
    [season],
  );

  const handleSubmit = () => {
    dispatch(setSeasonChange(season));
    dispatch(toggleFullMenu());
  };

  const handleResetFilterSeason = () => {
    dispatch(setResetSeason());
    setSeason([]);
  };

  return (
    <>
      <Box
        onClick={handleResetFilterSeason}
        sx={{
          display: 'flex',
          alignItems: 'center',
          fontSize: '12px',
          marginBottom: '12px',
          width: 'fit-content',
          cursor:
            selectedSeason.length > 0 || season.length > 0
              ? 'pointer'
              : 'default',
          color:
            selectedSeason.length > 0 || season.length > 0
              ? FILTER_COLORS.TEXT_MAIN
              : FILTER_COLORS.BUTTON_RESET_FILTER_INACTIVE,
          transition: 'all 0.2s ease',
        }}>
        <ClearIcon
          style={{
            color:
              selectedSeason.length > 0 || season.length > 0
                ? FILTER_COLORS.BUTTON_RESET_FILTER
                : FILTER_COLORS.BUTTON_RESET_FILTER_INACTIVE,
            transition: 'all 0.2s ease',
          }}
        />
        <Typography
          variant="subtitle2"
          pt={0.2}
          sx={{
            fontFamily: FONTS.MAIN_TEXT_FAMILY,
          }}>
          {dictionary.resetFilter}
        </Typography>
      </Box>
      <CheckBoxContainer>
        {filteredSeasons.length > 0 ? (
          filteredSeasons.map((seasonName, i) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={season.includes(
                    i === 0 ? 'winter' : i === 1 ? 'summer' : 'all-season',
                  )}
                  onChange={(e) =>
                    handleSeasonChange(
                      e,
                      i === 0 ? 'winter' : i === 1 ? 'summer' : 'all-season',
                    )
                  }
                  sx={{
                    '&.Mui-checked': {
                      color: BASE_COLORS.DEFAULT_BLUE,
                      '&:after': {
                        backgroundColor: BASE_COLORS.DEFAULT_BLUE,
                      },
                    },
                  }}
                />
              }
              label={seasonName}
              key={seasonName}
              sx={{
                '& .MuiTypography-root': {
                  fontFamily: FONTS.MAIN_TEXT_FAMILY,
                },
              }}
            />
          ))
        ) : (
          <Typography
            variant="subtitle2"
            sx={{
              fontFamily: FONTS.MAIN_TEXT_FAMILY,
              marginTop: '20px',
            }}>
            {dictionary.noMatchesFound}
          </Typography>
        )}
      </CheckBoxContainer>
      <Button
        onClick={handleSubmit}
        className={montserrat.className}
        variant="contained"
        sx={{
          marginTop: '18px',
          fontFamily: FONTS.BOLD_TEXT_FAMILY,
          fontWeight: 'bold',
          background: BASE_COLORS.DEFAULT_BLUE,
          '&:hover': {
            background: BASE_COLORS.DEFAULT_BLUE,
          },
        }}>
        {dictionary.set}
      </Button>
    </>
  );
}

export default FilterFullMenuSeasonData;
