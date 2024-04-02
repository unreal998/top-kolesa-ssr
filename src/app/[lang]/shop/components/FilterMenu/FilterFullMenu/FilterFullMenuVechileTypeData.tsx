import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedVechileType } from '@/redux/slices/selectors/shopPageSelectors';
import { type getDictionary } from '@/get-dictionary';
import {
  setVechileTypeChange,
  toggleFullMenu,
} from '@/redux/slices/shopPageSlice';

import styled from '@emotion/styled';
import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { FILTER_COLORS, BASE_COLORS, montserrat } from '@/shared/constants';

const CheckBoxContainer = styled(FormGroup)({
  display: 'grid',
  paddingLeft: '10px',
  gridTemplateColumns: 'repeat(2, 1fr)',
  overflowY: 'auto',
  maxHeight: '400px',
  width: '362px',
});

function FilterFullMenuVechileTypeData({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
}) {
  const dispatch = useDispatch();
  const selectedVechileType = useSelector(selectSelectedVechileType);
  const [vechileType, setVechileType] = useState(selectedVechileType);
  const vechileTypes = ['light', 'lightTruck', 'cargo'];

  const handleTypeChange = useCallback(
    (_: unknown, type: string) => {
      setVechileType(type);
    },
    [vechileType],
  );

  const handleSubmit = () => {
    dispatch(setVechileTypeChange(vechileType));
    dispatch(toggleFullMenu());
  };

  const handleResetFilterSeason = () => {
    dispatch(setVechileTypeChange(''));
    setVechileType('');
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
          cursor: vechileType !== '' ? 'pointer' : 'default',
          color:
            vechileType !== ''
              ? FILTER_COLORS.TEXT_MAIN
              : FILTER_COLORS.BUTTON_RESET_FILTER_INACTIVE,
          transition: 'all 0.2s ease',
        }}>
        <ClearIcon
          style={{
            color:
              vechileType !== ''
                ? FILTER_COLORS.BUTTON_RESET_FILTER
                : FILTER_COLORS.BUTTON_RESET_FILTER_INACTIVE,
            transition: 'all 0.2s ease',
          }}
        />
        <Typography variant="subtitle2" pt={0.2} sx={{}}>
          {dictionary.resetFilter}
        </Typography>
      </Box>
      <RadioGroup onChange={handleTypeChange}>
        <CheckBoxContainer>
          {vechileTypes.map((type) => (
            <FormControlLabel
              control={
                <Radio
                  value={type}
                  checked={vechileType === type}
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
              label={dictionary[type]}
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
        className={montserrat.className}
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

export default FilterFullMenuVechileTypeData;
