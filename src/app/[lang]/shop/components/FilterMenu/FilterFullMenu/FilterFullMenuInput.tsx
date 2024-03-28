import {
  setSearchInput,
  setClearSearchInput,
} from '@/redux/slices/shopPageSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchInput } from '@/redux/slices/shopPageSlice';

import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AiOutlineClose } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';

import { FILTER_COLORS, FONTS } from '@/shared/constants';

const InputSearch = styled('input')({
  width: '100%',
  height: '31px',
  border: '1px solid #ccc',
  boxSizing: 'border-box',
  paddingLeft: '10px',
  fontFamily: FONTS.MAIN_TEXT_FAMILY,
  '&:focus': {
    outline: 'none',
  },
});
function FilterFullMenuInput() {
  const dispatch = useDispatch();
  const searchInput = useSelector(selectSearchInput);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchInput(event));
  };

  const handleClearInput = () => {
    dispatch(setClearSearchInput());
  };

  const renderInputIcon = () => {
    if (searchInput) {
      return (
        <AiOutlineClose
          onClick={handleClearInput}
          color={FILTER_COLORS.BUTTON_RESET_FILTER}
        />
      );
    }
    return <BsSearch />;
  };

  return (
    <Box sx={{ position: 'relative', marginBottom: '10px' }}>
      <InputSearch
        type="text"
        value={searchInput}
        onChange={handleInputChange}
        className="input-search"
        placeholder={'D.search'}
      />
      <Box sx={{ position: 'absolute', right: 10, top: 7 }}>
        {renderInputIcon()}
      </Box>
    </Box>
  );
}

export default FilterFullMenuInput;
