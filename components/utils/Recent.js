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
import moment from "moment";
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
const useStyles = makeStyles({
  header: {
    fontFamily: "Arial",
  },
});

export default function CustomizedTables() {
  const classes = useStyles();
  const penjualan = useSelector((state) => state.daftarItem.laporanPenjualan);
  const barangBaru = useSelector((state) => state.daftarItem.daftarItem);
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
                      <StyledTableCell>
                        {parseInt(item.key) === 1 ? "Nama item" : "Tanggal"}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {parseInt(item.key) === 1
                          ? "Jumlah jual"
                          : parseInt(item.key) === 2
                          ? "Jumlah item jual"
                          : "Nama barang"}
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {parseInt(item.key) === 1
                      ? jualTerbanyak(penjualan)
                          .slice(0, 5)
                          .map((row) => {
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
                          })
                      : parseInt(item.key) === 2
                      ? penjualan.slice(0, 5).map((row) => {
                          return (
                            <StyledTableRow key={row.key}>
                              <StyledTableCell component="th" scope="row">
                                {moment(row.createdAt).format("DD, MMMM YYYY")}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {row.jumlahItemJual}
                              </StyledTableCell>
                            </StyledTableRow>
                          );
                        })
                      : barangBaru.slice(0, 5).map((row) => {
                          return (
                            <StyledTableRow key={row.key}>
                              <StyledTableCell component="th" scope="row">
                                {moment(row.createdAt).format("DD, MMMM YYYY")}
                              </StyledTableCell>
                              <StyledTableCell align="right">
                                {row.nama}
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
