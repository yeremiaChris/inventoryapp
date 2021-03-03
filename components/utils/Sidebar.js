import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { routePath } from "./utils";
const useStyles = makeStyles((theme) => ({
  ul: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  logo: {
    textAlign: "center",
    fontFamily: "Arial",
    fontSize: 20,
    marginBottom: 15,
  },
  li: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "white",
    color: "black",
    padding: 5,
    fontSize: 18,
    "&:hover": {
      boxShadow: "1px 5px 2px #9a19f3",
      cursor: "pointer",
    },
    transition: ".2s",
  },
}));

export default function Sidebar() {
  const classes = useStyles();
  const router = useRouter();
  return (
    <ul className={classes.ul}>
      <li className={classes.logo}>INVENTORY</li>
      {routePath &&
        routePath.map((item) => {
          return (
            <Link key={item.key} href={`${item.path}`}>
              <li
                style={{
                  boxShadow:
                    router.pathname === item.path
                      ? "1px 5px 2px #9a19f3"
                      : null,
                }}
                className={classes.li}
              >
                <a>{item.nama}</a>
              </li>
            </Link>
          );
        })}
    </ul>
  );
}
