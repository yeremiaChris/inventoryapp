import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import FormBeliItem from "./utils/formBeliItem";
import { fieldListTiga, jualSchema } from "./utils/utils";
import DialogFormJualBrg from "./utils/dialogFormBeliJualBrg";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  container: {
    marginLeft: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    paddingBottom: 30,
    paddingLeft: 20,
  },
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
  header: {
    fontSize: 30,
    margin: 0,
    marginBottom: 20,
    fontFamily: "Arial",
  },
  button: {
    marginBottom: 10,
  },
}));
function jualItem() {
  const classes = useStyles();
  // state menampilkan dialog
  const [
    disabledButtonInputJumlahJual,
    setdisabledButtonInputJumlahJual,
  ] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setError("");
    setdisabledButtonInputJumlahJual(false);
  };

  // akhir state menampilkan dialog

  // schema
  const schema = {
    namaBarang: "",
    jumlahJual: 0,
  };
  // state jual dialog
  const pilihBarang = useSelector((state) => state.daftarItem.daftarItem);

  // state untuk keterangan jual
  const [keteranganJual, setKeteranganJual] = React.useState({
    hargaSatuan: 0,
    totalHarga: 0,
    stokAwal: 0,
    namaBarang: "",
    satuan: "",
    totalStok: 0,
  });
  // function mendapatkan keterangan
  const [error, setError] = React.useState("");
  const selectFunctionKeteranganJual = (item, values) => {
    setKeteranganJual({
      hargaSatuan: item.hargaPerSatuan,
      totalHarga:
        values.jumlahJual === 0 ? 0 : values.jumlahJual * item.hargaPerSatuan,
      stokAwal: item.stok,
      namaBarang: item.nama,
      satuan: item.satuan,
      hargaSatuan: item.hargaPerSatuan,
      totalStok: item.stok === 0 ? 0 : item.stok + values.jumlahJual,
    });
    if (item.stok === 0) {
      setError("Stok tidak ada");
      setdisabledButtonInputJumlahJual(true);
    } else {
      setError("");
      setdisabledButtonInputJumlahJual(false);
    }
  };
  const keteranganJualFunctionSelect = (e, values) => {
    pilihBarang.map((item) =>
      item._id === e.target.value
        ? selectFunctionKeteranganJual(item, values)
        : item
    );
  };
  // const error textfield kalo jumlah beli terlalu besar
  const keteranganJualTextField = (e, setFieldValue) => {
    setKeteranganJual((prevState) => ({
      ...prevState,
      totalStok: keteranganJual.stokAwal - parseInt(e.target.value),
      totalHarga: keteranganJual.hargaSatuan * parseInt(e.target.value),
    }));
    if (e.target.value > keteranganJual.stokAwal) {
      setFieldValue("jumlahJual", keteranganJual.stokAwal);
      setError("jumlah jual tidak boleh lebih dari stok awal");
    } else {
      setError("");
    }
  };

  return (
    <Grid container className={classes.container}>
      <Grid item lg={12} className={classes.wrapper}>
        <h1 className={classes.header}>Form Penjualan Barang</h1>
      </Grid>
      <Grid item lg={12}>
        <DialogFormJualBrg
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          title="jual"
          inputField={fieldListTiga}
          initialValue={schema}
          keterangan={keteranganJual}
          pilihBarang={pilihBarang}
          keteranganFunctionSelect={keteranganJualFunctionSelect}
          keteranganTextField={keteranganJualTextField}
          setKeterangan={setKeteranganJual}
          schema={jualSchema}
          error={error}
          disabledButtonInputJumlahJual={disabledButtonInputJumlahJual}
        />
        <FormBeliItem />
      </Grid>
    </Grid>
  );
}

export default jualItem;
