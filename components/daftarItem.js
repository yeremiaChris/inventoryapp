import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import TableDaftarBarang from "./utils/tableDaftarBarang";
import ButtonSortDaftarBrg from "./utils/buttonSortDaftarBrg";
import ButtonDialogFormTambahBarang from "./utils/dialogFormTambahBrg";

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
  header: {
    fontSize: 30,
    margin: 0,
    marginBottom: 20,
    fontFamily: "Arial",
  },
  table: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 5,
  },
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
}));
function daftarItem() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid container className={classes.container}>
      <Grid item lg={12} className={classes.wrapper}>
        <h1 className={classes.header}>Daftar Barang</h1>

        <ButtonDialogFormTambahBarang />
      </Grid>
      <Grid item lg={12}>
        <ButtonSortDaftarBrg />
        <TableDaftarBarang />
      </Grid>
    </Grid>
  );
}

export default daftarItem;
