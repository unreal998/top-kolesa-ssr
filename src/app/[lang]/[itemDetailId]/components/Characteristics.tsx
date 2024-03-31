import { Box, Typography } from '@mui/material';
import { BASE_COLORS } from '@/shared/constants';

import {
  styled,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Paper,
  Checkbox,
  TableCell,
  tableCellClasses,
} from '@mui/material';
import { ShopItemAPI } from '@/shared/types';
import { type getDictionary } from '@/get-dictionary';

const TitleText = styled(Typography)({
  fontSize: '1rem',
});
const PersonalInfoText = styled(Typography)({
  fontSize: '1rem',
  fontWeight: 600,
});

const StyledTableCellL = styled(TableCell)(({ theme }) => ({
  paddingLeft: '10%',
  paddingRight: '0',
  width: '40%',
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableCellR = styled(TableCell)(({ theme }) => ({
  paddingLeft: '0',
  paddingRight: '10%',
  width: '60%',
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledCheckbox = styled(Checkbox)({
  margin: '0',
  padding: '0',
  '&.Mui-checked': {
    color: BASE_COLORS.DEFAULT_BLUE,
    '&:after': {
      backgroundColor: BASE_COLORS.DEFAULT_BLUE,
    },
  },
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: BASE_COLORS.BACKGROUND_WHITE,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function Characteristics({
  itemData,
  dictionary,
}: {
  itemData: ShopItemAPI;
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
}) {
  function createData(titles: string, info: string | number | JSX.Element) {
    return { titles, info };
  }

  const rows = [
    createData(`${dictionary.brand}`, itemData?.brand),
    createData(`${dictionary.model}`, itemData.name),
    createData(
      `${dictionary.studdedCharacteristics}`,
      itemData.param.length > 0 ? (
        <StyledCheckbox disabled checked />
      ) : (
        <StyledCheckbox disabled />
      ),
    ),
    createData(`${dictionary.width}`, itemData.width),
    createData(`${dictionary.diametr}`, itemData.diametr),
    createData(`${dictionary.profile}`, itemData.height),
    createData(`${dictionary.country}`, itemData.country),
    createData(`${dictionary.speedIndex}`, itemData.speed),
    createData(`${dictionary.loadIndex}`, itemData.weight),
    createData(`${dictionary.season}`, itemData.season),
    createData(`${dictionary.year}`, itemData.year),
  ];

  return (
    <Box
      maxWidth={600}
      m={'0 auto'}
      sx={{
        '@media (max-width: 650px)': {
          width: '90%',
        },
      }}>
      <TableContainer component={Paper}>
        <Table
          sx={{
            minWidth: 500,
            '@media (max-width: 650px)': {
              minWidth: '90%',
            },
          }}
          aria-label="customized table">
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.titles}>
                <StyledTableCellL component="th" scope="row">
                  <TitleText> {row.titles}</TitleText>
                </StyledTableCellL>
                <StyledTableCellR align="right">
                  <PersonalInfoText>{row.info}</PersonalInfoText>
                </StyledTableCellR>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
