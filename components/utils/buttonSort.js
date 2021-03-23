import React from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { urutkan, urutkanLaporan } from "./utils";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { handleChangeSort, filterData } from "./sorting";
import { fetchItem } from "../../src/redux/actions";
const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: 10,
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
    border: "1px solid #e2e2e2",
    "&:hover": {
      border: "1px solid black",
    },
    alignItems: "center",
    display: "flex",
    marginBottom: 10,
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "18ch",
      "&:focus": {
        width: "25ch",
      },
    },
  },
}));

export default function NativeSelects({ api, data }) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    Urutkan: "",
    name: "hai",
  });
  const dispatch = useDispatch();

  const router = useRouter();
  const dispatchFilter = (data) => {
    dispatch({ type: "search", data: data });
  };
  return (
    <div className={classes.container}>
      <div>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="outlined-age-native-simple">Urutkan</InputLabel>
          <Select
            native
            value={state.age}
            onChange={(e) =>
              handleChangeSort(e, dispatch, setState, state, router, api)
            }
            label="Urutkan"
            inputProps={{
              name: "Urutkan",
              id: "outlined-age-native-simple",
            }}
          >
            <option aria-label="None" value="" />
            {router.pathname === "/daftarBarang"
              ? urutkan &&
                urutkan.map((item) => {
                  return (
                    <option key={item.key} value={item.nama}>
                      {item.nama}
                    </option>
                  );
                })
              : urutkanLaporan &&
                urutkanLaporan.map((item) => {
                  return (
                    <option key={item.key} value={item.nama}>
                      {item.nama}
                    </option>
                  );
                })}
          </Select>
        </FormControl>
      </div>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          onChange={(e) => filterData(e.target.value, data, dispatch, router)}
          placeholder="Cari…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
    </div>
  );
}
