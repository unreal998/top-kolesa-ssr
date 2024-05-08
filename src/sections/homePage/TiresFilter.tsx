'use client';

import { SyntheticEvent, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { type getDictionary } from '../../get-dictionary';

import {
  Autocomplete,
  AutocompleteChangeReason,
  Button,
  Stack,
  TextField,
  Typography,
  styled,
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { inputLabelClasses } from '@mui/material/InputLabel';
import { ButtonWithIcon } from '../../shared/components/ButtonWithIcon';
import { BASE_COLORS, FILTER_COLORS } from '../../shared/constants';
import { selectFilterData } from '@/redux/slices/selectors/filterSelectors';
import {
  setSelectedWidth,
  setSelectedProfile,
  setSelectedDiametr,
  setSeasonChange,
  setBrandChange,
} from '@/redux/slices/shopPageSlice';
import Link from 'next/link';
import { montserrat } from '@/shared/constants';

const StyledFilterBox = styled(Stack)({
  backgroundColor: BASE_COLORS.BACKGROUND_WHITE,
  borderRadius: '20px',
  padding: '40px 20px',
  justifyContent: 'center',
  flexWrap: 'wrap',
  width: '440px',
  flexDirection: 'row',
  gap: '20px',
  '@media (max-width: 550px)': {
    width: '30rem',
  },
  '@media (max-width: 420px)': {
    width: '25rem',
  },
  '@media (max-width: 390px)': {
    width: '22rem',
  },
});

type FieldType = 'width' | 'profile' | 'diametr' | 'season' | 'brand';

type AutocompleteOptionType = {
  id: FieldType;
  options: string[] | number[];
  label: string;
  onChange: (
    event: SyntheticEvent,
    value: unknown,
    reason: AutocompleteChangeReason,
  ) => void;
};

const StyledAutocomplete = styled(Autocomplete)({
  //LABEL COLOR/FONTS
  '&:hover': {
    [`& .${inputLabelClasses.root}.${inputLabelClasses.shrink}`]: {
      color: BASE_COLORS.DEFAULT_BLUE,
    },
  },
  [`& .${inputLabelClasses.root}`]: {
    color: 'defaultColor',
    fontSize: '16px',
    [`&.${inputLabelClasses.focused}`]: {
      color: BASE_COLORS.DEFAULT_BLUE,
    },
  },
  //INPUT COLOR/FONTS
  '& .MuiOutlinedInput-root': {
    fontSize: '16px',
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: BASE_COLORS.DEFAULT_BLUE,
      color: BASE_COLORS.DEFAULT_BLUE,
      fontSize: '16px',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: BASE_COLORS.DEFAULT_BLUE,
    },
    '&.Mui-focused .MuiInputLabel-root': {
      color: BASE_COLORS.DEFAULT_BLUE,
    },
  },
  '& .MuiAutocomplete-clearIndicator': {
    color: FILTER_COLORS.BUTTON_RESET_FILTER,
  },

  //OPTION COLOR/FONTS
  '& + .MuiAutocomplete-popper .MuiAutocomplete-option': {
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

function TiresFilter({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
}) {
  const dispatch = useDispatch();
  /* const history = useNavigate(); */
  const filtersParams = useSelector(selectFilterData());
  const [width, setWidthValue] = useState('');
  const [profile, setProfileValue] = useState('');
  const [diametr, setDiametrValue] = useState('');
  const [season, setSeasonValue] = useState('');
  const [brand, setBrandValue] = useState('');

  const handleSearchButton = () => {
    dispatch(setSelectedWidth(width));
    dispatch(setSelectedProfile(profile));
    dispatch(setSelectedDiametr(diametr));
    dispatch(setSeasonChange([season]));
    dispatch(setBrandChange([brand]));
  };

  const handleAutocompleteChange = useCallback(
    (type: FieldType) =>
      (
        event: SyntheticEvent,
        value: unknown,
        reason: AutocompleteChangeReason,
      ) => {
        const newValue = typeof value === 'string' ? value : '';
        switch (type) {
          case 'width':
            setWidthValue(newValue);
            break;
          case 'profile':
            setProfileValue(newValue);
            break;
          case 'diametr':
            setDiametrValue(newValue);
            break;
          case 'season':
            setSeasonValue(
              value === `${dictionary.summer}`
                ? 'summer'
                : value === `${dictionary.winter}`
                  ? 'winter'
                  : value === `${dictionary.allseason}`
                    ? 'all-season'
                    : '',
            );
            break;
          case 'brand':
            setBrandValue(newValue);
            break;
          default:
            break;
        }
      },
    [],
  );

  const sortOptions = useCallback((options: (string | number)[]) => {
    const optionsCopy = [...options];
    return optionsCopy.sort((a, b) => {
      const aStr = a.toString();
      const bStr = b.toString();
      return isNaN(Number(a)) || isNaN(Number(b))
        ? aStr.localeCompare(bStr)
        : Number(a) - Number(b);
    });
  }, []);

  const autocompleteOptions: AutocompleteOptionType[] = [
    {
      id: 'width',
      options: filtersParams?.width.slice(1),
      label: `${dictionary.width}`,
      onChange: handleAutocompleteChange('width'),
    },
    {
      id: 'profile',
      options: filtersParams?.height.slice(1),
      label: `${dictionary.profile}`,
      onChange: handleAutocompleteChange('profile'),
    },
    {
      id: 'diametr',
      options: filtersParams?.diametr.slice(1),
      label: `${dictionary.diametr}`,
      onChange: handleAutocompleteChange('diametr'),
    },
    {
      id: 'season',
      options: [dictionary.summer, dictionary.winter, dictionary.allseason],
      label: `${dictionary.season}`,
      onChange: handleAutocompleteChange('season'),
    },
    {
      id: 'brand',
      options: filtersParams?.brands,
      label: `${dictionary.brand}`,
      onChange: handleAutocompleteChange('brand'),
    },
  ];

  return (
    <Stack gap="25px" alignItems="center">
      <Typography
        variant="h3"
        color="#ffffff"
        fontWeight="600"
        className={montserrat.className}
        textAlign={'center'}>
        {dictionary.tireSelection}
      </Typography>
      <StyledFilterBox>
        {autocompleteOptions.map(({ id, options, label, onChange }) => (
          <StyledAutocomplete
            key={id}
            disablePortal
            clearOnBlur={false}
            onChange={handleAutocompleteChange(id)}
            options={
              id === 'width' || id === 'brand' ? sortOptions(options) : options
            }
            sx={{
              width: id === 'season' || id === 'brand' ? 190 : 120,
              '@media (max-width: 550px)': {
                width: '85%',
              },
            }}
            renderInput={(params) => (
              <TextField
                label={label}
                {...params}
                InputLabelProps={{
                  ...params.InputLabelProps,
                  children: undefined,
                }}
              />
            )}
          />
        ))}
      </StyledFilterBox>
      <Link href="/shop">
        <ButtonWithIcon
          button={
            <Button
              variant="contained"
              onClick={handleSearchButton}
              sx={{
                backgroundColor: BASE_COLORS.DEFAULT_BLUE,
                fontWeight: '600',
                borderRadius: '999px',
                padding: '20px 40px',
                fontSize: '0.9rem',
                '@media (max-width: 800px)': {
                  fontSize: '13px',
                },
              }}>
              {dictionary.searchButton}
            </Button>
          }
          icon={<ArrowRightIcon />}></ButtonWithIcon>
      </Link>
    </Stack>
  );
}
export default TiresFilter;
