import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import FormBeliItem from "./utils/formBeliItem";
import DialogFormTambahBrg from "./utils/dialogFormTambahBrg";

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
  return (
    <Grid container className={classes.container}>
      <Grid item lg={12} className={classes.wrapper}>
        <h1 className={classes.header}>Form Pembelian Barang</h1>
      </Grid>
      <Grid item lg={12}>
        <FormBeliItem />
      </Grid>
    </Grid>
  );
}

export default beliItem;
