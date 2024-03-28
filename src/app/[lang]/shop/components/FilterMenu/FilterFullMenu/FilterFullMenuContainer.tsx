import * as React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import { selectActiveTabIndex } from '@/redux/slices/selectors/shopPageSelectors';
import {
  setClearSearchInput,
  toggleFullMenu,
} from '@/redux/slices/shopPageSlice';
import { type getDictionary } from '@/get-dictionary';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { IconButton, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import FilterFullMenuInput from './FilterFullMenuInput';
import FilterFullMenuWidthData from './FilterFullMenuWidthData';
import FilterFullMenuProfileData from './FilterFullMenuProfileData';
import FilterFullMenuDiametrData from './FilterFullMenuDiametrData';
import FilterFullMenuPriceData from './FilterFullMenuPriceData';
import FilterFullMenuSeasonData from './FilterFullMenuSeasonData';
import FilterFullMenuBrandData from './FilterFullMenuBrandData';
import FilterFullMenuStuddedData from './FilterFullMenuStuddedData';

import WidthIcon from '@/shared/Icons/WidthIcon';
import ProfileIcon from '@/shared/Icons/ProfileIcon';
import SeasonIcon from '@/shared/Icons/SeasonIcon';
import BrandIcon from '@/shared/Icons/BrandIcon';
import PriceIcon from '@/shared/Icons/PriceIcon';
import DiametrIcon from '@/shared/Icons/DiametrIcon';
import StuddedTireIcon from '@/shared/Icons/StuddedTireIcon';

import { BASE_COLORS } from '@/shared/constants';
import FilterFullMenuVechileTypeData from './FilterFullMenuVechileTypeData';

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

type FilterData = {
  headerTitle?: string;
  asideHeader?: string;
  text1?: string;
  text2?: string;
  text3?: string;
  parametr?: string;
  textForParametr?: string;
};

type MenuData = {
  inputComponent?: React.ElementType;
  dataComponent: React.ElementType;
} & FilterData;

const StyledText = styled(Typography)({
  fontSize: '14px',
  marginTop: '18px',
});

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Box>{children}</Box>
        </Box>
      )}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

function FilterFullMenuContainer({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
}) {
  const dispatch = useDispatch();
  const activeTabIndex = useSelector(selectActiveTabIndex);
  const [value, setValue] = useState(activeTabIndex);

  const handleChange = useCallback(
    (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
      dispatch(setClearSearchInput());
    },
    [dispatch, setValue],
  );

  const handleCloseMenu = () => {
    dispatch(toggleFullMenu());
  };

  const menuData: { [key: string]: MenuData } = {
    Price: {
      dataComponent: FilterFullMenuPriceData,
      headerTitle: `${dictionary.filterHeaderTitlePrice}`,
      asideHeader: `${dictionary.filterAsideHeaderPrice}`,
      text1: `${dictionary.filterAsideText1Price}`,
    },
    Season: {
      dataComponent: FilterFullMenuSeasonData,
      headerTitle: `${dictionary.filterHeaderTitleSeason}`,
      asideHeader: `${dictionary.filterAsideHeaderSeason}`,
      text1: `${dictionary.filterAsideText1Season}`,
      text2: `${dictionary.filterAsideText2Season}`,
      text3: `${dictionary.filterAsideText3Season}`,
    },
    Width: {
      inputComponent: FilterFullMenuInput,
      dataComponent: FilterFullMenuWidthData,
      headerTitle: `${dictionary.filterHeaderTitleWidth}`,
      asideHeader: `${dictionary.filterAsideHeaderWidth}`,
      text1: `${dictionary.filterAsideText1}`,
      text2: `${dictionary.filterAsideText2}`,
      parametr: '205',
      textForParametr: `${dictionary.filterAsideText3Width}`,
    },
    Profile: {
      inputComponent: FilterFullMenuInput,
      dataComponent: FilterFullMenuProfileData,
      headerTitle: `${dictionary.filterHeaderTitleProfile}`,
      asideHeader: `${dictionary.filterAsideHeaderProfile}`,
      text1: `${dictionary.filterAsideText1}`,
      text2: `${dictionary.filterAsideText2}`,
      parametr: '75',
      textForParametr: `${dictionary.filterAsideText3Profile}`,
    },
    Diametr: {
      inputComponent: FilterFullMenuInput,
      dataComponent: FilterFullMenuDiametrData,
      headerTitle: `${dictionary.filterHeaderTitleDiametr}`,
      asideHeader: `${dictionary.filterAsideHeaderDiametr}`,
      text1: `${dictionary.filterAsideText1}`,
      text2: `${dictionary.filterAsideText2}`,
      parametr: '16',
      textForParametr: `${dictionary.filterAsideText3Diametr}`,
    },
    Brand: {
      inputComponent: FilterFullMenuInput,
      dataComponent: FilterFullMenuBrandData,
      headerTitle: `${dictionary.filterHeaderTitleBrand}`,
      asideHeader: `${dictionary.filterAsideHeaderBrand}`,
      text1: `${dictionary.filterAsideText1Brand}`,
      text2: `${dictionary.filterAsideText2Brand}`,
    },
    VechileType: {
      dataComponent: FilterFullMenuVechileTypeData,
      headerTitle: `${dictionary.filterHeaderTitleVechileType}`,
      asideHeader: `${dictionary.filterAsideHeaderVechileType}`,
      text1: `${dictionary.filterAsideText1VechileType}`,
      text2: `${dictionary.filterAsideText2VechileType}`,
    },
    Studded: {
      dataComponent: FilterFullMenuStuddedData,
      headerTitle: `${dictionary.filterHeaderTitleStudded}`,
      asideHeader: `${dictionary.filterAsideHeaderStudded}`,
      text1: `${dictionary.filterAsideText1Studded}`,
      text2: `${dictionary.filterAsideText2Studded}`,
    },
  };

  const tabsIcons = [
    { label: <PriceIcon /> },
    { label: <SeasonIcon /> },
    { label: <WidthIcon /> },
    { label: <ProfileIcon /> },
    { label: <DiametrIcon /> },
    { label: <BrandIcon /> },
    { label: <DriveEtaIcon /> },
    { label: <StuddedTireIcon /> },
  ];

  const menuKeys = Object.keys(menuData);

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        display: 'flex',
      }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        scrollButtons={false}
        TabIndicatorProps={{
          style: {
            backgroundColor: BASE_COLORS.DEFAULT_BLUE,
          },
        }}
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          '& .MuiTab-root.Mui-selected': {
            color: BASE_COLORS.DEFAULT_BLUE,
          },
        }}>
        {tabsIcons.map((tab, index) => (
          <Tab key={index} label={tab.label} {...a11yProps(index)} />
        ))}
      </Tabs>
      {menuKeys.map((key, index) => {
        const InputComponent = menuData[key].inputComponent;
        const headerTitle = menuData[key].headerTitle;
        const DataComponent = menuData[key].dataComponent;
        return (
          <TabPanel key={key} value={value} index={index}>
            <Box display="flex">
              <Box
                flexBasis="385px"
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  flexDirection: 'column',
                  padding: '45px 40px 0 40px',
                  flexGrow: 1,
                  maxWidth: '385px',
                }}>
                <Typography
                  variant="h5"
                  sx={{
                    padding: 0,
                    fontWeight: 'bold',
                    paddingBottom: '16px',
                  }}>
                  {headerTitle?.toUpperCase()}
                </Typography>
                {InputComponent && <InputComponent dictionary={dictionary} />}
                {DataComponent && <DataComponent dictionary={dictionary} />}
              </Box>
              <Box
                flexBasis="289px"
                sx={{
                  backgroundColor: '#f2f2f2',
                  padding: '40px 60px 20px 20px',
                  position: 'relative',
                  height: '589px',
                  maxWidth: '289px',
                }}>
                <IconButton
                  onClick={handleCloseMenu}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: '#000',
                  }}>
                  <CloseIcon />
                </IconButton>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                  }}>
                  {menuData[key].asideHeader}
                </Typography>
                <Box
                  sx={{
                    height: '3px',
                    width: '34px',
                    backgroundColor: 'black',
                    marginBottom: '18px',
                  }}
                />
                <StyledText>{menuData[key].text1}</StyledText>
                {key === 'Width' || key === 'Profile' || key === 'Diametr' ? (
                  <StyledText>
                    {menuData[key].text2}
                    <b>205/75 R16 91T</b> {dictionary.where}
                    <b>{menuData[key].parametr}</b>{' '}
                    {menuData[key].textForParametr}
                  </StyledText>
                ) : (
                  <>
                    <StyledText>{menuData[key].text2}</StyledText>
                    <StyledText>{menuData[key].text3}</StyledText>
                  </>
                )}
              </Box>
            </Box>
          </TabPanel>
        );
      })}
    </Box>
  );
}
export default FilterFullMenuContainer;
