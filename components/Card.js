import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import FolderOutlinedIcon from "@material-ui/icons/FolderOutlined";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import IconButton from "@material-ui/core/IconButton";
import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles({
  root: {
    margin: "10px 20px",
    marginBottom: 20,
  },
  media: {
    height: 70,
    display: "grid",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "wheat",
  },
  content: {
    textAlign: "center",
    fontSize: "1em",
  },
  input: {
    maxWidth: 50,
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
  newFolder: {
    fontSize: 15,
    marginLeft: 10,
  },
  inputFolder: {
    marginLeft: 10,
    // display: "none",
  },
  cards: {
    height: 100,
  },
  fixed: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    margin: "auto",
  },
});

const add = () => {};

const folders = [
  { folder: "Drum", active: true },
  { folder: "Piano", active: true },
  { folder: "Guitar", active: true },
  { folder: "Bass", active: true },
];

export default function MediaCard() {
  const classes = useStyles();
  const [item, setItem] = useState(folders);

  const addItem = () => {
    setItem([
      ...item,
      {
        folder: "new",
        active: false,
      },
    ]);
  };

  return (
    <>
      <Grid container>
        {item.map((e, index) => (
          <Grid item xs={3}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  title="Contemplative Reptile"
                >
                  <FolderOutlinedIcon color="action" />
                </CardMedia>
                <TextField
                  id="outlined-size-small"
                  defaultValue={e.folder}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
        <BottomNavigation className={classes.fixed} showLabels>
          <BottomNavigationAction
            onClick={() => router.back()}
            label="Kembali"
            icon={<RestoreIcon />}
          />
          <BottomNavigationAction
            color="primary"
            aria-label="add"
            label="Tambah"
            icon={<AddIcon />}
            onClick={addItem}
          />
        </BottomNavigation>
      </Grid>
    </>
  );
}
