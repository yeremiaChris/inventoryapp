import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { fieldList, select } from "./utils";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  dialog: {
    width: 600,
  },
  field: {
    marginBottom: 20,
  },
  formControl: {
    minWidth: 120,
    marginBottom: 20,
  },
}));
export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  // select state
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div>
      <Button
        onClick={handleClickOpen}
        className={classes.button}
        startIcon={<AddIcon />}
      >
        Tambah
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Tambah Barang</DialogTitle>
        <DialogContent className={classes.dialog}>
          {fieldList &&
            fieldList.map((item) => {
              return (
                <TextField
                  className={classes.field}
                  key={item.key}
                  margin="dense"
                  id="name"
                  label={item.nama}
                  type="text"
                  fullWidth
                />
              );
            })}
          <FormControl fullWidth className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Satuan</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              onChange={handleChange}
            >
              {select &&
                select.map((item) => {
                  return (
                    <MenuItem key={item.key} value={item.nama}>
                      {item.nama}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Batal
          </Button>
          <Button onClick={handleClose} color="primary">
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
