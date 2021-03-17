import React from "react";
import MenuUtama from "../components/menuUtama";
import { Grid } from "@material-ui/core";
import TopBar from "../components/utils/topBar";
import Sidebar from "../components/utils/Sidebar";
import Footer from "../components/utils/footer";
import { fetchItem } from "../src/redux/actions";
import { useSelector, useDispatch } from "react-redux";

function index() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchItem());
  }, []);
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
        <Grid item lg={10} sm={10} md={10} xs={10}>
          <MenuUtama />
        </Grid>
      </Grid>
      <Grid container className="container" style={{ width: 1200 }}>
        <Footer />
      </Grid>
    </>
  );
}

export default index;
