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
                  key: detail.key,
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
                          <TextField
                            className={classes.field}
                            margin="dense"
                            id="name"
                            label={item.nama}
                            type={item.value === "nama" ? "text" : "number"}
                            fullWidth
                            onChange={(e) =>
                              handleChangeTambahBarang(e, item, setFieldValue)
                            }
                            value={
                              item.value === "nama"
                                ? values.nama
                                : values.hargaPerSatuan
                            }
                          />
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
