import { Grid, makeStyles } from "@material-ui/core";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import PermDataSettingIcon from "@material-ui/icons/PermDataSetting";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import HourglassFullIcon from "@material-ui/icons/HourglassFull";
import Recent from "./utils/Recent";
const useStyles = makeStyles({
  header: {
    marginTop: 10,
    fontSize: 30,
    margin: 0,
    marginBottom: 20,
    fontFamily: "Arial",
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
    display: "flex",
    alignItems: "center",
  },
  wrapperNama: {
    marginLeft: 10,
    fontSize: 20,
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});

export default function MediaCard() {
  const classes = useStyles();
  const items = [
    {
      nama: "Pengguna",
      color: "#C70039",
      angka: 0,
      key: "1",
      icon: <PermIdentityIcon fontSize="large" style={{ marginLeft: 10 }} />,
    },
    {
      nama: "Stok Sedikit",
      color: "#900C3F",
      angka: 0,
      key: "2",
      icon: <PermDataSettingIcon fontSize="large" style={{ marginLeft: 10 }} />,
    },
    {
      nama: "Stok Habis",
      color: "#FF5733",
      angka: 0,
      key: "3",
      icon: <HourglassEmptyIcon fontSize="large" style={{ marginLeft: 10 }} />,
    },
    {
      nama: "Total Item",
      color: "#f34419",
      angka: 0,
      key: "4",
      icon: <HourglassFullIcon fontSize="large" style={{ marginLeft: 10 }} />,
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
                <div>
                  <div>{item.icon}</div>
                  <div className={classes.wrapperNama}>
                    <p
                      style={{
                        padding: 0,
                        margin: 0,
                        fontSize: 25,
                      }}
                    >
                      {item.nama}
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <span
                    style={{
                      display: "grid",
                      alignSelf: "center",
                      alignItems: "center",
                      fontSize: 80,
                      fontFamily: "Arial",
                    }}
                  >
                    0
                  </span>
                </div>
              </div>
            );
          })}
      </div>
      <div style={{ marginTop: 20 }}>
        <Recent />
      </div>
    </div>
  );
}
