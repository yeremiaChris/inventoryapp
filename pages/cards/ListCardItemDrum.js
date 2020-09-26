import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "next/link";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import SearchBar from "../../components/SearchBar";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import { useRouter } from "next/router";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Sidebar from "../../components/Sidebar";
const useStyles = makeStyles({
  media: {
    height: 200,
    display: "grid",
    alignContent: "center",
    justifyContent: "center",
  },
  root: {
    margin: "0 20px",
    marginBottom: 20,
  },
  content: {
    textAlign: "left",
    fontSize: "1em",
  },
  fixed: {
    width: "100%",
    position: "fixed",
    bottom: 0,
    margin: "auto",
  },
  price: {
    marginTop: "10px",
  },
  input: {
    margin: "auto",
  },
});

const drums = [
  {
    gambar: "/image/drum.png",
    nama: "Drum Tama Superstar Classic CL72RS PGJP",
    harga: "Rp 9.000.000",
  },
  {
    gambar: "/image/drum2.png",
    nama: "Drum Elektrik DM Lite Kit dari Alesis Nitro",
    harga: "Rp 10.678.000",
  },
  {
    gambar: "/image/drum2.png",
    nama: "Drum Elektrik DM Lite Kit dari Alesis Nitro",
    harga: "Rp 6.290.200",
  },
  {
    gambar: "/image/drum2.png",
    nama: "Drum Elektrik DM Lite Kit dari Alesis Nitro",
    harga: "Rp 4.500.234",
  },
];

export default function MediaCard() {
  const classes = useStyles();
  const router = useRouter();
  return (
    <>
      <Sidebar />
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={2}>
          <TextField
            label="stok"
            id="outlined-size-small"
            defaultValue={`""`}
            variant="outlined"
            size="small"
            disabled={true}
            className={classes.stok}
          />
        </Grid>
        <Grid item xs={9}>
          <SearchBar />
        </Grid>
      </Grid>

      <Grid container>
        {drums.map((e, index) => (
          <Grid item xs={6} key={index}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={e.gambar}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {e.nama}
                  </Typography>
                  <TextField
                    label="price"
                    id="outlined-size-small"
                    defaultValue={e.harga}
                    variant="outlined"
                    size="small"
                    className={classes.price}
                  />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      {/* botom navigation */}
      <BottomNavigation className={classes.fixed}>
        <BottomNavigationAction
          onClick={() => router.back()}
          label="Kembali"
          icon={<RestoreIcon />}
          showLabel
        />
        <Link href="/cards/form/tambah.js" as="/cards/form/tambah">
          <a>
            <BottomNavigationAction
              color="primary"
              aria-label="add"
              label="Tambah"
              icon={<AddIcon />}
              showLabel
            />
          </a>
        </Link>
      </BottomNavigation>
    </>
  );
}
