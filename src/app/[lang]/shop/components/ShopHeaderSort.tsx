import React, { useCallback } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  styled,
} from '@mui/material';
import { BASE_COLORS, FILTER_COLORS } from '@/shared/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setSortParams, selectSortParams } from '@/redux/slices/shopPageSlice';

const StyledFormControl = styled(FormControl)({
  marginTop: '-44px',
  '& .MuiInput-underline:after': {
    borderBottomColor: BASE_COLORS.DEFAULT_BLUE,
  },
  '& .MuiInputBase-input': {
    backgroundColor: 'transparent !important',
  },
});

const StyledInputLabel = styled(InputLabel)({
  color: BASE_COLORS.DEFAULT_GREY,

  '&.Mui-focused': {
    color: BASE_COLORS.DEFAULT_BLUE,
  },
});

export function ShopHeaderSort() {
  const dispatch = useDispatch();
  const sortParams = useSelector(selectSortParams());

  const handleChangeSetBy = useCallback(
    (event: SelectChangeEvent) => {
      dispatch(
        setSortParams({
          ...sortParams,
          showBy: +event.target.value,
        }),
      );
    },
    [dispatch, sortParams],
  );

  const handleChangeSortBy = useCallback(
    (event: SelectChangeEvent) => {
      dispatch(
        setSortParams({
          ...sortParams,
          sortBy: event.target.value,
        }),
      );
    },
    [dispatch, sortParams],
  );

  const sortItems = [
    { value: 'rated', label: 'rated' },
    { value: 'date', label: 'date' },
    { value: 'priceHigh', label: 'priceHigh' },
    { value: 'priceLow', label: 'priceLow' },
  ];

  const showItems = [10, 20, 30];

  return (
    <Stack justifyContent="end" direction="row" width="22rem" gap="1rem">
      <Stack alignItems="center" width="10rem" direction="row">
        <StyledFormControl
          size="small"
          variant="standard"
          sx={{
            width: '95%',
          }}>
          <StyledInputLabel>{'sortBy'}</StyledInputLabel>
          <Select
            defaultValue={sortParams?.sortBy || 'rated'}
            onChange={handleChangeSortBy}
            MenuProps={{
              sx: {
                '.MuiMenuItem-root': {},
                '.MuiMenuItem-root:hover': {
                  backgroundColor: FILTER_COLORS.DEFAULT_BLUE_INACTIVE,
                },
                '.MuiMenuItem-root.Mui-selected': {
                  backgroundColor: `${BASE_COLORS.DEFAULT_BLUE} !important`,
                  color: `${BASE_COLORS.BACKGROUND_WHITE} !important`,
                },
                '.MuiMenuItem-root.Mui-selected:hover': {
                  backgroundColor: `${FILTER_COLORS.DEFAULT_BLUE_INACTIVE} `,
                  color: `${FILTER_COLORS.TEXT_MAIN} `,
                },
              },
            }}>
            {sortItems.map((sortItem, i) => (
              <MenuItem key={i} value={sortItem?.value}>
                {sortItem.label}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>
      </Stack>
      <Stack alignItems="end" width="7rem" gap="10px" direction="row">
        <StyledFormControl
          size="small"
          variant="standard"
          sx={{
            width: '60%',
          }}>
          <StyledInputLabel
            sx={{
              color: BASE_COLORS.DEFAULT_GREY,
            }}>
            {'show'}
          </StyledInputLabel>
          <Select
            value={sortParams?.showBy?.toString()}
            onChange={handleChangeSetBy}
            label="ShowBy"
            MenuProps={{
              sx: {
                '.MuiMenuItem-root': {},
                '.MuiMenuItem-root:hover': {
                  backgroundColor: FILTER_COLORS.DEFAULT_BLUE_INACTIVE,
                },
                '.MuiMenuItem-root.Mui-selected': {
                  backgroundColor: `${BASE_COLORS.DEFAULT_BLUE} !important`,
                  color: `${BASE_COLORS.BACKGROUND_WHITE} !important`,
                },
                '.MuiMenuItem-root.Mui-selected:hover': {
                  backgroundColor: `${FILTER_COLORS.DEFAULT_BLUE_INACTIVE} `,
                  color: `${FILTER_COLORS.TEXT_MAIN} `,
                },
              },
            }}>
            {showItems.map((showItem, i) => (
              <MenuItem key={i} value={showItem}>
                {showItem}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>
      </Stack>
    </Stack>
  );
}
