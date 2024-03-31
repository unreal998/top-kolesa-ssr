import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Box, Modal, Stack, Typography, styled } from '@mui/material';

import { selectSelectedItemData } from '@/redux/slices/selectors/shopPageSelectors';
import { SHOP_ITEM_TIRES_IMG_PREFIX } from '@/shared/keys';

const StyledStack = styled(Stack)({
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  maxHeight: '30rem',
  maxWidth: '30rem',
  minWidth: '30rem',
  minHeight: '30rem',
  '@media (max-width: 1300px)': {
    maxHeight: '22rem',
    maxWidth: '22rem',
    minWidth: '22rem',
    minHeight: '22rem',
  },
  '@media (max-width: 990px)': {
    maxHeight: '22rem',
    maxWidth: '22rem',
    minWidth: '22rem',
    minHeight: '22rem',
  },
});

const StyledModalBox = styled(Box)({
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  outline: 'none',
});

const ModalStyledStack = styled(Stack)({
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  maxHeight: '40rem',
  maxWidth: '40rem',
  minWidth: '40rem',
  minHeight: '40rem',
  '@media (max-width: 1300px)': {
    maxHeight: '29rem',
    maxWidth: '29rem',
    minWidth: '29rem',
    minHeight: '29rem',
  },
  '@media (max-width: 990px)': {
    maxHeight: '29rem',
    maxWidth: '29rem',
    minWidth: '29rem',
    minHeight: '29rem',
  },
});

export default function TireImg() {
  const selectedItemData = useSelector(selectSelectedItemData());
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <StyledStack
        onClick={handleOpen}
        sx={{
          backgroundImage: selectedItemData?.image_file
            ? `url("${SHOP_ITEM_TIRES_IMG_PREFIX}${selectedItemData.image_file}")`
            : `url("./imgs/noPhotoImg.jpg")`,
        }}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <StyledModalBox>
          <ModalStyledStack
            onClick={handleOpen}
            sx={{
              backgroundImage: selectedItemData?.image_file
                ? `url("${SHOP_ITEM_TIRES_IMG_PREFIX}${selectedItemData.image_file}")`
                : `url("./imgs/noPhotoImg.jpg")`,
            }}
          />
        </StyledModalBox>
      </Modal>
    </>
  );
}
