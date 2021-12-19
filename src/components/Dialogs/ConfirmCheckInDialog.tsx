import React, {useState} from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { Button, DialogActions, DialogContent } from '@mui/material';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import { formatDateForPickupTime } from '../helpers';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (pickupTime: string) => void;
}

const ConfirmCheckInDialog = ({ open, onClose, onConfirm }: Props) => {
  const [pickupTime, setPickupTime] = useState<Date | null>(null);

  const checkIn = () => {
    if (!pickupTime) {
      return;
    }

    const selectedPickupTime = formatDateForPickupTime(pickupTime);

    onConfirm(selectedPickupTime);
  }

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Choose pick up time</DialogTitle>
      <DialogContent>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          minTime={new Date()}
          value={pickupTime}
          onChange={setPickupTime}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      </DialogContent>
      <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button disabled={!pickupTime} onClick={checkIn}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmCheckInDialog;