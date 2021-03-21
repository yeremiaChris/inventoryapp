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
import {
  fieldList,
  bahan,
  tambahSchema,
  handleChangeTambahBarang,
  submitItem,
  editButton,
} from "./utils";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useDispatch } from "react-redux";
import { Formik } from "formik";

import CurrencyTextField from "@unicef/material-ui-currency-textfield";
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
  error: {
    color: "red",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));
export default function FormDialog({
  open,
  handleClickOpen,
  handleClose,
  detail,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();

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
        <Formik
          initialValues={
            detail === undefined
              ? {
                  nama: "",
                  satuan: "",
                  hargaPerSatuan: "",
                }
              : {
                  nama: detail.nama,
                  satuan: detail.satuan,
                  hargaPerSatuan: detail.hargaPerSatuan,
                  key: detail._id,
                }
          }
          validationSchema={tambahSchema}
          onSubmit={(data) =>
            detail === undefined
              ? submitItem(data, dispatch, handleClose)
              : editButton(dispatch, data, handleClose)
          }
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
                  <DialogTitle id="form-dialog-title">
                    {detail === undefined ? "Tambah Item" : "Update Item"}
                  </DialogTitle>

                  <DialogContent className={classes.dialog}>
                    {fieldList.map((item) =>
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
                              value={values.satuan}
                              onChange={handleChange("satuan")}
                            >
                              {item.selection &&
                                item.selection.map((item) => {
                                  return (
                                    <MenuItem key={item.key} value={item.nama}>
                                      {item.nama}
                                    </MenuItem>
                                  );
                                })}
                            </Select>
                          </FormControl>
                          {errors.satuan && touched.satuan ? (
                            <div className={classes.error}>{errors.satuan}</div>
                          ) : null}
                        </div>
                      ) : (
                        <div key={item.key}>
                          {item.value === "nama" ? (
                            <TextField
                              className={classes.field}
                              margin="dense"
                              id="name"
                              label={item.nama}
                              type="text"
                              fullWidth
                              onChange={(e) =>
                                setFieldValue("nama", e.target.value)
                              }
                              value={values.nama}
                            />
                          ) : (
                            <CurrencyTextField
                              label={item.nama}
                              fullWidth
                              variant="standard"
                              value={values.hargaPerSatuan}
                              currencySymbol="Rp. "
                              textAlign="left"
                              outputFormat="number"
                              maximumValue="1000000000"
                              minimumValue="0"
                              decimalCharacter="."
                              digitGroupSeparator=","
                              onChange={(e, value) => {
                                setFieldValue("hargaPerSatuan", value);
                              }}
                            />
                          )}

                          {item.value === "nama" ? (
                            <div>
                              {errors.nama && touched.nama ? (
                                <div className={classes.error}>
                                  {errors.nama}
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            <div>
                              {errors.hargaPerSatuan &&
                              touched.hargaPerSatuan ? (
                                <div className={classes.error}>
                                  {errors.hargaPerSatuan}
                                </div>
                              ) : null}
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Batal
                    </Button>
                    <Button type="submit" color="primary">
                      Simpan
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
