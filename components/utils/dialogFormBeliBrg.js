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
  beliSchema,
  handleChangeTambahBarang,
  submitItem,
  editButton,
  fieldListDua,
  formatRupiah,
} from "./utils";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import EditIcon from "@material-ui/icons/Edit";
import { beliItem } from "../../src/redux/actions";
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
  wrapperKeterangan: {
    display: "flex",
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
  const pilihBarang = useSelector((state) => state.daftarItem.daftarItem);

  // state untuk keterangan beli
  const [keteranganBeli, setKeteranganBeli] = React.useState({
    hargaSatuan: 0,
    totalHarga: 0,
    stokAwal: 0,
    namaBarang: "",
    satuan: "",
    totalStok: 0,
    display: false,
  });
  // function mendapatkan keterangan
  const keteranganBeliFunctionSelect = (e, values) => {
    pilihBarang.map((item) =>
      item.key === e.target.value
        ? setKeteranganBeli({
            hargaSatuan: item.hargaPerSatuan,
            totalHarga:
              values.jumlahBeli === 0
                ? 0
                : values.jumlahBeli * item.hargaPerSatuan,
            stokAwal: item.stok,
            namaBarang: item.nama,
            satuan: item.satuan,
            hargaSatuan: item.hargaPerSatuan,
            totalStok: item.stok === 0 ? 0 : item.stok + values.jumlahBeli,
            display: true,
          })
        : item
    );
  };
  // reset keterangan
  const resetKeterangan = () => {
    setKeteranganBeli({ hargaSatuan: 0, totalHarga: 0, display: false });
  };
  const keteranganBeliTextField = (e) => {
    setKeteranganBeli((prevState) => ({
      ...prevState,
      totalStok: keteranganBeli.stokAwal + parseInt(e.target.value),
      totalHarga: keteranganBeli.hargaSatuan * parseInt(e.target.value),
    }));
  };

  // submit
  const submitFunction = (data) => {
    dispatch(beliItem(data, keteranganBeli, handleClose));
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
        Pilih barang beli
      </Button>
      <Dialog
        open={open}
        onClose={() => {
          handleClose();
          resetKeterangan();
        }}
        aria-labelledby="form-dialog-title"
      >
        <Formik
          initialValues={{ namaBarang: "", jumlahBeli: "" }}
          validationSchema={beliSchema}
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
                    {fieldListDua.map((item) =>
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
                                keteranganBeliFunctionSelect(e, values);
                              }}
                              onBlur={handleBlur("namaBarang")}
                            >
                              {pilihBarang &&
                                pilihBarang.map((item) => {
                                  return (
                                    <MenuItem
                                      key={item.key}
                                      selected={item.namaBarang}
                                      value={item.key}
                                    >
                                      {item.nama}
                                    </MenuItem>
                                  );
                                })}
                            </Select>
                          </FormControl>
                          {errors.namaBarang && touched.namaBarang ? (
                            <p className={classes.error}>{errors.namaBarang}</p>
                          ) : null}
                        </div>
                      ) : (
                        <div key={item.key}>
                          <TextField
                            className={classes.field}
                            key={item.key}
                            onChange={(e) => {
                              setFieldValue("jumlahBeli", e.target.value);
                              if (!Number(e.target.value)) {
                                return;
                              } else if (e.target.value <= 0) {
                                return setFieldValue("jumlahBeli", 0);
                              } else {
                                keteranganBeliTextField(e);
                              }
                            }}
                            margin="dense"
                            id="name"
                            value={values.jumlahBeli}
                            label={item.nama}
                            type="number"
                            fullWidth
                          />
                          {errors.jumlahBeli && touched.jumlahBeli ? (
                            <p className={classes.error}>{errors.jumlahBeli}</p>
                          ) : null}
                        </div>
                      )
                    )}
                    <div className={classes.wrapperKeterangan}>
                      <div style={{ marginRight: 20 }}>
                        <strong>
                          <p style={{ margin: 0 }}>Harga satuan</p>
                          <p style={{ margin: 0, marginTop: 10 }}>
                            Total harga
                          </p>
                        </strong>
                      </div>
                      <div>
                        <p style={{ margin: 0 }}>
                          {formatRupiah(keteranganBeli.hargaSatuan)}
                        </p>
                        <p style={{ margin: 0, marginTop: 10 }}>
                          {formatRupiah(keteranganBeli.totalHarga)}
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => {
                        resetKeterangan();
                        handleClose();
                      }}
                      color="primary"
                    >
                      Batal
                    </Button>
                    <Button type="submit" color="primary">
                      Beli
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
