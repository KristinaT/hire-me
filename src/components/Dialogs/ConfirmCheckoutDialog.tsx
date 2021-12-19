import React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Button, DialogActions } from '@mui/material';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmCheckoutDialog = ({ open, onClose, onConfirm }: Props) => {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Are you sure you want to checkout?</DialogTitle>
      <DialogActions>
          <Button onClick={onClose}>No</Button>
          <Button onClick={onConfirm}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmCheckoutDialog;