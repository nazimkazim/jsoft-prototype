import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import {IconButton} from '@material-ui/core'


export default function Update(props: any) {
  const {handleSubmit, region} = props

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(region.name)

  const handleClickOpen = () => {setOpen(true)};
  const handleClose = () => {setOpen(false)};

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Изменить регион</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Регион"
            value={value}
            onChange={e => setValue(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отмена
          </Button>
          <Button onClick={handleClose} color="primary">
            Подвердить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
