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
import { items, jualTerbanyak } from "./utils";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { useSelector } from "react-redux";
import { loadGetInitialProps } from "next/dist/next-server/lib/utils";
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
  let array = [];
  React.useEffect(() => {
    jualTerbanyak(penjualan);
  }, []);

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
                      <StyledTableCell>Nama item</StyledTableCell>
                      <StyledTableCell align="right">
                        Jumlah jual
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {jualTerbanyak(penjualan).map((row) => {
                      return (
                        <StyledTableRow key={row.key}>
                          <StyledTableCell component="th" scope="row">
                            {row.namaBarang}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.jumlahJual}
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          );
        })}
    </Grid>
  );
}
