import {
  Autocomplete,
  AutocompleteChangeReason,
  Box,
  IconButton,
  List,
  SwipeableDrawer,
  TextField,
  Typography,
} from '@mui/material';
import { BASE_COLORS, FILTER_COLORS, montserrat } from '@/shared/constants';
import Button from '@mui/material/Button';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { inputLabelClasses } from '@mui/material/InputLabel';
import styled from '@emotion/styled';
import {
  setSelectedWidth,
  setSelectedProfile,
  setSelectedDiametr,
  setSeasonChange,
  setBrandChange,
  setStuddedChange,
  setVechileTypeChange,
  setClearSelectedWidth,
  setClearSelectedProfile,
  setClearSelectedDiametr,
  setResetSeason,
  setResetBrand,
  setResetStudded,
} from '@/redux/slices/shopPageSlice';
import { useDispatch, useSelector } from 'react-redux';
import { type getDictionary } from '@/get-dictionary';

import { selectFilterData } from '@/redux/slices/selectors/filterSelectors';
import CloseIcon from '@mui/icons-material/Close';
import {
  selectSelectedBrand,
  selectSelectedDiametr,
  selectSelectedProfile,
  selectSelectedSeason,
  selectSelectedStudded,
  selectSelectedVechileType,
  selectSelectedWidth,
} from '@/redux/slices/selectors/shopPageSelectors';

type FieldType =
  | 'width'
  | 'profile'
  | 'diametr'
  | 'season'
  | 'brand'
  | 'studded'
  | 'vechileType';

type AutocompleteOptionType = {
  id: FieldType;
  value: any;
  options: string[] | number[];
  label: string;
  onChange: (
    event: SyntheticEvent,
    value: unknown,
    reason: AutocompleteChangeReason,
  ) => void;
  onInputChange?: (
    event: SyntheticEvent,
    value: string,
    reason: string,
  ) => void;
};

const StyledAutocomplete = styled(Autocomplete)({
  marginTop: '1rem',
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

const StyledButton = styled(Button)({
  marginTop: '1rem',
  width: '40%',
  height: '50px',
  fontWeight: 'bold',
});

export function MobileFilter({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
}) {
  const dispatch = useDispatch();
  const selectWidth = useSelector(selectSelectedWidth);
  const selectProfile = useSelector(selectSelectedProfile);
  const selectDiametr = useSelector(selectSelectedDiametr);
  const selectedSeason = useSelector(selectSelectedSeason);
  const selectedBrand = useSelector(selectSelectedBrand);
  const selectedStudded = useSelector(selectSelectedStudded);
  const selectedVechileType = useSelector(selectSelectedVechileType);
  const filtersParams = useSelector(selectFilterData());
  const [width, setWidthValue] = useState('');
  const [profile, setProfileValue] = useState('');
  const [diametr, setDiametrValue] = useState('');
  const [season, setSeasonValue] = useState('');
  const [originalSeason, setOriginalSeason] = useState('');
  const [brand, setBrandValue] = useState('');
  const [studded, setStuddedValue] = useState('');
  const [vechileType, setVechileTypeValue] = useState('');
  const [originalStudded, setOriginalStudded] = useState('');
  const [openFilter, setOpenFilter] = useState({
    left: false,
  });

  useEffect(() => {
    setWidthValue(selectWidth);
    setProfileValue(selectProfile);
    setDiametrValue(selectDiametr);
  }, [selectDiametr, selectProfile, selectWidth, selectedBrand]);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      event.stopPropagation();
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setOpenFilter({ left: open });
    };

  const handleSearchButton = () => {
    dispatch(setSelectedWidth(width));
    dispatch(setSelectedProfile(profile));
    dispatch(setSelectedDiametr(diametr));
    dispatch(setSeasonChange([originalSeason]));
    dispatch(setBrandChange([brand]));
    dispatch(setStuddedChange(originalStudded));
    dispatch(setVechileTypeChange(vechileType));

    setOpenFilter({ left: false });

    let seasonParam = '';

    switch (season) {
      case `${dictionary.summer}`:
        seasonParam = 'summer';
        break;
      case `${dictionary.winter}`:
        seasonParam = 'winter';
        break;
      case `${dictionary.allseason}`:
        seasonParam = 'all-season';
        break;
      default:
        seasonParam = '';
        break;
    }
  };

  const handleAutocompleteChange = useCallback(
    (type: FieldType) =>
      (
        event: SyntheticEvent,
        value: unknown,
        reason: AutocompleteChangeReason,
      ) => {
        if (typeof value !== 'string') return;

        switch (type) {
          case 'width':
            setWidthValue(value);
            break;
          case 'profile':
            setProfileValue(value);
            break;
          case 'diametr':
            setDiametrValue(value);
            break;
          case 'season':
            const originalValueSeason = value;
            setSeasonValue(value);
            switch (originalValueSeason) {
              case `${dictionary.summer}`:
                setOriginalSeason('summer');
                break;
              case `${dictionary.winter}`:
                setOriginalSeason('winter');
                break;
              case `${dictionary.allseason}`:
                setOriginalSeason('all-season');
                break;
              default:
                setOriginalSeason('');
                break;
            }
            break;
          case 'brand':
            setBrandValue(value);
            break;
          case 'studded':
            const originalValueStudded = value;
            setStuddedValue(value);
            switch (originalValueStudded) {
              case `${dictionary.studded}`:
                setOriginalStudded('studded');
                break;
              case `${dictionary.studless}`:
                setOriginalStudded('studless');
                break;
              default:
                setOriginalStudded('');
                break;
            }
            break;
          case 'vechileType':
            const originalValueVechileType = value;
            switch (originalValueVechileType) {
              case 'light':
                setVechileTypeValue(dictionary.light);
                break;
              case 'lightTruck':
                setVechileTypeValue(dictionary.lightTruck);
                break;
              case 'cargo':
                setVechileTypeValue(dictionary.cargo);
                break;
              default:
                setVechileTypeValue('');
                break;
            }
            break;
          default:
            break;
        }
      },
    [],
  );

  const handleAutocompleteInputChange = useCallback(
    (type: FieldType) => {
      return (event: SyntheticEvent, value: string, reason: string) => {
        if (reason === 'clear') {
          switch (type) {
            case 'width':
              setWidthValue('');
              dispatch(setClearSelectedWidth());
              break;
            case 'profile':
              setProfileValue('');
              dispatch(setClearSelectedProfile());
              break;
            case 'diametr':
              setDiametrValue('');
              dispatch(setClearSelectedDiametr());
              break;
            case 'season':
              setSeasonValue('');
              dispatch(setResetSeason());
              break;
            case 'brand':
              setBrandValue('');
              dispatch(setResetBrand());
              break;
            case 'studded':
              setStuddedValue('');
              dispatch(setResetStudded());
              break;
            case 'vechileType':
              setVechileTypeValue('');
              setVechileTypeValue(vechileType);
              break;
            default:
              break;
          }
        }
      };
    },
    [dispatch],
  );

  const sortOptions = useCallback((options: (string | number)[]) => {
    const optionsCopy = [...options];
    return optionsCopy
      .filter((param) => param !== '')
      .sort((a, b) => {
        const aStr = a.toString();
        const bStr = b.toString();
        return isNaN(Number(a)) || isNaN(Number(b))
          ? aStr.localeCompare(bStr)
          : Number(a) - Number(b);
      });
  }, []);

  const handleCleareAllFilters = () => {
    setWidthValue('');
    setProfileValue('');
    setDiametrValue('');
    setSeasonValue('');
    setBrandValue('');
    setStuddedValue('');
    setVechileTypeValue('');
    dispatch(setClearSelectedWidth());
    dispatch(setClearSelectedProfile());
    dispatch(setClearSelectedDiametr());
    dispatch(setResetSeason());
    dispatch(setResetBrand());
    dispatch(setResetStudded());
    dispatch(setVechileTypeChange(''));
  };

  const autocompleteOptions: AutocompleteOptionType[] = [
    {
      id: 'width',
      value: width,
      options: filtersParams?.width,
      label: `${dictionary.width}`,
      onChange: handleAutocompleteChange('width'),
      onInputChange: handleAutocompleteInputChange('width'),
    },
    {
      id: 'profile',
      value: profile,
      options: filtersParams?.height,
      label: `${dictionary.profile}`,
      onChange: handleAutocompleteChange('profile'),
      onInputChange: handleAutocompleteInputChange('profile'),
    },
    {
      id: 'diametr',
      value: diametr,
      options: filtersParams?.diametr,
      label: `${dictionary.diametr}`,
      onChange: handleAutocompleteChange('diametr'),
      onInputChange: handleAutocompleteInputChange('diametr'),
    },
    {
      id: 'season',
      value: season,
      options: [
        `${dictionary.summer}`,
        `${dictionary.winter}`,
        `${dictionary.allseason}`,
      ],
      label: `${dictionary.season}`,
      onChange: handleAutocompleteChange('season'),
      onInputChange: handleAutocompleteInputChange('season'),
    },
    {
      id: 'brand',
      value: brand,
      options: filtersParams?.brands,
      label: `${dictionary.brand}`,
      onChange: handleAutocompleteChange('brand'),
      onInputChange: handleAutocompleteInputChange('brand'),
    },
    {
      id: 'vechileType',
      value: vechileType,
      options: [
        `${dictionary.light}`,
        `${dictionary.lightTruck}`,
        `${dictionary.cargo}`,
      ],
      label: `${dictionary.vechileType}`,
      onChange: handleAutocompleteChange('vechileType'),
      onInputChange: handleAutocompleteInputChange('vechileType'),
    },
    {
      id: 'studded',
      value: studded,
      options: [`${dictionary.studded}`, `${dictionary.studless}`],
      label: `${dictionary.studdedFilterName}`,
      onChange: handleAutocompleteChange('studded'),
      onInputChange: handleAutocompleteInputChange('studded'),
    },
  ];

  return (
    <>
      <Button
        onClick={toggleDrawer(true)}
        variant="text"
        sx={{
          padding: '0px',
          margin: '0px',
          '@media (max-width: 918px)': {
            minWidth: 0,
          },
        }}>
        <FilterAltOutlinedIcon
          fontSize="large"
          sx={{
            color: 'white',
          }}
        />
        <Typography
          variant="subtitle1"
          sx={{ color: 'white', marginTop: '0.2rem', paddingLeft: '0.4rem' }}>
          {dictionary.filters}
        </Typography>
      </Button>
      <SwipeableDrawer
        anchor={'left'}
        open={openFilter.left}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        sx={{
          '@media (min-width: 918px)': {
            display: 'none',
          },
        }}>
        <Box
          width={'50vw'}
          role="presentation"
          sx={{ '@media (max-width: 600px)': { width: '100vw' } }}>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            height={'1.6rem'}
            padding="1.1rem 4%"
            gap={1}
            color={'#fff'}
            bgcolor={BASE_COLORS.DEFAULT_BLUE}>
            <FilterAltOutlinedIcon
              fontSize="large"
              sx={{
                color: 'white',
              }}
            />
            <Typography variant="h5" fontWeight={600}>
              {dictionary.filters}
            </Typography>
            <IconButton
              onClick={toggleDrawer(false)}
              sx={{
                color: FILTER_COLORS.BUTTON_RESET_FILTER,
                padding: 0,
                position: 'absolute',
                right: '10px',
              }}>
              <CloseIcon
                sx={{
                  height: '2rem',
                  width: '2rem',
                  padding: 0,
                  color: '#fff',
                }}
              />
            </IconButton>
          </Box>
          <List
            sx={{
              marginLeft: '8%',
              marginTop: '1rem',
            }}>
            {autocompleteOptions.map(
              ({ id, value, options, label, onChange }) => (
                <StyledAutocomplete
                  key={id}
                  value={value}
                  clearIcon={value ? undefined : false}
                  disablePortal
                  onChange={onChange}
                  onInputChange={handleAutocompleteInputChange(id)}
                  options={
                    id === 'width' || id === 'brand'
                      ? sortOptions(options)
                      : options
                  }
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
                  sx={{
                    width: '90%',
                  }}
                />
              ),
            )}
            <Box display={'flex'} width={'91%'} justifyContent={'space-around'}>
              <StyledButton
                variant="contained"
                className={montserrat.className}
                onClick={handleCleareAllFilters}
                sx={{
                  color: FILTER_COLORS.TEXT_MAIN,
                  background: FILTER_COLORS.SHORT_MENU_RESET_BUTTON_BACKGROUND,
                  fontSize: '1rem',
                  '&:hover': {
                    background:
                      FILTER_COLORS.SHORT_MENU_RESET_BUTTON_BACKGROUND,
                  },
                }}>
                {dictionary.resetFilter}
              </StyledButton>
              <StyledButton
                variant="contained"
                className={montserrat.className}
                onClick={handleSearchButton}
                sx={{
                  background: BASE_COLORS.DEFAULT_BLUE,
                  fontSize: '1.4rem',
                  '&:hover': {
                    background: BASE_COLORS.DEFAULT_BLUE,
                  },
                }}>
                {dictionary.searchButton}
              </StyledButton>
            </Box>
          </List>
        </Box>
      </SwipeableDrawer>
    </>
  );
}
