import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectCartItemsList,
  selectCartModalWindowOpen,
} from '@/redux/slices/selectors/shopPageSelectors';

import {
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  Typography,
  styled,
} from '@mui/material';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CloseIcon from '@mui/icons-material/Close';

import { CartItem } from './CartItem';
import { CartItemData, CartStorageData } from '@/shared/types';
import { setCartModalWindowOpen } from '@/redux/slices/shopPageSlice';
import { ShopItemAPI } from '@/shared/types';
import { SHOP_ITEM_TIRES_IMG_PREFIX } from '@/shared/keys';
import { BASE_COLORS, FILTER_COLORS } from '@/shared/constants';
import EmptyCart from './EmptyCart';
import { type getDictionary } from '@/get-dictionary';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { montserrat } from '@/shared/constants';

const StyledCartModalWindow = styled(Box)({
  width: '25vw',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  height: '100%',
  '@media (max-width: 1600px)': { width: '33vw' },
  '@media (max-width: 1100px)': { width: '40vw' },
  '@media (max-width: 950px)': { width: '50vw' },
  '@media (max-width: 600px)': { width: '100vw' },
});

const StyledButton = styled(Button)({
  width: '100%',
  fontWeight: 'bold',
  background: BASE_COLORS.DEFAULT_BLUE,
  '&:hover': {
    background: BASE_COLORS.DEFAULT_BLUE,
  },
  '@media (max-width: 600px)': {
    fontSize: '14px',
  },
});

export default function CartModalWindow({
  dictionary,
  lang,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
  lang: string;
}) {
  const dispatch = useDispatch();
  const pathName = usePathname();
  const cartModalWindowOpen = useSelector(selectCartModalWindowOpen);
  const shopItemsList = useSelector(selectCartItemsList());
  const [openDrawer, setOpenDrawer] = useState(false);
  const [cartItems, updateCartItems] = useState<CartStorageData[]>([]);
  const [cartItemDetails, updateCartItemDetails] = useState<CartItemData[]>([]);
  const [totalAmount, updateTotalAmount] = useState<number>(0);
  const [localStorageCartItems, setLocalStorageCartItems] = useState<
    CartStorageData[]
  >([]);

  const languageCode = pathName ? pathName.split('/')[1] : 'default';

  useEffect(() => {
    setOpenDrawer(cartModalWindowOpen);
    const localStorageCartItems: CartStorageData[] = JSON.parse(
      localStorage.getItem('cartItem') || '[]',
    );
    const cartItemDetails: CartItemData[] = localStorageCartItems.map(
      (cartItem: CartStorageData) => {
        const item = shopItemsList.find(
          (item: ShopItemAPI) => item.id === cartItem.tireId,
        );
        if (item) {
          return {
            ...cartItem,
            fullName: `${item.brand} ${item.name} ${item.width}/${item.height} R${item.diametr}`,
            name: item.name,
            price: item.price_uah,
            article: item.id,
            image: item
              ? `${SHOP_ITEM_TIRES_IMG_PREFIX}${item.image_file}`
              : './imgs/noPhotoImg.jpg',
          };
        } else {
          return {
            ...cartItem,
            fullName: `unknown/unknown Runknown`,
            name: '',
            price: NaN,
            article: NaN,
            image: './imgs/noPhotoImg.jpg',
          };
        }
      },
    );
    const totalAmount = localStorageCartItems.reduce(
      (total: number, cartItem: CartStorageData) => {
        const item = shopItemsList.find((item) => item.id === cartItem.tireId);
        return total + (item ? item.price_uah * cartItem.numberOfTires : 0);
      },
      0,
    );
    setLocalStorageCartItems(localStorageCartItems);
    updateTotalAmount(totalAmount);
    updateCartItemDetails(cartItemDetails);
  }, [cartModalWindowOpen, cartItems]);

  const handleCloseCartModalWindow = () => {
    dispatch(setCartModalWindowOpen(!cartModalWindowOpen));
  };

  const handletoCheckOutPage = useCallback(() => {
    setOpenDrawer(false);
    dispatch(setCartModalWindowOpen(false));
  }, [history, dispatch]);

  return (
    <Box>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={handleCloseCartModalWindow}>
        <StyledCartModalWindow>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            height={'1.6rem'}
            padding="1.1rem 4%"
            gap={1}
            color={'#fff'}
            bgcolor={BASE_COLORS.DEFAULT_BLUE}>
            <ShoppingCartOutlinedIcon fontSize="large" />
            <Typography
              variant="h5"
              fontWeight={600}
              className={montserrat.className}>
              {dictionary.cart}
            </Typography>
            <IconButton
              onClick={handleCloseCartModalWindow}
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
          {localStorageCartItems?.length > 0 ? (
            <>
              <List
                sx={{
                  padding: 0,
                  overflowY: 'auto',
                  flex: 1,
                }}>
                {cartItemDetails.map(
                  (cartItem: CartItemData, index: number) => (
                    <CartItem
                      key={index}
                      index={index}
                      cartItemData={cartItem}
                      updateCartItems={updateCartItems}
                      cartItems={cartItemDetails}
                      dictionary={dictionary}
                    />
                  ),
                )}
              </List>
              <Box
                sx={{
                  padding: '20px 10px',
                }}>
                <Box display={'flex'} justifyContent={'space-between'}>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    className={montserrat.className}>
                    {dictionary.totalCoast}:
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    className={montserrat.className}
                    color={BASE_COLORS.DEFAULT_BLUE}>
                    {`${totalAmount} ${dictionary.uah}`}
                  </Typography>
                </Box>
                <Link href={`/${languageCode}/checkout`}>
                  <StyledButton
                    variant="contained"
                    className={montserrat.className}
                    onClick={handletoCheckOutPage}>
                    {dictionary.makeAnOrder}
                  </StyledButton>
                </Link>
              </Box>
            </>
          ) : (
            <EmptyCart dictionary={dictionary} />
          )}
        </StyledCartModalWindow>
      </Drawer>
    </Box>
  );
}
