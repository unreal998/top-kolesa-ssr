import { Box, Typography } from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { type getDictionary } from '@/get-dictionary';

function EmptyCart({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
}) {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      m={'auto'}>
      <ShoppingCartOutlinedIcon
        sx={{
          fontSize: '10rem',
          color: '#f1f1f1',
        }}
      />
      <Typography variant="h5">{dictionary.cartEmpty}</Typography>
    </Box>
  );
}

export default EmptyCart;
