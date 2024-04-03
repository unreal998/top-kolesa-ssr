import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  styled,
} from '@mui/material';
import { BASE_COLORS, FONTS, montserrat } from '@/shared/constants';
import { type getDictionary } from '@/get-dictionary';

const StyledRadio = styled(Radio)({
  '&.Mui-checked': {
    color: BASE_COLORS.DEFAULT_BLUE,
  },
});

export function PaymentInfo({
  changePaymentState,
  pickup,
  dictionary,
}: {
  changePaymentState: (value: string) => void;
  pickup: boolean;
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
}) {
  return (
    <Stack
      gap="5px"
      bgcolor={BASE_COLORS.BACKGROUND_WHITE}
      p={'2rem'}
      borderRadius={'0.5rem'}>
      <Typography
        variant="h6"
        fontWeight={600}
        pb={'1rem'}
        className={montserrat.className}>
        {dictionary.pay}
      </Typography>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="cash"
          name="radio-buttons-group"
          onChange={(e, value) => changePaymentState(value)}>
          <FormControlLabel
            value="cash"
            control={<StyledRadio />}
            label={
              <Typography
                variant="subtitle1"
                fontSize={'1.1rem'}
                fontFamily={FONTS.MAIN_TEXT_FAMILY}>
                {pickup ? dictionary.paymentUponReceipt : dictionary.cash}
              </Typography>
            }
          />
          <FormControlLabel
            value="transfer"
            control={<StyledRadio />}
            label={
              <Typography
                variant="subtitle1"
                fontSize={'1.1rem'}
                fontFamily={FONTS.MAIN_TEXT_FAMILY}>
                {dictionary.transfer}
              </Typography>
            }
          />
        </RadioGroup>
      </FormControl>
    </Stack>
  );
}
