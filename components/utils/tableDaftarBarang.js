import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { bahan, formatRupiah } from "./utils";

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
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  pagination: {
    padding: 20,
    paddingRight: 0,
    display: "flex",
    justifyContent: "flex-end",
  },
});

export default function CustomizedTables() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nama barang</StyledTableCell>
            <StyledTableCell align="right">Tanggal beli</StyledTableCell>
            <StyledTableCell align="right">Jumlah Stok</StyledTableCell>
            <StyledTableCell align="right">Satuan</StyledTableCell>
            <StyledTableCell align="right">Harga per satuan</StyledTableCell>
            <StyledTableCell align="right">Total harga</StyledTableCell>
            <StyledTableCell align="right">Aksi</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bahan &&
            bahan.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.nama}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.tanggalBeli}
                </StyledTableCell>
                <StyledTableCell align="right">{row.stok}</StyledTableCell>
                <StyledTableCell align="right">{row.satuan}</StyledTableCell>
                <StyledTableCell align="right">
                  {formatRupiah(row.hargaPerSatuan)}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {formatRupiah(row.totalHarga)}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<EditIcon />}
                  >
                    Edit
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "maroon",
                      color: "white",
                      marginLeft: 10,
                    }}
                    variant="contained"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
      <div className={classes.pagination}>
        <ArrowBackIosIcon fontSize="small" />
        <ArrowForwardIosIcon fontSize="small" style={{ marginLeft: 20 }} />
      </div>
    </TableContainer>
  );
}
