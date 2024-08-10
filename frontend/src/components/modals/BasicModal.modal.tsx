import { FC } from 'react';
import { TBasicModal } from '@/src/models/types/BasicModal.type';
import { Backdrop, Box, Fade, Modal, useTheme, useMediaQuery } from '@mui/material';

const BasicModal: FC<TBasicModal> = (props: TBasicModal) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const handleClose = () => props.setShow(false);

  const getModalStyle = () => {
    let width: any = 600; 
    let padding = 4;

    if (isMobile) {
      width = '80%';
      padding = 2;
    } else if (isTablet) {
      width = 450;
      padding = 3;
    }

    return {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: width,
      maxWidth: '95%',
      maxHeight: '90vh',
      overflowY: 'auto',
      bgcolor: 'background.paper',
      boxShadow: 24,
      borderRadius: 2,
      p: padding,
    };
  };

  return (
    <Modal
      open={props.show}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.show}>
        <Box sx={getModalStyle()}>
          {props.children}
        </Box>
      </Fade>
    </Modal>
  );
};

export default BasicModal;