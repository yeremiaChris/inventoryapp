import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import TableDaftarBarang from "./utils/tableDaftarBarang";
import ButtonSortDaftarBrg from "./utils/buttonSort";
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
  // state detail untuk edit
  const [detail, setDetail] = React.useState();
  // state menampilkan dialog
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setDetail();
    setOpen(false);
  };
  // akhir state menampilkan dialog

  return (
    <Grid container className={classes.container}>
      <Grid item lg={12} className={classes.wrapper}>
        <h1 className={classes.header}>Daftar Barang</h1>
        <ButtonDialogFormTambahBarang
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          detail={detail}
        />
      </Grid>
      <Grid item lg={12}>
        <ButtonSortDaftarBrg />
        <TableDaftarBarang
          setDetail={setDetail}
          handleClickOpen={handleClickOpen}
        />
      </Grid>
    </Grid>
  );
}

export default daftarItem;
