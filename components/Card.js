import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import FolderOutlinedIcon from "@material-ui/icons/FolderOutlined";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
const useStyles = makeStyles({
  root: {
    margin: "0 20px",
  },
  media: {
    height: 100,
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
});

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Grid container spacing={2} justify="space-between">
        <Grid item xs={3}>
          <Link href="/cards/ListCardItemDrum.js" as="/cards/ListCardItemDrum">
            <a className={classes.link}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  title="Drum"
                  children={
                    <FolderOutlinedIcon color="action" fontSize="large" />
                  }
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    className={classes.content}
                  >
                    Drum
                  </Typography>
                </CardContent>
              </CardActionArea>
            </a>
          </Link>
        </Grid>
        <Grid item xs={3}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              title="Contemplative Reptile"
              children={
                <FolderOutlinedIcon color="action" className={classes.paper} />
              }
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                className={classes.content}
              >
                Guitar
              </Typography>
            </CardContent>
          </CardActionArea>
        </Grid>
        <Grid item xs={3}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              title="Contemplative Reptile"
              children={
                <FolderOutlinedIcon color="action" className={classes.paper} />
              }
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                className={classes.content}
              >
                Keyboard
              </Typography>
            </CardContent>
          </CardActionArea>
        </Grid>
        <Grid item xs={3}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              title="Contemplative Reptile"
              children={
                <FolderOutlinedIcon color="action" className={classes.paper} />
              }
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                className={classes.content}
              >
                Bass
              </Typography>
            </CardContent>
          </CardActionArea>
        </Grid>
      </Grid>
    </Card>
  );
}
