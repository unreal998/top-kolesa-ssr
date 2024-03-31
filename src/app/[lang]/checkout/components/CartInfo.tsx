import { Box, Button, Stack, Typography, styled } from '@mui/material';
import { CartItem } from '@/shared/header/CartItem';
import { type getDictionary } from '@/get-dictionary';
import { CartItemData } from '@/shared/types';
import { BASE_COLORS } from '@/shared/constants';

type CartInfoProps = {
  cartItems: CartItemData[];
  updateCartItems: (data: CartItemData[]) => void;
  totalAmount: number;
  handleOrder: () => void;
  isBuyButtonDisabled: boolean;
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
};

export function CartInfo({
  cartItems,
  updateCartItems,
  totalAmount,
  handleOrder,
  isBuyButtonDisabled,
  dictionary,
}: CartInfoProps) {
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

  return (
    <Stack
      maxHeight={'100%'}
      bgcolor={BASE_COLORS.BACKGROUND_WHITE}
      borderRadius={'0.5rem'}
      sx={{
        '@media (max-width: 918px)': {
          maxHeight: '100%',
        },
      }}>
      <Typography variant="h6" fontWeight={600} m={'2rem 2rem 1rem 2rem'}>
        {dictionary.yourOder}
      </Typography>
      <Box mx={'1.3rem'} sx={{ overflowY: 'auto' }}>
        {cartItems.map((cartItem: CartItemData, index: number) => (
          <Box
            key={index}
            sx={{ borderBottom: `1px solid ${BASE_COLORS.DEFAULT_BLUE}` }}>
            <CartItem
              index={index}
              cartItemData={cartItem}
              updateCartItems={updateCartItems}
              cartItems={cartItems}
              dictionary={dictionary}
              containerStyles={{
                border: 'none',
                margin: 0,
              }}
            />
          </Box>
        ))}
      </Box>
      <Box m={'1.3rem'}>
        <Box display={'flex'} justifyContent={'space-between'}>
          <Typography variant="h6" fontWeight={600}>
            {dictionary.totalCoast}:
          </Typography>
          <Typography
            variant="h6"
            fontWeight={600}
            color={BASE_COLORS.DEFAULT_BLUE}>
            {`${totalAmount} ${dictionary.uah}`}
          </Typography>
        </Box>
        <StyledButton
          disabled={isBuyButtonDisabled}
          variant="contained"
          onClick={handleOrder}>
          {' '}
          {dictionary.buy}
        </StyledButton>
      </Box>
    </Stack>
  );
}
