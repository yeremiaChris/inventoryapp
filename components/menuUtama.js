import { Grid, makeStyles } from "@material-ui/core";
import Recent from "./utils/Recent";
import { itemsBox } from "./utils/utils";
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
    paddingBottom: 20,
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
