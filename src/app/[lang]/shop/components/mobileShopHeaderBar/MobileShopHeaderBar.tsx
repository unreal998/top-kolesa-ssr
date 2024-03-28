import { Box } from '@mui/material';
import { BASE_COLORS } from '../../../../shared/constants';
import { MobileShow } from './MobileShow';
import { MobileSortBy } from './MobileSortBy';
import { MobileFilter } from './MobileFilter';

export function MobileShopHeaderBar() {
  return (
    <Box
      width="100%"
      height={'4rem'}
      bgcolor={BASE_COLORS.DEFAULT_BLUE}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'space-around'}
      color={'white'}
      sx={{
        '@media (min-width: 919px)': {
          display: 'none',
        },
      }}>
      <Box>
        <MobileFilter />
      </Box>
      <Box>
        <MobileSortBy />
      </Box>
      <Box>
        <MobileShow />
      </Box>
    </Box>
  );
}
