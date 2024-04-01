import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedStudded } from '@/redux/slices/selectors/shopPageSelectors';
import {
  setStuddedChange,
  toggleFullMenu,
  setResetStudded,
} from '@/redux/slices/shopPageSlice';
import { type getDictionary } from '@/get-dictionary';

import styled from '@emotion/styled';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { FILTER_COLORS, BASE_COLORS } from '@/shared/constants';

const CheckBoxContainer = styled(FormGroup)({
  display: 'grid',
  paddingLeft: '10px',
  gridTemplateColumns: 'repeat(2, 1fr)',
  overflowY: 'auto',
  maxHeight: '400px',
  width: '362px',
});

function FilterFullMenuStuddedData({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
}) {
  const dispatch = useDispatch();
  const selectedStudded = useSelector(selectSelectedStudded);
  const [studded, setStudded] = useState(selectedStudded);
  const studdedTypes = ['studded', 'studless'];

  const handleSeasonChange = useCallback(
    (_: unknown, type: string) => {
      setStudded(type);
    },
    [studded],
  );

  const handleSubmit = () => {
    dispatch(setStuddedChange(studded));
    dispatch(toggleFullMenu());
  };

  const handleResetFilterSeason = () => {
    dispatch(setResetStudded());
    setStudded('');
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
            studded.length > 0 || selectedStudded.length > 0
              ? 'pointer'
              : 'default',
          color:
            studded.length > 0 || selectedStudded.length > 0
              ? FILTER_COLORS.TEXT_MAIN
              : FILTER_COLORS.BUTTON_RESET_FILTER_INACTIVE,
          transition: 'all 0.2s ease',
        }}>
        <ClearIcon
          style={{
            color:
              studded.length > 0 || selectedStudded.length > 0
                ? FILTER_COLORS.BUTTON_RESET_FILTER
                : FILTER_COLORS.BUTTON_RESET_FILTER_INACTIVE,
            transition: 'all 0.2s ease',
          }}
        />
        <Typography variant="subtitle2" pt={0.2} sx={{}}>
          {dictionary.resetFilter}
        </Typography>
      </Box>
      <RadioGroup onChange={handleSeasonChange}>
        <CheckBoxContainer>
          {studdedTypes.map((type) => (
            <FormControlLabel
              control={
                <Radio
                  value={type}
                  checked={studded === type}
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
              label={dictionary[type as keyof typeof dictionary]}
              key={type}
              sx={{
                '& .MuiTypography-root': {},
              }}
            />
          ))}
        </CheckBoxContainer>
      </RadioGroup>
      <Button
        onClick={handleSubmit}
        variant="contained"
        sx={{
          marginTop: '18px',

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

export default FilterFullMenuStuddedData;
