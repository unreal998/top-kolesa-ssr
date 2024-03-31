import { Box } from '@mui/material';
import { BASE_COLORS } from '@/shared/constants';
import { MobileShow } from './MobileShow';
import { MobileSortBy } from './MobileSortBy';
import { MobileFilter } from './MobileFilter';
import { type getDictionary } from '@/get-dictionary';

export function MobileShopHeaderBar({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
}) {
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
        <MobileFilter dictionary={dictionary} />
      </Box>
      <Box>
        {' '}
        <MobileSortBy dictionary={dictionary} />
      </Box>
      <Box>
        <MobileShow />
      </Box>
    </Box>
  );
}
