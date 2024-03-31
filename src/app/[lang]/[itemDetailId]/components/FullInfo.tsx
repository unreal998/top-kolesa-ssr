import { useState } from 'react';
import { useSelector } from 'react-redux';

import { type getDictionary } from '@/get-dictionary';

import { Box, Tab, Tabs, styled } from '@mui/material';

import Characteristics from './Characteristics';
import ReviewPage from './ReviewPage';

import { selectSelectedItemData } from '@/redux/slices/selectors/shopPageSelectors';
import { BASE_COLORS } from '@/shared/constants';

interface ITabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const StyledTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    backgroundColor: BASE_COLORS.DEFAULT_BLUE,
  },
  '& .MuiTab-root.Mui-selected': {
    color: BASE_COLORS.DEFAULT_BLUE,
  },
});

const StyledTab = styled(Tab)({
  fontWeight: 600,
  color: BASE_COLORS.DEFAULT_GREY,
});

function CustomTabPanel(props: ITabPanelProps) {
  const { children, value, index } = props;

  return (
    <Box role="tabpanel" hidden={value !== index}>
      {value === index && children}
    </Box>
  );
}

export default function FullInfo({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
}) {
  const [modalValue, setModalValue] = useState(0);
  const selectedItemData = useSelector(selectSelectedItemData());

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setModalValue(newValue);
  };

  return (
    <>
      <Box display="flex" alignContent="center" justifyContent="center" mt={2}>
        <StyledTabs value={modalValue} onChange={handleChange}>
          <StyledTab label={dictionary.characteristics} />
          <StyledTab label={`${dictionary.reviews} (0)`} />
        </StyledTabs>
      </Box>
      <CustomTabPanel value={modalValue} index={0}>
        {selectedItemData && (
          <Characteristics
            itemData={selectedItemData}
            dictionary={dictionary}
          />
        )}
      </CustomTabPanel>
      <CustomTabPanel value={modalValue} index={1}>
        <ReviewPage dictionary={dictionary} />
      </CustomTabPanel>
    </>
  );
}
