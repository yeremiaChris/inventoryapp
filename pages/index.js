import React from "react";
import MenuUtama from "../components/menuUtama";
import { Grid, makeStyles } from "@material-ui/core";
import TopBar from "../components/utils/topBar";
import Sidebar from "../components/utils/Sidebar";
import Footer from "../components/utils/footer";
import { useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  container: {
    width: 1200,
    margin: "auto",
    fontFamily: "Akaya Kanadaka",
  },
  sideItem: {
    backgroundColor: "black",
    marginTop: 10,
    borderRadius: 15,
    height: 350,
    opacity: 4,
    color: "white",
    padding: 10,
  },
}));
function index() {
  const classes = useStyles();
  return (
    <>
      <TopBar />
      <Grid container className={classes.container}>
        <Grid item lg={2} sm={2} md={2} xs={2} className={classes.sideItem}>
          <Sidebar />
        </Grid>
        <Grid item lg={10} sm={10} md={10} xs={10}>
          <MenuUtama />
        </Grid>
      </Grid>
      <Grid container className={classes.container}>
        <Footer />
      </Grid>
    </>
  );
}

export default index;
