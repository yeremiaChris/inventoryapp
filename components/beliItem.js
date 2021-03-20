import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import FormBeliItem from "./utils/formBeliItem";
import DialogFormBeliBrg from "./utils/dialogFormBeliJualBrg";
import { fieldListDua, beliSchema } from "./utils/utils";
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
function beliItem() {
  const classes = useStyles();
  // state menampilkan dialog
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // akhir state menampilkan dialog

  // schema
  const schema = {
    namaBarang: "",
    jumlahBeli: 0,
  };

  // state beli dialog
  const pilihBarang = useSelector((state) => state.daftarItem.daftarItem);

  // state untuk keterangan beli
  const [keteranganBeli, setKeteranganBeli] = React.useState({
    hargaSatuan: 0,
    totalHarga: 0,
    stokAwal: 0,
    namaBarang: "",
    satuan: "",
    totalStok: 0,
  });
  // function mendapatkan keterangan
  const keteranganBeliFunctionSelect = (e, values) => {
    pilihBarang.map((item) =>
      item._id === e.target.value
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
          })
        : item
    );
  };
  const keteranganBeliTextField = (e) => {
    setKeteranganBeli((prevState) => ({
      ...prevState,
      totalStok: keteranganBeli.stokAwal + parseInt(e.target.value),
      totalHarga: keteranganBeli.hargaSatuan * parseInt(e.target.value),
    }));
  };

  return (
    <Grid container className={classes.container}>
      <Grid item lg={12} className={classes.wrapper}>
        <h1 className={classes.header}>Form Pembelian Barang</h1>
      </Grid>
      <Grid item lg={12}>
        <DialogFormBeliBrg
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          title="beli"
          inputField={fieldListDua}
          initialValue={schema}
          pilihBarang={pilihBarang}
          keterangan={keteranganBeli}
          keteranganFunctionSelect={keteranganBeliFunctionSelect}
          keteranganTextField={keteranganBeliTextField}
          setKeterangan={setKeteranganBeli}
          schema={beliSchema}
        />
        <FormBeliItem />
      </Grid>
    </Grid>
  );
}

export default beliItem;
