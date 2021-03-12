import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useSelector } from "react-redux";
import { formatRupiah } from "./utils";
import DetailLaporanDialog from "./detailLaporanDialog";
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
      cursor: "pointer",
    },
  },
}))(TableRow);

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
  const laporan = useSelector((state) => state.daftarItem.laporanPembelian);
  // handleDialogDetail
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Tanggal</StyledTableCell>
            <StyledTableCell>Waktu</StyledTableCell>
            <StyledTableCell align="right">Jumlah Item Beli</StyledTableCell>
            <StyledTableCell align="right">Total Harga Beli</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {laporan &&
            laporan.map((item) => {
              return (
                <StyledTableRow onClick={handleClickOpen} hover key={item.key}>
                  <StyledTableCell component="th" scope="row">
                    {item.tanggal}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {item.waktu}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {item.jumlahItemBeli}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {formatRupiah(item.totalHargaBeli)}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
        </TableBody>
      </Table>
      <DetailLaporanDialog open={open} handleClose={handleClose} />
    </TableContainer>
  );
}
