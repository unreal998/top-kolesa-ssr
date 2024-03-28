import { Menu, MenuItem, Typography } from '@mui/material';
import {
  BASE_COLORS,
  FILTER_COLORS,
  FONTS,
} from '../../../../shared/constants';
import { useDispatch, useSelector } from 'react-redux';
import { selectSortParams } from '../../selectors';
import { useCallback, useState } from 'react';
import { actions } from '../../reducer';
import { useTranslation } from 'react-i18next';
import SortIcon from '@mui/icons-material/Sort';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';

export function MobileSortBy() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const sortParams = useSelector(selectSortParams());
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeSortBy = useCallback(
    (value: string) => {
      dispatch(
        actions.setSortParams({
          ...sortParams,
          sortBy: value,
        }),
      );
      handleClose();
    },
    [dispatch, sortParams],
  );

  const menueItemData = [
    {
      value: 'rated',
      label: t('rated'),
    },
    {
      value: 'date',
      label: t('date'),
    },
    {
      value: 'priceHigh',
      label: t('priceHigh'),
    },
    {
      value: 'priceLow',
      label: t('priceLow'),
    },
  ];

  return (
    <>
      <Button
        aria-controls={open ? 'basic-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          diaplay: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <SortIcon fontSize="large" sx={{ color: 'white' }} />{' '}
        <Typography
          variant="subtitle1"
          sx={{ color: 'white', marginTop: '0.2rem', paddingLeft: '0.4rem' }}>
          {t('sortBy')}
        </Typography>
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        sx={{
          '@media (min-width: 919px)': {
            display: 'none',
          },
        }}>
        {menueItemData.map((item, i) => (
          <MenuItem
            key={i}
            value={item.value}
            onClick={() => handleChangeSortBy(item.value)}
            sx={{
              fontFamily: FONTS.MAIN_TEXT_FAMILY,
              color:
                sortParams.sortBy === item.value
                  ? 'white'
                  : FILTER_COLORS.TEXT_MAIN,
              backgroundColor:
                sortParams.sortBy === item.value
                  ? BASE_COLORS.DEFAULT_BLUE
                  : 'white',
            }}>
            <Typography variant="subtitle2" fontSize={'12px'} ml={'1rem'}>
              {item.label}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
