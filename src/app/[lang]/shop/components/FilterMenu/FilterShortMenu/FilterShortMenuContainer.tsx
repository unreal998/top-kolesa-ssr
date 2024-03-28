import { useDispatch, useSelector } from 'react-redux';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import {
  initializePriceRange,
  setClearSelectedWidth,
  setClearSelectedProfile,
  setClearSelectedDiametr,
  setResetSeason,
  setResetBrand,
  setResetStudded,
  setVechileTypeChange,
  setSeasonChange,
  setStuddedChange,
  setBrandChange,
} from '@/redux/slices/shopPageSlice';
import {
  selectSelectedBrand,
  selectSelectedDiametr,
  selectSelectedPrice,
  selectSelectedProfile,
  selectSelectedSeason,
  selectSelectedStudded,
  selectSelectedVechileType,
  selectSelectedWidth,
} from '@/redux/slices/shopPageSlice';
import { selectFilterData } from '@/redux/slices/selectors/filterSelectors';

import FilterShortMenuRow from './FilterShortMenuRow';
import FilterShortMenuColumnPrice from './FilterShortMenuColumnPrice';
import FilterShortMenuColumn from './FilterShortMenuColumn';
import FilterShortMenuReset from './FilterShortMenuReset';

import { ButtonGroup } from '@mui/material';

import WidthIcon from '@/shared/Icons/WidthIcon';
import ProfileIcon from '@/shared/Icons/ProfileIcon';
import DiametrIcon from '@/shared/Icons/DiametrIcon';
import PriceIcon from '@/shared/Icons/PriceIcon';
import SeasonIcon from '@/shared/Icons/SeasonIcon';
import BrandIcon from '@/shared/Icons/BrandIcon';
import ResetIcon from '@/shared/Icons/ResetIcon';
import StuddedTireIcon from '@/shared/Icons/StuddedTireIcon';
import { PayloadAction } from 'typesafe-actions';
import { PayloadAction as PayloadActionRedux } from '@reduxjs/toolkit';
import { useCallback, useEffect } from 'react';

const FilterShortMenuContainer = () => {
  const dispatch = useDispatch();
  const filtersParams = useSelector(selectFilterData());
  const selectWidth = useSelector(selectSelectedWidth);
  const selectProfile = useSelector(selectSelectedProfile);
  const selectDiametr = useSelector(selectSelectedDiametr);
  const selectedPrice = useSelector(selectSelectedPrice);
  const selectedSeason = useSelector(selectSelectedSeason);
  const selectedBrand = useSelector(selectSelectedBrand);
  const selectedStudded = useSelector(selectSelectedStudded);
  const selectedVechileType = useSelector(selectSelectedVechileType);
  const minPrice = Math.min(...filtersParams.prices);
  const maxPrice = Math.max(...filtersParams.prices);

  const visableResetButton =
    selectedPrice?.[0] !== minPrice ||
    selectedPrice?.[1] !== maxPrice ||
    selectWidth?.length > 0 ||
    selectProfile?.length > 0 ||
    selectDiametr?.length > 0 ||
    (selectedSeason?.length > 0 &&
      (selectedSeason?.length > 1 || selectedSeason?.[0] !== '')) ||
    (selectedBrand?.length > 0 &&
      (selectedBrand?.length > 1 || selectedBrand?.[0] !== '')) ||
    selectedStudded?.length > 0 ||
    selectedVechileType !== '';

  const handleClearRowsFilters = () => {
    return (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      filterAction: () => PayloadAction<string, void | string>,
    ) => {
      e.stopPropagation();
      dispatch(filterAction());
    };
  };

  const handleClearPrice = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      dispatch(initializePriceRange([minPrice, maxPrice]));
    },
    [dispatch, minPrice, maxPrice],
  );

  const handleClearColumnFilters = useCallback(
    (
      filterItems: string[] | string,
      itemToRemove: string,
      updateAction: any,
    ) => {
      return () => {
        if (Array.isArray(filterItems)) {
          const updatedItems = filterItems.filter(
            (item) => item !== itemToRemove,
          );
          dispatch(updateAction(updatedItems));
        } else {
          dispatch(updateAction(''));
        }
      };
    },
    [dispatch],
  );

  function handleCleareAllFilters() {
    dispatch(setClearSelectedWidth());
    dispatch(setClearSelectedProfile());
    dispatch(setClearSelectedDiametr());
    dispatch(initializePriceRange([minPrice, maxPrice]));
    dispatch(setResetSeason());
    dispatch(setResetBrand());
    dispatch(setResetStudded());
    dispatch(setVechileTypeChange(''));
  }

  return (
    <ButtonGroup
      orientation="vertical"
      fullWidth
      variant="outlined"
      sx={{
        '@media (max-width: 918px)': {
          display: 'none',
        },
      }}>
      <FilterShortMenuColumnPrice
        icon={<PriceIcon />}
        filterName="Price"
        params={selectedPrice}
        onClick={handleClearPrice}
      />
      <FilterShortMenuColumn
        icon={<SeasonIcon />}
        filterName="Season"
        params={selectedSeason}
        onClick={(param) =>
          handleClearColumnFilters(selectedSeason, param, setSeasonChange)()
        }
      />
      <FilterShortMenuRow
        icon={<WidthIcon />}
        filterName="Width"
        params={selectWidth}
        onClick={(e) => handleClearRowsFilters()(e, setClearSelectedWidth)}
      />
      <FilterShortMenuRow
        icon={<ProfileIcon />}
        filterName="Profile"
        params={selectProfile}
        onClick={(e) => handleClearRowsFilters()(e, setClearSelectedProfile)}
      />
      <FilterShortMenuRow
        icon={<DiametrIcon />}
        filterName="Diametr"
        params={selectDiametr}
        onClick={(e) => handleClearRowsFilters()(e, setClearSelectedDiametr)}
      />
      <FilterShortMenuColumn
        icon={<BrandIcon />}
        filterName="Brand"
        params={selectedBrand}
        onClick={(param) =>
          handleClearColumnFilters(selectedBrand, param, setBrandChange)()
        }
      />
      <FilterShortMenuColumn
        icon={<DriveEtaIcon />}
        filterName="Vechile Type"
        params={selectedVechileType}
        onClick={() => dispatch(setVechileTypeChange(''))}
      />
      <FilterShortMenuColumn
        icon={<StuddedTireIcon />}
        filterName="Studded"
        params={selectedStudded}
        onClick={(param) =>
          handleClearColumnFilters(selectedStudded, param, setStuddedChange)()
        }
      />
      {visableResetButton && (
        <FilterShortMenuReset
          icon={<ResetIcon />}
          onClick={handleCleareAllFilters}
        />
      )}
    </ButtonGroup>
  );
};

export default FilterShortMenuContainer;
