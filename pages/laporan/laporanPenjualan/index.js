import React from "react";
import MenuUtama from "../../../components/menuUtama";
import { Grid } from "@material-ui/core";
import TopBar from "../../../components/utils/topBar";
import Sidebar from "../../../components/utils/Sidebar";
import Footer from "../../../components/utils/footer";
import LaporanPenjualan from "../../../components/laporan";

function index() {
  return (
    <>
      <TopBar />
      <Grid container className="container" style={{ width: 1200 }}>
        <Grid
          item
          lg={2}
          sm={2}
          md={2}
          xs={2}
          style={{ marginTop: 10 }}
          className="sideItem"
        >
          <Sidebar />
        </Grid>
        <Grid item lg={10}>
          <LaporanPenjualan title="Penjualan" />
        </Grid>
      </Grid>
      <Grid container className="container" style={{ width: 1200 }}>
        <Footer />
      </Grid>
    </>
  );
}

export default index;
