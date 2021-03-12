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
import { formatRupiah, before, next } from "./utils";
import DetailLaporanDialog from "./detailLaporanDialog";
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
    cursor: "pointer",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const rows = [];

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
  const laporan = useSelector((state) => state.daftarItem.laporanPembelian);
  // handleDialogDetail
  const [open, setOpen] = React.useState(false);
  const [detailLaporan, setDetailLaporan] = React.useState();
  const handleClickOpen = (data, total) => {
    setOpen(true);
    setDetailLaporan({ data: data, totalHargaBeli: total });
  };
  const handleClose = () => {
    setOpen(false);
  };

  // pagination
  const [nextPage, setNextPage] = React.useState(3);
  const [beforePage, setBeforePage] = React.useState(0);
  const currentPage = laporan.slice(beforePage, nextPage);
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
          {currentPage &&
            currentPage.map((item) => {
              return (
                <StyledTableRow
                  onClick={() =>
                    handleClickOpen(item.item, item.totalHargaBeli)
                  }
                  hover
                  key={item.key}
                >
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
      <div
        style={{
          display: laporan.length <= 3 ? "none" : "flex",
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
          disabled={nextPage >= laporan.length ? true : false}
          onClick={() =>
            next(nextPage, laporan, setBeforePage, setNextPage, beforePage)
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
      <DetailLaporanDialog
        open={open}
        handleClose={handleClose}
        detailLaporan={detailLaporan}
      />
    </TableContainer>
  );
}
