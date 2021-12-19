import React, { useState } from 'react';
import { TableRow, TableCell, TableBody, Button, Snackbar, Alert } from '@mui/material';
import { useCheckInChild, useCheckOutChild } from '../../api';
import { formatDate } from '../helpers';
import ConfirmCheckoutDialog from '../Dialogs/ConfirmCheckoutDialog';
import ConfirmCheckInDialog from '../Dialogs/ConfirmCheckInDialog';
import { Child } from '../../types';

enum DialogType {
  CHECKIN,
  CHECKOUT
}

interface Props {
  data?: Array<Child>;
}

const ChildrenData = ({ data }: Props) => {
  const [openDialogType, setOpenDialogType] = useState<DialogType | null>(null);
  const [selectedChildId, setSelectedChildId] = useState('');
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState<string | null>(null);

  const checkInMutation = useCheckInChild();
  const checkOutMutation = useCheckOutChild();

  const openDialog = (type: DialogType) => {
    setOpenDialogType(type);
  }

  const closeDialog = () => {
    setOpenDialogType(null);
    setSelectedChildId('');
  }

  const withErrorSnackbar = (fn: (...args: any[]) => Promise<void>) => async (...args: any[]) => {
    try {
      await fn(...args);
    } catch (e) {
      setErrorSnackbarMessage((e as any).response?.data?.error ?? 'An unknown error occured');
    } finally {
      closeDialog();
    }
  }

  const checkoutChild = withErrorSnackbar(async () => {
    await checkOutMutation.mutateAsync(selectedChildId);
  });

  const checkInChild = withErrorSnackbar(async (pickupTime: string) => {
    await checkInMutation.mutateAsync({ childId: selectedChildId, pickupTime });
  });

  return (
    <>
    <TableBody>
      {data && data.map(({ childId, name: { fullName }, birthday, checkinTime, pickupTime, checkedIn }) => {
        const actionType = checkedIn ? 'Check-out' : 'Check-in';

        const handleButtonClick = () => {
          setSelectedChildId(childId);
          openDialog(checkedIn ? DialogType.CHECKOUT : DialogType.CHECKIN);
        }

        return (
          <TableRow key={childId}>
            <TableCell component="th" scope="row">
              {fullName}
            </TableCell>
            <TableCell>{birthday ? formatDate(birthday, 'dd/MM/yyyy') : 'N/A'}</TableCell>
            <TableCell>{checkedIn ? 'Yes' : 'No'}</TableCell>
            <TableCell>{checkinTime ? formatDate(checkinTime, "HH:mm") : 'N/A'}</TableCell>
            <TableCell>{pickupTime ? formatDate(pickupTime, "HH:mm") : 'N/A'}</TableCell>
            <TableCell><Button variant="contained" onClick={handleButtonClick}>{actionType}</Button></TableCell>
          </TableRow>
        )
      })}
      <ConfirmCheckoutDialog onClose={closeDialog} open={openDialogType === DialogType.CHECKOUT} onConfirm={checkoutChild} />
      <ConfirmCheckInDialog onClose={closeDialog} open={openDialogType === DialogType.CHECKIN} onConfirm={checkInChild} />
    </TableBody>
    <Snackbar open={!!errorSnackbarMessage} onClose={() => setErrorSnackbarMessage(null)}>
      <Alert onClose={() => setErrorSnackbarMessage(null)} severity="error">
        {errorSnackbarMessage}
      </Alert>
    </Snackbar>
    </>
  );
}

export default ChildrenData;