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
import { formatRupiah } from "./utils";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import { resetItem, laporanPembelian } from "../../src/redux/actions";
import { useRouter } from "next/router";

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

const rows = [];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  containerButton: {
    justifyContent: "flex-end",
    padding: 10,
  },
});

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
          {beliItem &&
            beliItem.map((row) => (
              <StyledTableRow key={row.key}>
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
