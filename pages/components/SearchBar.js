import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import DirectionsIcon from "@material-ui/icons/Directions";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles((theme) => ({
  input: {
    marginLeft: theme.spacing(1),
    width: "80%",
  },
  root: {
    width: "100%",
  },
  iconButton: {
    padding: 10,
  },
}));
export default function CustomizedInputBase() {
  const classes = useStyles();
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Paper component="form" className={classes.root} s>
            <InputBase
              className={classes.input}
              placeholder="Cari Drum"
              inputProps={{ "aria-label": "search google mapsfsdfsd" }}
            />
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
