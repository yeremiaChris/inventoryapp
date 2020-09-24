import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import FolderOutlinedIcon from "@material-ui/icons/FolderOutlined";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Nav from "../../components/Nav";
const useStyles = makeStyles({
  root: {
    margin: "0 20px",
  },
  media: {
    height: 200,
    display: "grid",
    alignContent: "center",
    justifyContent: "center",
  },
  content: {
    textAlign: "left",
    fontSize: "1em",
  },
  input: {
    maxWidth: 50,
  },
  link: {
    textDecoration: "none",
    color: "black",
  },
  stok: {
    marginTop: "5px",
  },
  icon: {
    marginTop: "10px",
  },
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <TextField
              label="stok"
              id="outlined-size-small"
              defaultValue="2"
              variant="outlined"
              size="small"
              disabled={true}
              className={classes.stok}
            />
          </Grid>
          <Grid item xs={10}>
            <Nav />
          </Grid>
        </Grid>
        <Grid container spacing={2} justify="space-between">
          <Grid item xs={6}>
            <Link
              href="/cards/ListCardItemDrum.js"
              as="/cards/ListCardItemDrum"
            >
              <a className={classes.link}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    title="Contemplative Reptile"
                    image="/image/drum.png"
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      className={classes.content}
                    >
                      Drum Tama Superstar Classic CL72RS PGJP
                    </Typography>
                    <TextField
                      label="price"
                      id="outlined-size-small"
                      defaultValue="Rp 5.430.000"
                      variant="outlined"
                      size="small"
                    />
                  </CardContent>
                </CardActionArea>
              </a>
            </Link>
          </Grid>
          <Grid item xs={6}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                title="Contemplative Reptile"
                image="/image/drum2.png"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  className={classes.content}
                >
                  Drum Elektrik DM Lite Kit dari Alesis Nitro
                </Typography>
                <TextField
                  label="price"
                  id="outlined-size-small"
                  defaultValue="Rp 9.000.000"
                  variant="outlined"
                  size="small"
                />
              </CardContent>
            </CardActionArea>
          </Grid>
        </Grid>
      </Card>
      <Grid container justify="flex-end" className={classes.icon}>
        <Grid item xs={2}>
          <Fab color="primary" aria-label="add">
            <AddIcon />
          </Fab>
        </Grid>
      </Grid>
    </>
  );
}
