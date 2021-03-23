import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import TableLaporan from "./utils/tableLaporan";
import ButtonSortDaftarBrg from "./utils/buttonSort";
import { useRouter } from "next/router";
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
function laporanPembelian({ title }) {
  const classes = useStyles();
  const router = useRouter();
  return (
    <Grid container className={classes.container}>
      <Grid item lg={12} className={classes.wrapper}>
        <h1 className={classes.header}>Laporan {title} Barang</h1>
      </Grid>
      <Grid item lg={12}>
        <ButtonSortDaftarBrg
          api={
            router.pathname === "/laporan/laporanPembelian"
              ? "pembelian/"
              : "penjualan/"
          }
        />
        <TableLaporan />
      </Grid>
    </Grid>
  );
}

export default laporanPembelian;
