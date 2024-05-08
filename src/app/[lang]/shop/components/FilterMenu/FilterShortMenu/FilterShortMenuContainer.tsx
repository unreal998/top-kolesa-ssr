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
} from '@/redux/slices/selectors/shopPageSelectors';
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
import { useCallback, useEffect } from 'react';
import { type getDictionary } from '@/get-dictionary';
import { usePathname, useRouter } from 'next/navigation';

const FilterShortMenuContainer = ({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathName = usePathname();
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

  useEffect(() => {
    const isFilterBackToInitial =
      selectWidth.length === 0 &&
      selectProfile.length === 0 &&
      selectDiametr.length === 0 &&
      selectedSeason.length === 0 &&
      selectedBrand.length === 0 &&
      selectedStudded.length === 0 &&
      selectedPrice[0] === minPrice &&
      selectedPrice[1] === maxPrice &&
      selectedVechileType === '';
    if (pathName && minPrice !== Infinity && maxPrice !== -Infinity) {
      if (isFilterBackToInitial) {
        const path = pathName.replace(/\?.*/gm, '');
        router.push(path);
      } else {
        const path = pathName.replace(
          /shop.*/gm,
          `shop?price=${JSON.stringify([
            selectedPrice[0],
            selectedPrice[1],
          ])}&width=${JSON.stringify(selectWidth)}&profile=${JSON.stringify(
            selectProfile,
          )}&diametr=${JSON.stringify(selectDiametr)}&season=${JSON.stringify(
            selectedSeason,
          )}&brand=${JSON.stringify(
            selectedBrand,
          )}&studded=${selectedStudded}&vechileType=${selectedVechileType}`,
        );
        router.push(path);
      }
    }
  }, [
    router,
    selectDiametr,
    selectProfile,
    selectWidth,
    selectedBrand,
    selectedPrice,
    selectedSeason,
    selectedStudded,
    selectedVechileType,
    minPrice,
    pathName,
    maxPrice,
  ]);

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
        dictionary={dictionary}
      />
      <FilterShortMenuColumn
        icon={<SeasonIcon />}
        filterName="Season"
        params={selectedSeason}
        dictionary={dictionary}
        onClick={(param) =>
          handleClearColumnFilters(selectedSeason, param, setSeasonChange)()
        }
      />
      <FilterShortMenuRow
        icon={<WidthIcon />}
        filterName="Width"
        params={selectWidth}
        dictionary={dictionary}
        onClick={(e) => handleClearRowsFilters()(e, setClearSelectedWidth)}
      />
      <FilterShortMenuRow
        icon={<ProfileIcon />}
        filterName="Profile"
        params={selectProfile}
        dictionary={dictionary}
        onClick={(e) => handleClearRowsFilters()(e, setClearSelectedProfile)}
      />
      <FilterShortMenuRow
        icon={<DiametrIcon />}
        filterName="Diametr"
        params={selectDiametr}
        dictionary={dictionary}
        onClick={(e) => handleClearRowsFilters()(e, setClearSelectedDiametr)}
      />
      <FilterShortMenuColumn
        icon={<BrandIcon />}
        filterName="Brand"
        params={selectedBrand}
        dictionary={dictionary}
        onClick={(param) =>
          handleClearColumnFilters(selectedBrand, param, setBrandChange)()
        }
      />
      <FilterShortMenuColumn
        icon={<DriveEtaIcon />}
        filterName="Vechile Type"
        params={selectedVechileType}
        dictionary={dictionary}
        onClick={() => dispatch(setVechileTypeChange(''))}
      />
      <FilterShortMenuColumn
        icon={<StuddedTireIcon />}
        filterName="Studded"
        params={selectedStudded}
        dictionary={dictionary}
        onClick={(param) =>
          handleClearColumnFilters(selectedStudded, param, setStuddedChange)()
        }
      />
      {visableResetButton && (
        <FilterShortMenuReset
          dictionary={dictionary}
          icon={<ResetIcon />}
          onClick={handleCleareAllFilters}
        />
      )}
    </ButtonGroup>
  );
};

export default FilterShortMenuContainer;
