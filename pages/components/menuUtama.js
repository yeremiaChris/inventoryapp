import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  header: {
    marginTop: 10,
    fontSize: 30,
    margin: 0,
    marginBottom: 20,
  },
  container: {
    marginLeft: 10,
  },
  wrapperDashboard: {
    display: "flex",
    justifyContent: "space-around",
  },
  box: {
    width: 230,
    color: "white",
    height: 110,
    borderRadius: 10,
  },
});

export default function MediaCard() {
  const classes = useStyles();
  const items = [
    {
      nama: "Pengguna",
      color: "#C70039",
      key: "1",
    },
    {
      nama: "Stok Sedikit",
      color: "#900C3F",
      key: "2",
    },
    {
      nama: "Stok Habis",
      color: "#FF5733",
      key: "3",
    },
    {
      nama: "Total Item",
      color: "#f34419",
      key: "4",
    },
  ];
  return (
    <div className={classes.container}>
      <h1 className={classes.header}>Dashboard</h1>
      <div className={classes.wrapperDashboard}>
        {items &&
          items.map((item) => {
            return (
              <div
                style={{ backgroundColor: item.color }}
                className={classes.box}
                key={item.key}
              >
                {item.nama}
              </div>
            );
          })}
      </div>
    </div>
  );
}
