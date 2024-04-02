import { BASE_COLORS, FONTS } from '@/shared/constants';
import { Rating, Stack, Typography } from '@mui/material';
import { BASE_COLORS, FONTS, montserrat } from '@/shared/constants';


export function ReviewItem() {
  return (
    <Stack
      gap="5px"
      padding="5%"
      border={`1px solid ${BASE_COLORS.BORDER_WHITE}`}
      borderRadius={2}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6" className={montserrat.className}>
          Item Name
        </Typography>
        <Rating name="read-only" value={4} readOnly />
      </Stack>
      <Typography
        fontWeight="600"
        color={BASE_COLORS.DEFAULT_BLUE}
        variant="body2"
        className={montserrat.className}>
        26.04.2023
      </Typography>
      <Typography variant="body1" fontFamily={FONTS.MAIN_TEXT_FAMILY}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim placeat,
        eos officiis facilis, repellendus totam, sint molestiae nisi vero earum
        ducimus sapiente modi animi? Eius error eos ex sequi nobis?
      </Typography>
    </Stack>
  );
}
