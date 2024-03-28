import { styled, Box, Typography } from '@mui/material';
import { type getDictionary } from '@/get-dictionary';
import { FILTER_COLORS } from '@/shared/constants';

const StyledButton = styled(Box)({
  display: 'flex',
  padding: '0 0 0 12px',
  boxSizing: 'border-box',
  alignItems: 'center',
  fontWeight: '600',
  height: '3.7rem',
  width: '16rem',
  borderRadius: 0,
  borderColor: FILTER_COLORS.BORDER,
  color: FILTER_COLORS.TEXT_MAIN,
  background: FILTER_COLORS.SHORT_MENU_RESET_BUTTON_BACKGROUND,
  borderBottom: 'none',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: FILTER_COLORS.SHORT_MENU_RESET_BUTTON_BACKGROUND,
    borderColor: FILTER_COLORS.BORDER,
    borderBottom: 'none',
  },
  '&:active': {
    backgroundColor: FILTER_COLORS.SHORT_MENU_RESET_BUTTON_BACKGROUND,
    borderColor: FILTER_COLORS.BORDER,
    borderBottom: 'none',
  },
});

type FilterShortMenuRowProps = {
  icon: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
};

function FilterShortMenuReset({
  icon,
  onClick,
  dictionary,
}: FilterShortMenuRowProps) {
  return (
    <StyledButton onClick={onClick}>
      <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
        <Box display="flex" justifyContent="center" alignItems="center">
          {icon}
        </Box>
        <Typography variant="body1" fontWeight={600} ml={1.3}>
          {dictionary.resetAllFilters}
        </Typography>
      </Box>
    </StyledButton>
  );
}

export default FilterShortMenuReset;
