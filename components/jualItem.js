import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import FormBeliItem from "./utils/formBeliItem";
import DialogFormTambahBrg from "./utils/dialogFormTambahBrg";
import { fieldListTiga } from "./utils/utils";
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
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // akhir state menampilkan dialog
  return (
    <Grid container className={classes.container}>
      <Grid item lg={12} className={classes.wrapper}>
        <h1 className={classes.header}>Form Penjualan Barang</h1>
      </Grid>
      <Grid item lg={12}>
        <DialogFormTambahBrg
          open={open}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          title="Pilih Barang Jual"
          fieldListDua={fieldListTiga}
        />
        <FormBeliItem />
      </Grid>
    </Grid>
  );
}

export default jualItem;
