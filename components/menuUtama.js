import { makeStyles } from "@material-ui/core";
import Recent from "./utils/Recent";
import { itemsBox } from "./utils/utils";
import { useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  header: {
    fontSize: 30,
    margin: 0,
    marginBottom: 20,
    fontFamily: "Arial",
  },
  container: {
    marginLeft: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    paddingBottom: 20,
    paddingLeft: 20,
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
}));

export default function MediaCard() {
  const classes = useStyles();
  const penjualan = useSelector((state) => state.daftarItem.laporanPenjualan);
  const barangBaru = useSelector((state) => state.daftarItem.daftarItem);
  const stok = (tanda) => {
    return barangBaru.filter((item) =>
      tanda === "habis" ? item.stok === 0 : item.stok <= 5
    );
  };
  const stokHabis = barangBaru.filter((item) => item.stok === 0);
  return (
    <div className={classes.container}>
      <h1 className={classes.header}>Dashboard</h1>
      <div className={classes.wrapperDashboard}>
        {itemsBox &&
          itemsBox.map((item) => {
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
                    {item.nama === "Stok Habis"
                      ? stok("habis").length
                      : item.nama === "Total Item"
                      ? barangBaru.length
                      : item.nama === "Stok Sedikit"
                      ? stok("sedikit").length
                      : 0}
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
