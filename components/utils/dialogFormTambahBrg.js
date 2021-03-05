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
import { fieldList, select, bahan, fieldListDua } from "./utils";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Router, useRouter } from "next/router";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

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
  kiri: {
    marginRight: 50,
  },
}));
export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
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
  const [jumlah, setJumlah] = React.useState(0);
  return (
    <div>
      {router.pathname === "/daftarBarang" ? (
        <Button
          onClick={handleClickOpen}
          className={classes.button}
          startIcon={<AddIcon />}
        >
          Tambah
        </Button>
      ) : (
        <Button
          style={{ marginBottom: 10 }}
          variant="contained"
          color="secondary"
          onClick={handleClickOpen}
          startIcon={<AddShoppingCartIcon />}
        >
          Pilih barang beli
        </Button>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        {router.pathname === "/daftarBarang" ? (
          <>
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
          </>
        ) : (
          <>
            <DialogTitle id="form-dialog-title">Beli barang</DialogTitle>
            <DialogContent className={classes.dialog}>
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">
                  Pilih barang
                </InputLabel>
                <Select
                  native
                  value={age}
                  onChange={handleChange}
                  inputProps={{
                    name: "Pilih barang",
                    id: "age-native-simple",
                  }}
                >
                  <option aria-label="None" value="" />
                  {bahan &&
                    bahan.map((item) => {
                      return (
                        <option key={item.key} value={item.nama}>
                          {item.nama}
                        </option>
                      );
                    })}
                </Select>
              </FormControl>

              {fieldListDua &&
                fieldListDua.map((item) => {
                  return (
                    <TextField
                      className={classes.field}
                      key={item.key}
                      onChange={(e) => {
                        if (!Number(e.target.value)) {
                          return;
                        }
                        setJumlah(e.target.value);
                      }}
                      margin="dense"
                      id="name"
                      value={jumlah}
                      label={item.nama}
                      type="number"
                      fullWidth
                    />
                  );
                })}

              <div
                className={classes.containerKeteranganBarang}
                style={{
                  display: age.length === 0 ? "none" : "flex",
                }}
              >
                <div className={classes.kiri}>
                  <p>STOK AWAL </p>
                  <p>TOTAL STOK </p>
                  <p>HARGA SATUAN</p>
                  <p>TOTAL HARGA</p>
                </div>
                <div>
                  <p>0</p>
                  <p>2 </p>
                  <p>Rp 10.000</p>
                  <p>Rp 20.000</p>
                </div>
              </div>
            </DialogContent>
          </>
        )}

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Batal
          </Button>
          <Button onClick={handleClose} color="primary">
            {router.pathname === "/daftarBarang" ? "Simpan" : "Pilih"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
