import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useDialogContext } from "../../context/dialog";
import React from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogContextElement = () => {
  const {
    isDialogOpen,
    hideDialog,
    dialogTitle,
    dialogContent,
    dialogButtons
  } = useDialogContext();
  const dialogStyle = {
    zIndex: 5000,
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth={"md"}
      style={dialogStyle}
      open={isDialogOpen}
      TransitionComponent={Transition}
      onClose={hideDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent id="alert-dialog-description">
        {dialogContent}
      </DialogContent> 
      <DialogActions>
        <>
          {dialogButtons}
        </>
      </DialogActions>
    </Dialog>
  );
}

export default DialogContextElement;