'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCartItemCount } from '@/redux/slices/shopPageSlice';
import { selectSelectedItemData } from '@/redux/slices/selectors/shopPageSelectors';

import {
  Box,
  Button,
  ClickAwayListener,
  TextField,
  Tooltip,
  Typography,
  styled,
} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { type getDictionary } from '@/get-dictionary';

import { ButtonWithIcon } from '@/shared/components/ButtonWithIcon';
import { BASE_COLORS, TOOLTIP_TIMEOUT, montserrat } from '@/shared/constants';
import { CartItemData } from '@/shared/types';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import { useRouter } from 'next/navigation';

type BuyOptionsProps = {
  tireId: number | undefined;
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
  lang: string;
};

const StyledTextField = styled(TextField)({
  width: '80px',
  height: '40px',
  '& input': {
    marginLeft: '10px',
    fontWeight: 600,
    fontSize: '16px',
  },
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: BASE_COLORS.DEFAULT_BLUE,
    },
    '&.Mui-focused fieldset': {
      borderColor: BASE_COLORS.DEFAULT_BLUE,
    },
  },
});

const StyledButton = styled(Button)({
  backgroundColor: BASE_COLORS.DEFAULT_BLUE,
  fontWeight: 600,
  fontFamily: 'PT Sans, sans-serif',
  borderRadius: '999px',
  padding: '16px 40px',
  '@media (max-width: 918px)': {
    width: '100%',
  },
});

export default function BuyOptions({
  tireId,
  dictionary,
  lang,
}: BuyOptionsProps) {
  const dispatch = useDispatch();
  const selectedItemData = useSelector(selectSelectedItemData());
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);
  const [numberOfTires, setNumberOfTires] = useState<number | undefined>(4);
  const router = useRouter();

  useEffect(() => {
    selectedItemData && selectedItemData?.in_stock >= 4
      ? setNumberOfTires(4)
      : setNumberOfTires(selectedItemData?.in_stock);
  }, [dispatch, selectedItemData]);

  const handleNumberOfTires = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value === '') {
      setNumberOfTires(undefined);
    } else {
      let numValue = Number(value);
      numValue = Math.max(numValue, 1);
      const maxAvailable = selectedItemData?.in_stock ?? 1;
      numValue = Math.min(numValue, maxAvailable);
      setNumberOfTires(numValue);
    }
  };

  const handleAddToCart = () => {
    const numberOfTiresToAdd = numberOfTires || 1;
    const existingCartItemsString = localStorage.getItem('cartItem');
    const existingCartItems = existingCartItemsString
      ? JSON.parse(existingCartItemsString)
      : [];

    const itemIndex = existingCartItems.findIndex(
      (item: CartItemData) => item.tireId === tireId,
    );

    if (itemIndex > -1) {
      existingCartItems[itemIndex].numberOfTires += numberOfTiresToAdd;
    } else {
      existingCartItems.push({ tireId, numberOfTires: numberOfTiresToAdd });
    }

    localStorage.setItem('cartItem', JSON.stringify(existingCartItems));

    const cartItems = JSON.parse(localStorage.getItem('cartItem') || '').length;
    dispatch(setCartItemCount(cartItems));
  };

  const handleFastBuy = () => {
    const numberOfTiresToAdd = numberOfTires || 1;
    const existingCartItemsString = localStorage.getItem('cartItem');
    const existingCartItems = existingCartItemsString
      ? JSON.parse(existingCartItemsString)
      : [];

    const itemIndex = existingCartItems.findIndex(
      (item: CartItemData) => item.tireId === tireId,
    );

    if (itemIndex > -1) {
      existingCartItems[itemIndex].numberOfTires += numberOfTiresToAdd;
    } else {
      existingCartItems.push({ tireId, numberOfTires: numberOfTiresToAdd });
    }

    localStorage.setItem('cartItem', JSON.stringify(existingCartItems));

    const cartItems = JSON.parse(localStorage.getItem('cartItem') || '').length;
    dispatch(setCartItemCount(cartItems));
    router.push(`/${lang}/checkout`);
  };

  const handleTooltipClose = () => {
    setTooltipOpen(false);
  };

  const handleTooltipOpen = () => {
    setTooltipOpen(numberOfTires === selectedItemData?.in_stock);
    setTimeout(() => {
      setTooltipOpen(false);
    }, TOOLTIP_TIMEOUT);
  };

  const buttonInfo = [
    {
      text: `${dictionary.addToCart}`,
      function: handleAddToCart,
      icon: <ShoppingCartOutlinedIcon sx={{ height: '14px', width: '14px' }} />,
    },
    {
      text: `${dictionary.fastBuy}`,
      function: handleFastBuy,
      icon: (
        <ShoppingCartCheckoutOutlinedIcon
          sx={{ height: '14px', width: '14px' }}
        />
      ),
    },
  ];

  return (
    <>
      <Typography
        variant="h3"
        fontWeight="600"
        fontSize="1.9rem"
        className={montserrat.className}
        color={BASE_COLORS.DEFAULT_BLUE}
        mt={'2rem'}
        sx={{
          '@media (max-width: 918px)': {
            margin: 'auto',
            marginY: '1rem',
            fontSize: '2.2rem',
          },
        }}>
        {Number(selectedItemData?.price_uah) * (numberOfTires ?? 1)}{' '}
        {dictionary.uah}
      </Typography>
      <Box
        display={'flex'}
        margin={'2.5rem 0'}
        gap={'1rem'}
        sx={{
          '@media (max-width: 918px)': {
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            gap: '4rem',
          },
        }}>
        <ClickAwayListener
          onClickAway={() => {
            handleTooltipClose();
            if (numberOfTires === undefined) {
              setNumberOfTires(1);
            }
          }}>
          <Tooltip
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={tooltipOpen}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            placement="bottom"
            title={dictionary.maxCountTires}
            sx={{
              paddingBottom: '0.5rem',
            }}>
            <StyledTextField
              className={montserrat.className}
              id="outlined-basic"
              variant="outlined"
              type="number"
              value={numberOfTires}
              onChange={handleNumberOfTires}
              onClick={handleTooltipOpen}
            />
          </Tooltip>
        </ClickAwayListener>
        <Box
          display={'flex'}
          gap={'1rem'}
          sx={{
            '@media (max-width: 918px)': {
              flexDirection: 'column',
              margin: 'auto',
              width: '100%',
            },
          }}>
          {buttonInfo.map((item, i) => (
            <Box key={i}>
              <ButtonWithIcon
                button={
                  <StyledButton onClick={item.function} variant="contained">
                    {item.text}
                  </StyledButton>
                }
                icon={item.icon}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
