import { useEffect, useRef, useState } from 'react';

import { Stack, Tooltip, Typography } from '@mui/material';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import GppGoodIcon from '@mui/icons-material/GppGood';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import styled from '@emotion/styled';
import { type getDictionary } from '@/get-dictionary';

import { BASE_COLORS } from '@/shared/constants';

const CustomIcon = styled('span')(({ theme }) => ({
  color: BASE_COLORS.DEFAULT_BLUE,
  '& .MuiSvgIcon-root': {
    width: '1.3em',
    height: '1.3em',
  },
}));

export default function Tooltips({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['project'];
}) {
  const [deliveryPopupHover, setDeliveryPopupHover] = useState<boolean>(false);
  const [guarantiePopupHover, setGuarantiePopupHover] =
    useState<boolean>(false);
  const [revertPopupHover, setRevertPopupHover] = useState<boolean>(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setDeliveryPopupHover(false);
        setGuarantiePopupHover(false);
        setRevertPopupHover(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [tooltipRef]);

  return (
    <Stack justifyContent="space-between" direction="row">
      <Tooltip
        ref={tooltipRef}
        onMouseEnter={() => setDeliveryPopupHover(true)}
        onMouseLeave={() => setDeliveryPopupHover(false)}
        onClick={() => setDeliveryPopupHover(!deliveryPopupHover)}
        open={deliveryPopupHover}
        color={BASE_COLORS.DEFAULT_BLUE}
        title={
          <Stack padding="10px">
            <Typography variant="h6">{dictionary.delivery}</Typography>
            <Typography variant="body1">
              - {dictionary.deliveryPriceFrom} 35 {dictionary.uah}
            </Typography>
            <Typography variant="body1">
              - {dictionary.deliveryTime} 1-3 {dictionary.days}
            </Typography>
            <Typography variant="body1">
              - {dictionary.deliveredBy} {dictionary.novaPoshta}
            </Typography>
            <Typography variant="body1">
              - {dictionary.pickupFromWarehouses}
            </Typography>
          </Stack>
        }>
        <Stack alignItems="center">
          <CustomIcon>
            {deliveryPopupHover ? (
              <LocalShippingRoundedIcon />
            ) : (
              <LocalShippingOutlinedIcon />
            )}
          </CustomIcon>
          <Typography variant="h6">{dictionary.delivery}</Typography>
        </Stack>
      </Tooltip>
      <Tooltip
        ref={tooltipRef}
        color={BASE_COLORS.DEFAULT_BLUE}
        onMouseEnter={() => setGuarantiePopupHover(true)}
        onMouseLeave={() => setGuarantiePopupHover(false)}
        onClick={() => setGuarantiePopupHover(!guarantiePopupHover)}
        open={guarantiePopupHover}
        title={
          <Stack padding="10px">
            <Typography variant="h6">{dictionary.guarantee}</Typography>
            <Typography variant="body1">
              - {dictionary.manufacturerGuarantee}
            </Typography>
          </Stack>
        }>
        <Stack alignItems="center">
          <CustomIcon>
            {guarantiePopupHover ? <GppGoodIcon /> : <GppGoodOutlinedIcon />}
          </CustomIcon>
          <Typography variant="h6">{dictionary.guarantee}</Typography>
        </Stack>
      </Tooltip>
      <Tooltip
        ref={tooltipRef}
        color={BASE_COLORS.DEFAULT_BLUE}
        onMouseEnter={() => setRevertPopupHover(true)}
        onMouseLeave={() => setRevertPopupHover(false)}
        onClick={() => setRevertPopupHover(!revertPopupHover)}
        open={revertPopupHover}
        title={
          <Stack padding="10px">
            <Typography variant="h6">{dictionary.returns}</Typography>
            <Typography variant="body1">
              {dictionary.returnsDescription}{' '}
              <b>({dictionary.returnsDescription2})</b>
            </Typography>
          </Stack>
        }>
        <Stack alignItems="center">
          <CustomIcon>
            {revertPopupHover ? (
              <ReplayCircleFilledIcon />
            ) : (
              <ReplayOutlinedIcon />
            )}
          </CustomIcon>
          <Typography variant="h6">{dictionary.returns}</Typography>
        </Stack>
      </Tooltip>
    </Stack>
  );
}
