'use client';

import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Button,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Typography,
  styled,
  Badge,
} from '@mui/material';
import { TypographyWithIcon } from '@/shared/components/TypographyWithIcon';
import { EmailOutlined, Language, TimerOutlined } from '@mui/icons-material';
import PhoneIcon from '@mui/icons-material/Phone';
import { type getDictionary } from '@/get-dictionary';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { usePathname } from 'next/navigation';
import { type Locale } from '../../i18n-config';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCartItemCount,
  selectCartModalWindowOpen,
} from '@/redux/slices/selectors/shopPageSelectors';
import {
  setCartItemCount,
  getCartItems,
  setCartModalWindowOpen,
} from '@/redux/slices/shopPageSlice';
import MenuModalWindow from './MenuModalWindow';

import { BASE_COLORS } from '@/shared/constants';
import CartModalWindow from './CartModalWindow';

const StyledTextMain = styled(Typography)({
  color: '#FFFFFF',
  fontSize: '0.9rem',
  fontWeight: 300,
});

const StyledTextNavigation = styled(Stack)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: '1rem',
  '@media (max-width: 1150px)': {
    paddingLeft: '6rem',
  },
  '@media (max-width: 950px)': {
    paddingLeft: '5rem',
  },
  '@media (max-width: 918px)': {
    display: 'none',
  },
});

const StyledButtonsNav = styled(Stack)({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  gap: '1rem',
  justifyContent: 'end',
  '@media (max-width: 918px)': {
    gap: '0.75rem',
  },
  '@media (max-width: 550px)': {
    gap: '1rem',
  },
  '@media (max-width: 450px)': {
    paddingRight: '1.4rem',
  },
});

type LocaleType = 'en' | 'ru' | 'ua';

type MenuItemData = {
  name: string;
  link: string;
};

function Header({
  lang,
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
  lang: string;
}) {
  const dispatch = useDispatch();
  const pathName = usePathname();
  const cartItemCount = useSelector(selectCartItemCount);
  const cartModalWindowOpen = useSelector(selectCartModalWindowOpen);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const cartItemsCountFromStorage = JSON.parse(
      localStorage.getItem('cartItem') || '[]',
    ).length;

    dispatch(setCartItemCount(cartItemsCountFromStorage));
  }, [dispatch, cartItemCount, cartModalWindowOpen]);

  useEffect(() => {
    dispatch(getCartItems(''));
  }, [dispatch]);

  const handleLanguageClick = useCallback((event: SyntheticEvent) => {
    setAnchorEl(event.target as HTMLElement);
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const languageCode = pathName ? pathName.split('/')[1] : 'default';

  const languages: { code: LocaleType; name: string }[] = [
    {
      code: 'en',
      name: 'English',
    },
    {
      code: 'ru',
      name: 'Русский',
    },
    {
      code: 'ua',
      name: 'Українська',
    },
  ];

  const menu: MenuItemData[] = [
    {
      name: 'homeLabel',
      link: `${lang}/`,
    },
    {
      name: 'shopLabel',
      link: `${lang}/shop`,
    },
    {
      name: 'aboutLabel',
      link: `${lang}/about`,
    },
    {
      name: 'contactLabel',
      link: `${lang}/contact`,
    },
  ];

  return (
    <Box display="flex" flexDirection="column" width={'100%'}>
      <Box bgcolor={BASE_COLORS.DEFAULT_BLUE}>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent={'flex-start'}
          gap="3rem"
          height={'1.6rem'}
          padding="1.1rem 4%"
          maxWidth={'170rem'}
          m={'0 auto'}
          sx={{
            '@media (max-width: 1250px)': {
              justifyContent: 'center',
              padding: '1.1rem 2%',
            },
            '@media (max-width: 918px)': {
              display: 'none',
            },
          }}>
          <TypographyWithIcon
            icon={<EmailOutlined sx={{ fill: '#FFF', width: '2rem' }} />}
            typography={
              <StyledTextMain>
                <Link
                  href="mailto:topkolesa@gmail.com"
                  color={'inherit'}
                  sx={{
                    textDecoration: 'none',
                  }}>
                  topkolesa@gmail.com
                </Link>
              </StyledTextMain>
            }
          />
          <TypographyWithIcon
            icon={<PhoneIcon sx={{ fill: '#FFF', width: '2rem' }} />}
            typography={
              <>
                <StyledTextMain>{'(063) 253-77-44'}</StyledTextMain>
                <StyledTextMain>{'(097/099) 273-77-44'}</StyledTextMain>
              </>
            }
          />
          <TypographyWithIcon
            icon={<TimerOutlined sx={{ fill: '#FFF', width: '2rem' }} />}
            typography={<StyledTextMain>{dictionary.workHours}</StyledTextMain>}
          />
        </Box>
      </Box>
      <Box
        display="flex"
        padding="30px 4%"
        alignItems="center"
        justifyContent={'space-between'}
        sx={{
          '@media (min-width: 2899px)': {
            width: '160rem',
            margin: '0 auto',
          },
          '@media (max-width: 550px)': {
            padding: '20px 2%',
          },
        }}>
        <NextLink href={`/${lang}`}>
          <Box
            component={'img'}
            src="./logo.png"
            alt="logo"
            sx={{
              '@media (max-width: 550px)': {
                height: '35px',
              },
            }}
          />
        </NextLink>
        <StyledTextNavigation>
          {menu.map((menuItem, index) => {
            const isHomePageLink = menuItem.name === 'homeLabel';
            const isActiveForHomePage =
              isHomePageLink &&
              (pathName === `/${lang}` || pathName === `/${lang}/`);
            const isActiveForOtherPages =
              !isHomePageLink && pathName?.startsWith(`/${menuItem.link}`);
            const isActive = isActiveForHomePage || isActiveForOtherPages;
            return (
              <NextLink key={index} href={`/${menuItem.link}`} passHref>
                <Typography
                  sx={{
                    color: isActive ? BASE_COLORS.DEFAULT_BLUE : '#000',
                    fontSize: '1.1rem',

                    borderBottom: isActive
                      ? `1px solid  ${BASE_COLORS.DEFAULT_BLUE}`
                      : 'none',
                    fontWeight: isActive ? 600 : 400,
                  }}>
                  {dictionary[menuItem.name as keyof typeof dictionary]}
                </Typography>
              </NextLink>
            );
          })}
        </StyledTextNavigation>
        <StyledButtonsNav>
          <IconButton
            onClick={() =>
              dispatch(setCartModalWindowOpen(!cartModalWindowOpen))
            }
            aria-label="cart"
            sx={{
              marginRight: cartModalWindowOpen ? '0px' : '1rem',
              '@media (max-width: 918px)': {
                width: '10px',
                height: '10px',
                padding: '10px',
                margin: '10px',
              },
              '@media (max-width: 550px)': {
                width: '8px',
                height: '8px',
                padding: '8px',
                margin: '8px',
              },
            }}>
            <Badge
              badgeContent={cartItemCount}
              sx={{
                color: '#FFF',
                '& .MuiBadge-badge': {
                  backgroundColor: BASE_COLORS.DEFAULT_BLUE,
                  fontSize: '14px',
                  '@media (max-width: 550px)': {
                    fontSize: '12px',
                  },
                },
              }}>
              <ShoppingCartOutlinedIcon
                sx={{
                  color: '#000',
                  width: '30px',
                  height: '30px',
                  '@media (max-width: 550px)': {
                    width: '25px',
                    height: '25px',
                  },
                }}
              />
            </Badge>
          </IconButton>
          {cartModalWindowOpen && (
            <CartModalWindow dictionary={dictionary} lang={lang} />
          )}
          <Button
            onClick={(event) => handleLanguageClick(event)}
            sx={{
              color: '#000',
              '@media (max-width: 918px)': {
                padding: '0px',
                margin: '0px',
                minWidth: 0,
              },
              '@media (max-width: 550px)': {
                width: '20px',
                height: '20px',
              },
            }}>
            <Language
              sx={{
                paddingRight: '10px',
                width: '30px',
                height: '30px',
                '@media (max-width: 918px)': {
                  padding: '0px',
                  margin: '0px',
                },
                '@media (max-width: 550px)': {
                  width: '25px',
                  height: '25px',
                },
              }}
            />
            <Typography
              fontSize={'1.1rem'}
              sx={{
                '@media (max-width: 918px)': {
                  display: 'none',
                },
              }}>
              {languageCode}
            </Typography>
          </Button>
          <Menu
            open={!!anchorEl}
            onClose={handleClose}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}>
            {languages.map((item) => (
              <MenuItem key={item.code} onClick={handleClose}>
                <NextLink href={redirectedPathName(item.code)} passHref>
                  <Typography
                    sx={{
                      color: '#000',
                    }}>
                    {item.name}
                  </Typography>
                </NextLink>
              </MenuItem>
            ))}
          </Menu>
          <MenuModalWindow
            menuData={menu}
            dictionary={dictionary}
            lang={lang}
          />
        </StyledButtonsNav>
      </Box>
    </Box>
  );
}

export default Header;
