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
  beliSchema,
} from "./utils";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useRouter } from "next/router";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import EditIcon from "@material-ui/icons/Edit";
import { formatRupiah } from "./utils";
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
  fieldListDua,
  title,
}) {
  const router = useRouter();
  const classes = useStyles();
  const dispatch = useDispatch();

  // untuk select pada beliItem
  const bahan = useSelector((state) => state.daftarItem.daftarItem);

  // state detail pas pembelian
  const [detailInfoBeli, setDetailInfoBeli] = React.useState({
    nama: "",
    stokAwal: 0,
    jumlahBeli: 0,
    totalStok: 0,
    hargaSatuan: 0,
  });
  // state detail pas pembelian
  const [detailInfoJual, setDetailInfoJual] = React.useState({
    nama: "",
    stokAwal: 0,
    jumlahBeli: 0,
    hargaSatuan: 0,
  });
  // error jumlah jual lebih besar dari stok
  const [error, setError] = React.useState("");
  // jumlahBeli
  const totalHarga = (a, b) => {
    const angka = a * b;
    return formatRupiah(angka);
  };
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
          {title}
        </Button>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <Formik
          initialValues={
            router.pathname === "/daftarBarang"
              ? detail === undefined
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
              : {
                  namaBarang: "",
                  jumlahBeli: 0,
                }
          }
          validationSchema={
            router.pathname === "/daftarBarang" ? tambahSchema : beliSchema
          }
          onSubmit={(data) =>
            router.pathname === "/daftarBarang"
              ? detail === undefined
                ? submitItem(data, dispatch, handleClose)
                : editButton(dispatch, data, handleClose)
              : dispatch(beliItem(data, detailInfoBeli, handleClose))
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
                  {router.pathname === "/daftarBarang" ? (
                    <DialogTitle id="form-dialog-title">
                      {detail === undefined ? "Tambah Item" : "Update Item"}
                    </DialogTitle>
                  ) : (
                    <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                  )}

                  <DialogContent className={classes.dialog}>
                    {router.pathname === "/daftarBarang"
                      ? fieldList &&
                        fieldList.map((item) =>
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
                                        <MenuItem
                                          key={item.key}
                                          value={item.nama}
                                        >
                                          {item.nama}
                                        </MenuItem>
                                      );
                                    })}
                                </Select>
                              </FormControl>
                              {errors.satuan && touched.satuan ? (
                                <div className={classes.error}>
                                  {errors.satuan}
                                </div>
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
                                  handleChangeTambahBarang(
                                    e,
                                    item,
                                    setFieldValue
                                  )
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
                        )
                      : fieldListDua &&
                        fieldListDua.map((item) =>
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
                                  value={values.namaBarang}
                                  onChange={(e) => {
                                    router.pathname === "/beliBarang"
                                      ? bahan.map((item) =>
                                          item.key === e.target.value
                                            ? setDetailInfoBeli(
                                                (prevState) => ({
                                                  ...prevState,
                                                  nama: item.nama,
                                                  satuan: item.satuan,
                                                  stokAwal: item.stok,
                                                  jumlahBeli: values.jumlahBeli,
                                                  hargaSatuan:
                                                    item.hargaPerSatuan,
                                                  key: item.key,
                                                })
                                              )
                                            : null
                                        )
                                      : bahan.map((item) =>
                                          item.key === e.target.value
                                            ? setDetailInfoJual(
                                                (prevState) => ({
                                                  ...prevState,
                                                  nama: item.nama,
                                                  satuan: item.satuan,
                                                  stokAwal: item.stok,
                                                  jumlahBeli: values.jumlahBeli,
                                                  hargaSatuan:
                                                    item.hargaPerSatuan,
                                                  key: item.key,
                                                })
                                              )
                                            : null
                                        );
                                    setFieldValue("namaBarang", e.target.value);
                                  }}
                                >
                                  {bahan &&
                                    bahan.map((item) => {
                                      return (
                                        <MenuItem
                                          key={item.key}
                                          selected={item.nama}
                                          value={item.key}
                                        >
                                          {item.nama}
                                        </MenuItem>
                                      );
                                    })}
                                </Select>
                              </FormControl>
                              {errors.namaBarang && touched.namaBarang ? (
                                <div className={classes.error}>
                                  {errors.namaBarang}
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            <div key={item.key}>
                              {router.pathname === "/beliBarang" ? (
                                <TextField
                                  className={classes.field}
                                  key={item.key}
                                  onChange={(e) => {
                                    if (!Number(e.target.value)) {
                                      return;
                                    } else if (e.target.value < 0) {
                                      return setFieldValue("jumlahBeli", 0);
                                    } else {
                                      setDetailInfoBeli((prevState) => ({
                                        ...prevState,
                                        jumlahBeli: e.target.value,
                                        totalStok:
                                          detailInfoBeli.stokAwal === 0
                                            ? parseInt(e.target.value)
                                            : parseInt(
                                                detailInfoBeli.stokAwal
                                              ) + parseInt(e.target.value),
                                      }));
                                      setFieldValue(
                                        "jumlahBeli",
                                        e.target.value
                                      );
                                    }
                                  }}
                                  margin="dense"
                                  id="name"
                                  value={values.jumlahBeli}
                                  label={item.nama}
                                  type="number"
                                  fullWidth
                                />
                              ) : (
                                <TextField
                                  className={classes.field}
                                  key={item.key}
                                  onChange={(e) => {
                                    if (!Number(e.target.value)) {
                                      return;
                                    } else if (e.target.value < 0) {
                                      return setFieldValue("jumlahBeli", 0);
                                    } else if (
                                      e.target.value > detailInfoBeli.stokAwal
                                    ) {
                                      setError(
                                        "Tidak boleh lebih dari stok awal"
                                      );
                                      return setFieldValue(
                                        "jumlahBeli",
                                        detailInfoBeli.stokAwal
                                      );
                                    } else {
                                      setError("");
                                      setFieldValue(
                                        "jumlahBeli",
                                        e.target.value
                                      );
                                      setDetailInfoJual((prevState) => ({
                                        ...prevState,
                                        jumlahJual: parseInt(e.target.value),
                                      }));
                                    }
                                  }}
                                  margin="dense"
                                  id="name"
                                  value={values.jumlahBeli}
                                  label={item.nama}
                                  type="number"
                                  fullWidth
                                />
                              )}

                              <div>
                                {errors.jumlahBeli && touched.jumlahBeli ? (
                                  <div className={classes.error}>
                                    {errors.jumlahBeli}
                                  </div>
                                ) : null}
                              </div>
                              <div className={classes.error}>
                                {error.length > 0 ? error : null}
                              </div>
                              <div
                                className={classes.containerKeteranganBarang}
                                style={{
                                  display:
                                    values.namaBarang.length === 0
                                      ? "none"
                                      : "flex",
                                }}
                              >
                                <div className={classes.kiri}>
                                  <p>NAMA </p>
                                  <p>SATUAN </p>
                                  <p>STOK AWAL </p>
                                  <p>JUMLAH BELI </p>
                                  <p>TOTAL STOK</p>
                                  <p>HARGA SATUAN</p>
                                  {router.pathname === "/beliBarang" ? (
                                    <p>TOTAL HARGA</p>
                                  ) : null}
                                </div>
                                <div>
                                  <p>{detailInfoBeli.nama}</p>
                                  <p>{detailInfoBeli.satuan}</p>
                                  <p>{detailInfoBeli.stokAwal}</p>
                                  <p>{detailInfoBeli.jumlahBeli} </p>
                                  <p>{detailInfoBeli.totalStok}</p>
                                  <p>
                                    {formatRupiah(detailInfoBeli.hargaSatuan)}
                                  </p>
                                  {router.pathname === "/beliBarang" ? (
                                    <p>
                                      {totalHarga(
                                        values.jumlahBeli,
                                        detailInfoBeli.hargaSatuan
                                      )}
                                    </p>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          )
                        )}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Batal
                    </Button>
                    <Button type="submit" color="primary">
                      {router.pathname === "/daftarBarang"
                        ? "Simpan"
                        : "Masukkan"}
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
