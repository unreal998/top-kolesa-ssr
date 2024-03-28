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

function ContainerPage({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
}) {
  const dispatch = useDispatch();
  const isFullMenuOpen = useSelector(selectIsFullMenuOpen);
  const filtersParams = useSelector(selectFilterData());
  const [isInitialized, setIsInitialized] = useState<boolean>(true);

  useEffect(() => {
    dispatch(getFilterData());
  }, [dispatch]);

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
