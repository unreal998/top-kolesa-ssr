'use client';

import { type getDictionary } from '@/get-dictionary';
import { ShopContainer } from './ShopContainer';
import { Box, Dialog } from '@mui/material';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getShopItems,
  initializePriceRange,
  toggleFullMenu,
} from '@/redux/slices/shopPageSlice';
import { getFilterData } from '@/redux/slices/filterSlice';

import { selectIsFullMenuOpen } from '@/redux/slices/selectors/shopPageSelectors';
import { selectFilterData } from '@/redux/slices/selectors/filterSelectors';

import FilterShortMenuContainer from './FilterMenu/FilterShortMenu/FilterShortMenuContainer';
import FilterFullMenuContainer from './FilterMenu/FilterFullMenu/FilterFullMenuContainer';
import { useSearchParams } from 'next/navigation';

function ContainerPage({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
}) {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const isFullMenuOpen = useSelector(selectIsFullMenuOpen);
  const filtersParams = useSelector(selectFilterData());
  const [isInitialized, setIsInitialized] = useState<boolean>(true);

  useEffect(() => {
    if (searchParams && searchParams.size > 0) {
      dispatch(
        getShopItems({
          price: searchParams.get('price') || undefined,
          width: searchParams.get('width') || undefined,
          profile: searchParams.get('profile') || undefined,
          diametr: searchParams.get('diametr') || undefined,
          season: searchParams.get('season') || undefined,
          brand: searchParams.get('brand') || undefined,
          studded: searchParams.get('studded') || undefined,
          vechileType: searchParams.get('vechileType') || undefined,
        }),
      );
    } else {
      dispatch(getShopItems(''));
    }
    dispatch(getFilterData());
  }, [dispatch, searchParams]);

  useEffect(() => {
    if (isInitialized) {
      const minPrice = Math.min(...filtersParams.prices);
      const maxPrice = Math.max(...filtersParams.prices);
      dispatch(initializePriceRange([minPrice, maxPrice]));
    }
  }, [dispatch, filtersParams?.prices, isInitialized]);

  useEffect(() => {
    if (filtersParams.prices.length > 0) {
      setIsInitialized(false);
    }
  }, [filtersParams?.prices]);

  const handleCloseMenu = () => {
    dispatch(toggleFullMenu());
  };

  return (
    <Box
      padding="0 30px"
      display="flex"
      alignItems="flex-start"
      maxWidth={'170rem'}
      m={'0 auto'}
      sx={{
        '@media (max-width: 918px)': {
          padding: '0',
        },
      }}>
      <Box position="relative">
        <FilterShortMenuContainer dictionary={dictionary} />
        {isFullMenuOpen && (
          <Dialog
            open={isFullMenuOpen}
            onClose={handleCloseMenu}
            aria-labelledby="filter-menu-dialog"
            sx={{
              '& .MuiDialog-paper': {
                width: '885px',
                height: '649px',
                maxWidth: '100%',
                maxHeight: '100%',
              },
            }}>
            <FilterFullMenuContainer dictionary={dictionary} />
          </Dialog>
        )}
      </Box>
      <ShopContainer dictionary={dictionary} />
    </Box>
  );
}

export default ContainerPage;
