import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Grid } from "@material-ui/core";
import { items } from "./utils";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { useSelector } from "react-redux";
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  header: {
    fontFamily: "Arial",
  },
});

export default function CustomizedTables() {
  const classes = useStyles();
  const penjualan = useSelector((state) => state.daftarItem.laporanPenjualan);
  let dataArray = [];
  penjualan.map((item) => {
    item.item.map((data) => {
      const obj = {
        key: data.key,
        jumlahJual: parseInt(data.jumlahJual),
      };
      dataArray.push(obj);
    });
  });
  const result = dataArray
    .map((item, i, array) => {
      const defaultValue = {
        key: item.key,
        jumlahJual: 0,
      };
      const finalValue = array
        .filter((other) => other.key === item.key) //we filter the same items
        .reduce((accum, currentVal) => {
          //we reduce them into a single entry
          accum.jumlahJual += parseInt(currentVal.jumlahJual);
          return accum;
        }, defaultValue);
      return finalValue;
    })
    .filter((item, thisIndex, array) => {
      //now our new array has duplicates, lets remove them
      const index = array.findIndex(
        (otherItem, otherIndex) =>
          otherItem.key === item.key &&
          otherIndex !== thisIndex &&
          otherIndex > thisIndex
      );
      return index === -1;
    });
  console.log(result);
  return (
    <Grid container spacing={4}>
      {items &&
        items.map((item) => {
          return (
            <Grid key={item.key} item lg={4}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f5f5f5",
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
              >
                <AttachMoneyIcon />
                <h3 className={classes.header}>{item.nama}</h3>
              </div>
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                      <StyledTableCell align="right">Calories</StyledTableCell>
                      <StyledTableCell align="right">Calories</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.calories}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.calories}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          );
        })}
    </Grid>
  );
}
