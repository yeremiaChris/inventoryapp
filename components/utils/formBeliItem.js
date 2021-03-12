import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useSelector, useDispatch } from "react-redux";
import { formatRupiah, before, next } from "./utils";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import { resetItem, laporanPembelian } from "../../src/redux/actions";
import { useRouter } from "next/router";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
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

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  containerButton: {
    justifyContent: "flex-end",
    padding: 10,
  },
  pagination: {
    padding: 20,
    paddingRight: 0,
    justifyContent: "flex-end",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function formBeliItem() {
  const classes = useStyles();
  const beliItem = useSelector((state) => state.daftarItem.daftarBeliItem);
  const dispatch = useDispatch();
  // total
  const total = () => {
    if (beliItem.length <= 1) {
      return beliItem.map((item) => formatRupiah(item.totalHarga));
    } else if (beliItem.length > 1) {
      const totalAmount = beliItem.reduce((acc, curr) => {
        return acc + curr.totalHarga;
      }, 0);
      return formatRupiah(totalAmount);
    }
  };
  // router
  const router = useRouter();
  // make state un
  const [resetState, setResetState] = React.useState(false);

  // pagination
  const [nextPage, setNextPage] = React.useState(3);
  const [beforePage, setBeforePage] = React.useState(0);
  const currentPage = beliItem.slice(beforePage, nextPage);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nama barang</StyledTableCell>
            <StyledTableCell align="right">Satuan</StyledTableCell>
            <StyledTableCell align="right">Persediaan awal</StyledTableCell>
            <StyledTableCell align="right">Jumlah beli</StyledTableCell>
            <StyledTableCell align="right">Total Persediaan</StyledTableCell>
            <StyledTableCell align="right">Harga satuan</StyledTableCell>
            <StyledTableCell align="right">Total harga</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPage &&
            currentPage.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {row.namaBarang}
                </StyledTableCell>
                <StyledTableCell align="right">{row.satuan}</StyledTableCell>
                <StyledTableCell align="right">{row.stokAwal}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.jumlahBeli}
                </StyledTableCell>
                <StyledTableCell align="right">{row.totalStok}</StyledTableCell>
                <StyledTableCell align="right">
                  {formatRupiah(row.hargaSatuan)}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {formatRupiah(row.totalHarga)}
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
      <div
        style={{
          display: beliItem.length <= 3 ? "none" : "flex",
          fontFamily: "Arial",
        }}
        className={classes.pagination}
      >
        <IconButton
          disabled={beforePage <= 0 ? true : false}
          onClick={() =>
            before(beforePage, setBeforePage, setNextPage, nextPage)
          }
          size="small"
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton
          disabled={nextPage >= beliItem.length ? true : false}
          onClick={() =>
            next(nextPage, beliItem, setBeforePage, setNextPage, beforePage)
          }
          size="small"
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
      <div
        style={{
          display: beliItem.length === 0 ? "none" : "flex",
          fontFamily: "Arial",
        }}
        className={classes.containerButton}
      >
        <h2 style={{ margin: 0 }}>Total</h2>
        <h2 style={{ margin: 0, marginLeft: 10 }}>{total()}</h2>
      </div>
      <div
        style={{ display: beliItem.length === 0 ? "none" : "flex" }}
        className={classes.containerButton}
      >
        <Button
          onClick={() => dispatch(resetItem())}
          style={{
            backgroundColor: "maroon",
            color: "white",
          }}
          variant="contained"
          startIcon={<RotateLeftIcon />}
        >
          Reset
        </Button>
        <Button
          onClick={() => {
            dispatch(laporanPembelian(beliItem));
            router.push("/laporan/laporanPembelian");
          }}
          style={{ marginLeft: 10 }}
          variant="contained"
          color="secondary"
          startIcon={<ShoppingCartIcon />}
        >
          Beli
        </Button>
      </div>
    </TableContainer>
  );
}
