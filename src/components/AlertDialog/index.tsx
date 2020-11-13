import React from "react";
import {
  DialogTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent
} from "@material-ui/core";


export interface AlertDialogProps {
  titleButtonConfirm: string;
  titleButtonClose: string;
  description: string | any;
  title: string;
  handleDialogClose: () => void;
  handleDialogConfirm: () => void;
  openAlertDialog: boolean
}

const AlertDialog: React.FC<AlertDialogProps> = (props: AlertDialogProps) => {
  const {
    titleButtonConfirm,
    titleButtonClose,
    description,
    title,
    handleDialogClose,
    handleDialogConfirm,
    openAlertDialog
  } = props;

  return (
    <Dialog
      maxWidth={false}
      disableBackdropClick={true}
      open={openAlertDialog}
      onClose={handleDialogClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <div id="alert-dialog-description">
          {description}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="primary">
          {titleButtonClose}
        </Button>
        <Button onClick={handleDialogConfirm} color="primary" autoFocus>
          {titleButtonConfirm}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AlertDialog;