import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import SaveIcon from "@material-ui/icons/Save";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { TextareaAutosize } from "@material-ui/core";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles({
  root: {
    margin: "0 20px",
  },
  media: {
    height: 350,
    display: "grid",
    backgroundColor: "rgb(199, 194, 194)",
  },
  stok: {
    marginTop: 10,
  },
  input: {
    display: "none",
  },
});

export default function MediaCard() {
  const classes = useStyles();
  const onSubmit = (values) => console.log(values);
  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <label htmlFor="icon-button-file">
            <CardMedia className={classes.media} title="Contemplative Reptile">
              <input
                accept="image/*"
                className={classes.input}
                id="icon-button-file"
                type="file"
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera />
              </IconButton>
            </CardMedia>
          </label>
          <CardContent></CardContent>
        </CardActionArea>
        <TextField
          id="standard-full-width"
          label="Nama Barang"
          style={{ margin: 8 }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <CardActions>
          <FormControl>
            <InputLabel htmlFor="component-simple">Stok</InputLabel>
            <Input id="component-simple" type="number" />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="component-simple">Harga</InputLabel>
            <Input id="component-simple" type="number" />
          </FormControl>
        </CardActions>
        <Grid>
          <BottomNavigation className={classes.root}>
            <BottomNavigationAction
              label="Recents"
              value="recents"
              icon={<SaveIcon />}
            />
            <BottomNavigationAction
              label="Reset"
              value="favorites"
              icon={<RestoreIcon />}
            />
          </BottomNavigation>
        </Grid>
      </Card>
    </>
  );
}
