import { useState } from 'react';
import { BASE_COLORS, FILTER_COLORS } from '@/shared/constants';
import {
  SwipeableDrawer,
  Box,
  List,
  Button,
  Typography,
  IconButton,
} from '@mui/material/';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { type getDictionary } from '@/get-dictionary';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type MenuItemData = {
  name: string;
  link: string;
};

export default function MenuModalWindow({
  menuData,
  dictionary,
  lang,
}: {
  menuData: MenuItemData[];
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
  lang: string;
}) {
  const pathName = usePathname();
  const [state, setState] = useState({
    right: false,
  });

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

      setState({ right: open });
    };

  const list = () => (
    <Box
      width={'50vw'}
      mt={'3vh'}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      sx={{ '@media (max-width: 600px)': { width: '100vw' } }}
      position={'relative'}>
      <IconButton
        onClick={toggleDrawer(false)}
        sx={{
          color: FILTER_COLORS.BUTTON_RESET_FILTER,
          padding: 0,
          position: 'absolute',
          top: '0.1rem',
          right: '2rem',
        }}>
        <CloseIcon
          sx={{
            height: '30px',
            width: '30px',
            padding: 0,
          }}
        />
      </IconButton>
      <List sx={{ marginTop: '1rem' }}>
        {menuData.map((menuItem: MenuItemData, i: number) => {
          const isHomePageLink = menuItem.name === 'homeLabel';
          const isActiveForHomePage =
            isHomePageLink &&
            (pathName === `/${lang}` || pathName === `/${lang}/`);
          const isActiveForOtherPages =
            !isHomePageLink && pathName?.startsWith(`/${menuItem.link}`);
          const isActive = isActiveForHomePage || isActiveForOtherPages;

          return (
            <Box key={i} marginY={'auto'} marginTop={'0.3rem'}>
              <Link href={`/${menuItem.link}`} passHref>
                <Typography
                  lineHeight="1.7"
                  width={'25%'}
                  variant="body1"
                  fontSize={'1.5rem'}
                  fontWeight={isActive ? 600 : 500}
                  textAlign={'center'}
                  borderBottom={
                    isActive ? `1px solid  ${BASE_COLORS.DEFAULT_BLUE}` : 'none'
                  }
                  m={'auto'}
                  color={isActive ? BASE_COLORS.DEFAULT_BLUE : '#000'}
                  sx={{
                    '@media (max-width: 600px)': {
                      fontSize: '1.8rem',
                    },
                  }}>
                  {dictionary[menuItem.name as keyof typeof dictionary]}
                </Typography>
              </Link>
            </Box>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box>
      <Button
        onClick={toggleDrawer(true)}
        variant="text"
        sx={{
          padding: '0px',
          margin: '0px',
          '@media (min-width: 919px)': {
            display: 'none',
            padding: '0px',
            margin: '0px',
          },
          '@media (max-width: 918px)': {
            minWidth: 0,
          },
        }}>
        <MenuIcon
          sx={{
            color: '#000',
            width: '30px',
            height: '30px',
          }}
        />
      </Button>
      <SwipeableDrawer
        anchor={'right'}
        open={state.right}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        sx={{
          '@media (min-width: 919px)': {
            display: 'none',
          },
        }}>
        {list()}
      </SwipeableDrawer>
    </Box>
  );
}
