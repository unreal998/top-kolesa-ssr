import { Stack, TextField, Typography, styled } from '@mui/material';
import { BASE_COLORS } from '@/shared/constants';
import { type getDictionary } from '@/get-dictionary';

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-input': {},
  '& .MuiInputLabel-root': {},
  '& .MuiInputLabel-input': {},
  '& .MuiInputLabel-root.Mui-focused': {
    color: BASE_COLORS.DEFAULT_BLUE,
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: BASE_COLORS.DEFAULT_BLUE,
  },
  '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
    borderColor: BASE_COLORS.DEFAULT_BLUE,
  },
});

export function Comment({
  setInputedComment,
  dictionary,
}: {
  setInputedComment: (value: string) => void;
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
}) {
  return (
    <Stack
      gap="5px"
      bgcolor={BASE_COLORS.BACKGROUND_WHITE}
      p={'2rem'}
      borderRadius={'0.5rem'}>
      <Typography variant="h6" fontWeight={600} pb={'1rem'}>
        {dictionary.addComment}
      </Typography>
      <StyledTextField
        multiline
        label=""
        rows={4}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputedComment(e.target.value)
        }
      />
    </Stack>
  );
}
