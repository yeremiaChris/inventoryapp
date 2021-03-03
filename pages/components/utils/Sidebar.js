import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  ul: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  logo: {
    textAlign: "center",
    fontFamily: "Arial",
    fontSize: 20,
    marginBottom: 15,
  },
  li: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "white",
    color: "black",
    padding: 5,
    fontSize: 18,
    "&:hover": {
      boxShadow: "1px 5px 2px #9a19f3",
      cursor: "pointer",
    },
    transition: ".2s",
  },
}));
export default function Sidebar() {
  const classes = useStyles();
  return (
    <ul className={classes.ul}>
      <li className={classes.logo}>INVENTORY</li>
      <li className={classes.li}>Dashboard</li>
      <li className={classes.li}>Daftar Barang</li>
      <li className={classes.li}>Form Pengeluaran</li>
      <li className={classes.li}>Laporan Pengeluaran</li>
      <li className={classes.li}>Tambah Barang</li>
    </ul>
  );
}
