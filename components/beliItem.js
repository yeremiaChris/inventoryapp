import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import FormBeliItem from "./utils/formBeliItem";
import DialogFormBeliBrg from "./utils/dialogFormBeliBrg";
import { fieldListDua } from "./utils/utils";
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
        />
        <FormBeliItem />
      </Grid>
    </Grid>
  );
}

export default beliItem;
