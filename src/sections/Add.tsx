import React, { useState } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useAxios from "axios-hooks";
import { generateLocationPOSTData, SERVER_URL, TOKEN } from "../utils";
import {IconButton, Box} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import { YMaps, Placemark, Map } from 'react-yandex-maps';

export default function Add(props:any){
  const {handleSubmit, level = 0, parentId = 0} = props
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("")
  const randId = Math.floor(Math.random() * (10000 - 1)) + 1;

  const [{ data, loading, error }, execute]  = useAxios({
    url:SERVER_URL + '/api/v1/location',
    method: "POST",
    headers: { "Authorization": TOKEN, },
    // baseUrl: ""
  },{ manual: true })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleApiLoaded = (map:any, maps:any) => {
    console.log(map, maps)
  };
  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <AddIcon />
      </IconButton>
      {/*<Button variant="outlined" color="primary" onClick={handleClickOpen}>*/}
      {/*  Добавить*/}
      {/*</Button>*/}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={"md"} fullWidth>
        <DialogTitle id="form-dialog-title">Добавить регион</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Регион"
            type="email"
            onChange={e => setValue(e.target.value)}
            value={value}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Отмена
          </Button>
          <Button color="primary" onClick={e => {
            const data = generateLocationPOSTData({ level, value, parentId })
            execute({
              data,
            })
            handleSubmit({ id: randId, section_name: value, children:[{id:null, section_name:null}] })
          }}>
            Подвердить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
