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
import { useSelector, useDispatch } from "react-redux";
import { formatRupiah, totalHarga, next, before } from "./utils";
import IconButton from "@material-ui/core/IconButton";
import { hapusItem } from "../../src/redux/actions";
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
  pagination: {
    padding: 20,
    paddingRight: 0,
    justifyContent: "flex-end",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  totalBarang: {
    marginRight: 25,
    fontFamily: "Arial",
    fontWeight: "normal",
    margin: 0,
    padding: 0,
    fontSize: 25,
  },
}));

export default function tableDaftarBarang({ handleClickOpen, setDetail }) {
  const classes = useStyles();
  const bahan = useSelector((state) => state.daftarItem.daftarItem);
  // state pagination
  const [nextPage, setNextPage] = React.useState(3);
  const [beforePage, setBeforePage] = React.useState(0);
  const currentPage = bahan.slice(beforePage, nextPage);
  // akhir state pagination
  // dispatch
  const dispatch = useDispatch();
  // button edit
  const edit = (data) => {
    setDetail(data);
    handleClickOpen();
  };
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
          {currentPage &&
            currentPage.map((row) => {
              return (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {row.nama}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.createdAt.slice(0, 10)}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.stok}</StyledTableCell>
                  <StyledTableCell align="right">{row.satuan}</StyledTableCell>
                  <StyledTableCell align="right">
                    {formatRupiah(row.hargaPerSatuan)}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {formatRupiah(totalHarga(row.stok, row.hargaPerSatuan))}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Button
                      onClick={() => edit(row)}
                      variant="contained"
                      color="secondary"
                      startIcon={<EditIcon />}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => dispatch(hapusItem(row._id, row.nama))}
                      style={{
                        backgroundColor: "maroon",
                        color: "white",
                        marginLeft: 10,
                      }}
                      variant="contained"
                      startIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
        </TableBody>
      </Table>
      <div
        style={{ display: bahan.length <= 3 ? "none" : "flex" }}
        className={classes.pagination}
      >
        <h1 className={classes.totalBarang}>Total Item : {bahan.length}</h1>
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
          disabled={nextPage >= bahan.length ? true : false}
          onClick={() =>
            next(nextPage, bahan, setBeforePage, setNextPage, beforePage)
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
    </TableContainer>
  );
}
