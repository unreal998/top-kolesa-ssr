import * as React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import { selectActiveTabIndex } from '@/redux/slices/shopPageSlice';
import {
  setClearSearchInput,
  toggleFullMenu,
} from '@/redux/slices/shopPageSlice';

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

function FilterFullMenuContainer() {
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
      headerTitle: 'D.filterHeaderTitlePrice',
      asideHeader: 'D.filterAsideHeaderPrice',
      text1: 'D.filterAsideText1Price',
    },
    Season: {
      dataComponent: FilterFullMenuSeasonData,
      headerTitle: 'D.filterHeaderTitleSeason',
      asideHeader: 'D.filterAsideHeaderSeason',
      text1: 'D.filterAsideText1Season',
      text2: 'D.filterAsideText2Season',
      text3: 'D.filterAsideText3Season',
    },
    Width: {
      inputComponent: FilterFullMenuInput,
      dataComponent: FilterFullMenuWidthData,
      headerTitle: 'D.filterHeaderTitleWidth',
      asideHeader: 'D.filterAsideHeaderWidth',
      text1: 'D.filterAsideText1',
      text2: 'D.filterAsideText2',
      parametr: '205',
      textForParametr: 'D.filterAsideText3Width',
    },
    Profile: {
      inputComponent: FilterFullMenuInput,
      dataComponent: FilterFullMenuProfileData,
      headerTitle: 'D.filterHeaderTitleProfile',
      asideHeader: 'D.filterAsideHeaderProfile',
      text1: 'D.filterAsideText1',
      text2: 'D.filterAsideText2',
      parametr: '75',
      textForParametr: 'D.filterAsideText3Profile',
    },
    Diametr: {
      inputComponent: FilterFullMenuInput,
      dataComponent: FilterFullMenuDiametrData,
      headerTitle: 'D.filterHeaderTitleDiametr',
      asideHeader: 'D.filterAsideHeaderDiametr',
      text1: 'D.filterAsideText1',
      text2: 'D.filterAsideText2',
      parametr: '16',
      textForParametr: 'D.filterAsideText3Diametr',
    },
    Brand: {
      inputComponent: FilterFullMenuInput,
      dataComponent: FilterFullMenuBrandData,
      headerTitle: 'D.filterHeaderTitleBrand',
      asideHeader: 'D.filterAsideHeaderBrand',
      text1: 'D.filterAsideText1Brand',
      text2: 'D.filterAsideText2Brand',
    },
    VechileType: {
      dataComponent: FilterFullMenuVechileTypeData,
      headerTitle: 'D.filterHeaderTitleVechileType',
      asideHeader: 'D.filterAsideHeaderVechileType',
      text1: 'D.filterAsideText1VechileType',
      text2: 'D.filterAsideText2VechileType',
    },
    Studded: {
      dataComponent: FilterFullMenuStuddedData,
      headerTitle: 'D.filterHeaderTitleStudded',
      asideHeader: 'D.filterAsideHeaderStudded',
      text1: 'D.filterAsideText1Studded',
      text2: 'D.filterAsideText2Studded',
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
                {InputComponent && <InputComponent />}
                {DataComponent && <DataComponent />}
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
                    <b>205/75 R16 91T</b> {'D.where'}
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
