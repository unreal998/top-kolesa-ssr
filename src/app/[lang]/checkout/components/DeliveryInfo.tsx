import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import {
  BASE_COLORS,
  FILTER_COLORS,
  FONTS,
  montserrat,
} from '@/shared/constants';
import styled from '@emotion/styled';
import { inputLabelClasses } from '@mui/material/InputLabel';
import { SyntheticEvent } from 'react';
import { type getDictionary } from '@/get-dictionary';
import { useDispatch } from 'react-redux';

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-input': {
    fontFamily: FONTS.MAIN_TEXT_FAMILY,
  },
  '& .MuiInputLabel-input': {
    fontFamily: FONTS.MAIN_TEXT_FAMILY,
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: BASE_COLORS.DEFAULT_BLUE,
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: BASE_COLORS.DEFAULT_BLUE,
  },
  '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    borderColor: BASE_COLORS.DEFAULT_BLUE,
  },
});

const StyledAutocomplete = styled(Autocomplete)({
  //LABEL COLOR/FONTS
  [`& .${inputLabelClasses.root}`]: {
    fontFamily: FONTS.MAIN_TEXT_FAMILY,

    [`&.${inputLabelClasses.focused}`]: {
      color: BASE_COLORS.DEFAULT_BLUE,
    },
  },

  //OPTION COLOR/FONTS
  '& + .MuiAutocomplete-popper .MuiAutocomplete-option': {
    fontFamily: FONTS.MAIN_TEXT_FAMILY,
    fontSize: '16px',
  },
  '& + .MuiAutocomplete-popper .MuiAutocomplete-option:hover': {
    backgroundColor: FILTER_COLORS.DEFAULT_BLUE_INACTIVE,
  },
  "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected='true']:hover":
    {
      backgroundColor: `${FILTER_COLORS.DEFAULT_BLUE_INACTIVE} !important`,
      color: `${FILTER_COLORS.TEXT_MAIN} !important`,
      fontSize: '16px',
    },
  "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected='true']": {
    backgroundColor: `${BASE_COLORS.DEFAULT_BLUE} !important`,
    color: `${BASE_COLORS.BACKGROUND_WHITE}`,
    fontSize: '16px',
  },
});

const StyledRadio = styled(Radio)({
  '&.Mui-checked': {
    color: BASE_COLORS.DEFAULT_BLUE,
  },
});

type OptionType = {
  title: string;
};

type DeliveryInfoProps = {
  changeDeliveryState: (value: string) => void;
  deliveryState: string;
  setInputedCityName: (value: string) => void;
  setSelectedWarehouse: (value: string) => void;
  optionsData: OptionType[] | string[];
  handleCityTextChange: (e: SyntheticEvent) => void;
  handleWarehouseTextChange: (e: SyntheticEvent) => void;
  optionsWarehouseData: OptionType[] | string[];
  handlePickup: () => void;
  handleDelivery: () => void;
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
};

export function DeliveryInfo({
  changeDeliveryState,
  deliveryState,
  setInputedCityName,
  setSelectedWarehouse,
  optionsData,
  handleCityTextChange,
  handleWarehouseTextChange,
  optionsWarehouseData,
  handlePickup,
  handleDelivery,
  dictionary,
}: DeliveryInfoProps) {
  const dispatch = useDispatch();

  return (
    <Stack
      gap="5px"
      bgcolor={BASE_COLORS.BACKGROUND_WHITE}
      p={'2rem'}
      borderRadius={'0.5rem'}
      height={'14rem'}>
      <Typography
        variant="h6"
        fontWeight={600}
        pb={'1rem'}
        className={montserrat.className}>
        {dictionary.delivery}
      </Typography>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="post"
          name="radio-buttons-group"
          onChange={(e, value) => changeDeliveryState(value)}
          sx={{ flexDirection: 'row' }}>
          <FormControlLabel
            value="self"
            control={<StyledRadio />}
            onClick={handlePickup}
            label={
              <Typography
                variant="subtitle1"
                fontSize={'1.1rem'}
                fontFamily={FONTS.MAIN_TEXT_FAMILY}>
                {dictionary.pickup}
              </Typography>
            }
          />
          <FormControlLabel
            value="post"
            control={<StyledRadio />}
            onClick={handleDelivery}
            label={
              <Typography
                variant="subtitle1"
                fontSize={'1.1rem'}
                fontFamily={FONTS.MAIN_TEXT_FAMILY}>
                {dictionary.novaPoshta}
              </Typography>
            }
          />
          {deliveryState === 'self' && (
            <FormControl sx={{ ml: '20px', width: '100%' }}>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={dictionary.headerAddress}
                name="radio-buttons-group"
                onChange={(e, value) => {
                  setInputedCityName('м. Вінниця');
                  setSelectedWarehouse(value);
                }}
                sx={{ py: '1rem' }}>
                <FormControlLabel
                  value={dictionary.headerAddress}
                  control={<StyledRadio />}
                  label={
                    <Typography
                      variant="subtitle1"
                      fontSize={'1.1rem'}
                      fontFamily={FONTS.MAIN_TEXT_FAMILY}>
                      {dictionary.headerAddress}
                    </Typography>
                  }
                />
                <FormControlLabel
                  value={dictionary.pickupAddress2}
                  control={<StyledRadio />}
                  label={
                    <Typography
                      variant="subtitle1"
                      fontSize={'1.1rem'}
                      fontFamily={FONTS.MAIN_TEXT_FAMILY}>
                      {dictionary.pickupAddress2}
                    </Typography>
                  }
                />
              </RadioGroup>
            </FormControl>
          )}
        </RadioGroup>
      </FormControl>
      {deliveryState === 'post' && (
        <Stack gap="1.5rem">
          <StyledAutocomplete
            freeSolo
            disableClearable
            disablePortal
            options={optionsData}
            onSelect={(e) => handleCityTextChange(e)}
            onChange={(e, newValue) => {
              setInputedCityName(newValue as string);
            }}
            renderInput={(params: any) => (
              <StyledTextField
                required={true}
                {...params}
                label={dictionary.city}
              />
            )}
          />
          <StyledAutocomplete
            freeSolo
            disableClearable
            disablePortal
            onSelect={(e) => handleWarehouseTextChange(e)}
            onChange={(e, newValue) => setSelectedWarehouse(newValue as string)}
            options={optionsWarehouseData}
            renderInput={(params: any) => (
              <StyledTextField
                required={true}
                {...params}
                label={dictionary.warehouse}
              />
            )}
          />
        </Stack>
      )}
    </Stack>
  );
}
