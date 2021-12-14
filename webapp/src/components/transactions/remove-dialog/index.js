import React from 'react'
import { Dialog, DialogTitle, DialogActions, Button, DialogContent, DialogContentText } from '@material-ui/core'
import { func, bool } from 'prop-types'

export const RemoveDialog = ({ open, handleCancel, handleConfirm }) => {
  return (
    <Dialog fullWidth open={open}>
      <DialogTitle>Remove Transaction</DialogTitle>
      <DialogContent>
        <DialogContentText>Are you sure you want to remove this transaction?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>No</Button>
        <Button onClick={handleConfirm}>Yes</Button>
      </DialogActions>
    </Dialog>
  )
}

RemoveDialog.propTypes = {
  open: bool,
  handleCancel: func,
  handleConfirm: func
}
