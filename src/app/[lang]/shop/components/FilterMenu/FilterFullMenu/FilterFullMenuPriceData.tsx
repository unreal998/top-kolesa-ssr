import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { type getDictionary } from '@/get-dictionary';
import {
  setResetPriceRange,
  initializePriceRange,
  setPriceChange,
  toggleFullMenu,
} from '@/redux/slices/shopPageSlice';
import { selectSelectedPrice } from '@/redux/slices/selectors/shopPageSelectors';

import {
  Box,
  TextField,
  Typography,
  Button,
  Slider,
  styled,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { selectFilterData } from '@/redux/slices/selectors/filterSelectors';

import { FILTER_COLORS, BASE_COLORS } from '@/shared/constants';

const StyledTextField = styled(TextField)({
  width: '150px',
  '& .MuiInputBase-input': {},
  '& .MuiInputLabel-input': {},
  '& .MuiInputLabel-root.Mui-focused': {
    color: BASE_COLORS.DEFAULT_BLUE,
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: BASE_COLORS.DEFAULT_BLUE,
  },
  '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    borderColor: BASE_COLORS.DEFAULT_BLUE,
  },
  '&:hover .MuiInputLabel-root': {
    color: BASE_COLORS.DEFAULT_BLUE,
  },
});

function FilterFullMenuPriceData({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
}) {
  const dispatch = useDispatch();
  const filtersParams = useSelector(selectFilterData());
  const selectedPriceGlobal = useSelector(selectSelectedPrice);
  const [tempPrice, setTempPrice] = useState(selectedPriceGlobal);

  const minPrice = Math.min(...filtersParams.prices);
  const maxPrice = Math.max(...filtersParams.prices);

  const handlePriceChange = useCallback(
    (event: Event, newValue: number | number[]) => {
      setTempPrice(newValue as number[]);
    },
    [],
  );

  const handleLeftSliderChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let newMinPrice = Math.max(
        parseInt(event.target.value, 10),
        Math.min(...filtersParams.prices),
      );
      newMinPrice = Math.min(newMinPrice, tempPrice[1]);
      setTempPrice([newMinPrice, tempPrice[1]]);
    },
    [tempPrice, filtersParams.prices],
  );

  const handleRightSliderChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let newMaxPrice = Math.min(
        parseInt(event.target.value, 10),
        Math.max(...filtersParams.prices),
      );
      newMaxPrice = Math.max(newMaxPrice, tempPrice[0]);
      setTempPrice([tempPrice[0], newMaxPrice]);
    },
    [tempPrice, filtersParams.prices],
  );

  const handleResetFilterPrice = () => {
    dispatch(setResetPriceRange());
    dispatch(initializePriceRange([minPrice, maxPrice]));
    setTempPrice([minPrice, maxPrice]);
  };

  const handleApplyFilterPrice = () => {
    dispatch(setPriceChange(tempPrice));
    dispatch(toggleFullMenu());
  };

  return (
    <Box
      display="flex"
      flexDirection={'column'}
      sx={{
        width: '352px',
        padding: '10px',
      }}>
      <Box
        onClick={handleResetFilterPrice}
        sx={{
          display: 'flex',
          alignItems: 'center',
          fontSize: '12px',
          marginBottom: '32px',
          width: 'fit-content',
          cursor:
            (minPrice !== tempPrice[0] && maxPrice !== tempPrice[1]) ||
            tempPrice[0] !== minPrice ||
            tempPrice[1] !== maxPrice
              ? 'pointer'
              : 'default',
          color:
            (minPrice !== tempPrice[0] && maxPrice !== tempPrice[1]) ||
            tempPrice[0] !== minPrice ||
            tempPrice[1] !== maxPrice
              ? FILTER_COLORS.TEXT_MAIN
              : FILTER_COLORS.BUTTON_RESET_FILTER_INACTIVE,
          transition: 'all 0.2s ease',
        }}>
        <ClearIcon
          style={{
            color:
              (minPrice !== tempPrice[0] && maxPrice !== tempPrice[1]) ||
              tempPrice[0] !== minPrice ||
              tempPrice[1] !== maxPrice
                ? FILTER_COLORS.BUTTON_RESET_FILTER
                : FILTER_COLORS.BUTTON_RESET_FILTER_INACTIVE,
            transition: 'all 0.2s ease',
          }}
        />
        <Typography variant="subtitle2" pt={0.2} sx={{}}>
          {dictionary.resetFilter}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-around" marginBottom="20px">
        <StyledTextField
          label={dictionary.minPrice}
          variant="outlined"
          value={tempPrice[0]}
          onChange={handleLeftSliderChange}
          type="number"
        />
        <StyledTextField
          label={dictionary.maxPrice}
          variant="outlined"
          value={tempPrice[1]}
          onChange={handleRightSliderChange}
          type="number"
        />
      </Box>
      <Slider
        value={tempPrice}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        step={100}
        min={Math.min.apply(null, filtersParams.prices)}
        max={Math.max.apply(null, filtersParams.prices)}
        sx={{
          width: '90%',
          margin: '0 auto',
          color: BASE_COLORS.DEFAULT_BLUE,
          '& .MuiSlider-valueLabel': {},
        }}
      />
      <Button
        onClick={handleApplyFilterPrice}
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
    </Box>
  );
}
export default FilterFullMenuPriceData;
