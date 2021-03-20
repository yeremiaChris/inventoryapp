import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core";
import {
  fieldList,
  bahan,
  handleChangeTambahBarang,
  submitItem,
  editButton,
  formatRupiah,
} from "./utils";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { Formik } from "formik";
import EditIcon from "@material-ui/icons/Edit";
import { beliItem, jualItem } from "../../src/redux/actions";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

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
  menuButton: {
    marginRight: theme.spacing(2),
    marginBottom: 10,
  },
  error: {
    margin: 0,
    color: "red",
  },
}));
export default function FormDialog({
  open,
  handleClickOpen,
  handleClose,
  detail,
  title,
  inputField,
  initialValue,
  pilihBarang,
  keterangan,
  setKeterangan,
  keteranganTextField,
  keteranganFunctionSelect,
  schema,
  disabledButtonInputJumlahJual,
  error,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

  // submit
  const submitFunction = (data) => {
    router.pathname === "/beliBarang"
      ? dispatch(beliItem(data, keterangan, handleClose))
      : dispatch(jualItem(data, keterangan, handleClose));
    setKeterangan({
      hargaSatuan: 0,
      totalHarga: 0,
      stokAwal: 0,
      namaBarang: "",
      satuan: "",
      totalStok: 0,
    });
  };

  // router
  const router = useRouter();

  // onchange textField
  const onChangeTextFieldBeli = (setFieldValue, e) => {
    setFieldValue("jumlahBeli", e.target.value);
    if (!Number(e.target.value)) {
      return;
    } else if (e.target.value <= 0) {
      return setFieldValue("jumlahBeli", 0);
    } else {
      keteranganTextField(e);
    }
  };
  // onchange textField
  const onChangeTextFieldJual = (setFieldValue, e) => {
    setFieldValue("jumlahJual", e.target.value);
    if (!Number(e.target.value)) {
      return;
    } else if (e.target.value <= 0) {
      return setFieldValue("jumlahJual", 0);
    } else {
      keteranganTextField(e, setFieldValue);
    }
  };
  return (
    <div>
      <Button
        onClick={() => handleClickOpen()}
        variant="contained"
        color="secondary"
        startIcon={<EditIcon />}
        className={classes.menuButton}
      >
        Pilih barang {title}
      </Button>
      <Dialog
        open={open}
        onClose={() => {
          handleClose();
          setKeterangan({
            hargaSatuan: 0,
            totalHarga: 0,
            stokAwal: 0,
            namaBarang: "",
            satuan: "",
            totalStok: 0,
          });
        }}
        aria-labelledby="form-dialog-title"
      >
        <Formik
          initialValues={initialValue}
          validationSchema={schema}
          onSubmit={submitFunction}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
          }) => {
            return (
              <>
                <form onSubmit={handleSubmit}>
                  <DialogTitle id="form-dialog-title">Pilih barang</DialogTitle>
                  <DialogContent className={classes.dialog}>
                    {inputField &&
                      inputField.map((item) =>
                        item.select ? (
                          <div key={item.key}>
                            <FormControl
                              fullWidth
                              className={classes.formControl}
                            >
                              <InputLabel id="demo-simple-select-label">
                                {item.nama}
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={values.namaBarang}
                                onChange={(e) => {
                                  setFieldValue("namaBarang", e.target.value);
                                  keteranganFunctionSelect(e, values);
                                }}
                                onBlur={handleBlur("namaBarang")}
                              >
                                {pilihBarang &&
                                  pilihBarang.map((item) => {
                                    return (
                                      <MenuItem
                                        key={item._id}
                                        selected={item.namaBarang}
                                        value={item._id}
                                      >
                                        {item.nama}
                                      </MenuItem>
                                    );
                                  })}
                              </Select>
                            </FormControl>
                            {errors.namaBarang && touched.namaBarang ? (
                              <p className={classes.error}>
                                {errors.namaBarang}
                              </p>
                            ) : null}
                          </div>
                        ) : router.pathname === "/beliBarang" ? (
                          <div key={item.key}>
                            <TextField
                              className={classes.field}
                              key={item.key}
                              onChange={(e) => {
                                onChangeTextFieldBeli(setFieldValue, e);
                              }}
                              margin="dense"
                              id="name"
                              value={values.jumlahBeli}
                              label={item.nama}
                              type="number"
                              fullWidth
                            />
                            {errors.jumlahBeli && touched.jumlahBeli ? (
                              <p className={classes.error}>
                                {errors.jumlahBeli}
                              </p>
                            ) : null}
                          </div>
                        ) : (
                          <div key={item.key}>
                            <TextField
                              disabled={disabledButtonInputJumlahJual}
                              className={classes.field}
                              key={item.key}
                              onChange={(e) => {
                                onChangeTextFieldJual(setFieldValue, e);
                              }}
                              margin="dense"
                              id="name"
                              value={values.jumlahJual}
                              label={item.nama}
                              type="number"
                              fullWidth
                            />
                            {errors.jumlahJual && touched.jumlahJual ? (
                              <p className={classes.error}>
                                {errors.jumlahJual}
                              </p>
                            ) : null}
                            {error.length === 0 ? null : (
                              <p className={classes.error}>{error}</p>
                            )}
                          </div>
                        )
                      )}
                    <div
                      style={{
                        display:
                          keterangan.namaBarang.length === 0 ? "none" : "flex",
                      }}
                    >
                      <div style={{ marginRight: 20 }}>
                        <strong>
                          <p style={{ margin: 0 }}>Stok awal</p>
                          <p style={{ margin: 0, marginTop: 10 }}>
                            Harga satuan
                          </p>
                          <p style={{ margin: 0, marginTop: 10 }}>
                            Total harga
                          </p>
                        </strong>
                      </div>
                      <div>
                        <p style={{ margin: 0 }}>{keterangan.stokAwal}</p>
                        <p style={{ margin: 0, marginTop: 10 }}>
                          {formatRupiah(keterangan.hargaSatuan)}
                        </p>
                        <p style={{ margin: 0, marginTop: 10 }}>
                          {formatRupiah(keterangan.totalHarga)}
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => {
                        handleClose();
                        setKeterangan({
                          hargaSatuan: 0,
                          totalHarga: 0,
                          stokAwal: 0,
                          namaBarang: "",
                          satuan: "",
                          totalStok: 0,
                        });
                      }}
                      color="primary"
                    >
                      Batal
                    </Button>
                    <Button type="submit" color="primary">
                      Masukkan
                    </Button>
                  </DialogActions>
                </form>
              </>
            );
          }}
        </Formik>
      </Dialog>
    </div>
  );
}
