import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { formatRupiah, before, next } from "./utils";
import DetailLaporanDialog from "./detailLaporanDialog";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { fetchLaporan, fetchLaporanJual } from "../../src/redux/actions";
import moment from "moment";
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

export default function tableLaporan() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchLaporan());
    dispatch(fetchLaporanJual());
  }, [dispatch]);

  const classes = useStyles();
  // handleDialogDetail
  const laporanPenjualan = useSelector(
    (state) => state.daftarItem.laporanPenjualan
  );
  const laporanPembelian = useSelector(
    (state) => state.daftarItem.laporanPembelian
  );
  const [open, setOpen] = React.useState(false);
  const [detailLaporan, setDetailLaporan] = React.useState();
  const handleClickOpen = (data, total) => {
    setOpen(true);
    setDetailLaporan({ data: data, totalHargaBeli: total });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const router = useRouter();
  // pagination
  const [nextPage, setNextPage] = React.useState(3);
  const [beforePage, setBeforePage] = React.useState(0);
  const currentPage =
    router.pathname === "/laporan/laporanPembelian"
      ? laporanPembelian.slice(beforePage, nextPage)
      : laporanPenjualan.slice(beforePage, nextPage);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Tanggal</StyledTableCell>
            <StyledTableCell>Waktu</StyledTableCell>
            <StyledTableCell align="right">
              Item Yang di
              {router.pathname === "/laporan/laporanPembelian"
                ? " Beli"
                : " Jual"}
            </StyledTableCell>
            <StyledTableCell align="right">
              Total Harga{" "}
              {router.pathname === "/laporan/laporanPembelian"
                ? "Beli"
                : "Jual"}
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPage &&
            currentPage.map((item) => {
              return (
                <StyledTableRow
                  onClick={() =>
                    router.pathname === "/laporan/laporanPembelian"
                      ? handleClickOpen(item.item, item.totalHargaBeli)
                      : handleClickOpen(item.item, item.totalHargaJual)
                  }
                  hover
                  key={item._id}
                >
                  <StyledTableCell component="th" scope="row">
                    {moment(item.createdAt).format("MMMM Do YYYY")}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {moment(item.createdAt).format("h:mm A")}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {router.pathname === "/laporan/laporanPembelian"
                      ? item.jumlahItemBeli
                      : item.jumlahItemJual}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {router.pathname === "/laporan/laporanPembelian"
                      ? formatRupiah(item.totalHargaBeli)
                      : formatRupiah(item.totalHargaJual)}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
        </TableBody>
      </Table>
      {router.pathname === "/laporan/laporanPembelian" ? (
        <div
          style={{
            display: laporanPembelian.length <= 3 ? "none" : "flex",
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
            disabled={nextPage >= laporanPembelian.length ? true : false}
            onClick={() =>
              next(
                nextPage,
                laporanPembelian,
                setBeforePage,
                setNextPage,
                beforePage
              )
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
      ) : (
        <div
          style={{
            display: laporanPenjualan.length <= 3 ? "none" : "flex",
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
            disabled={nextPage >= laporanPenjualan.length ? true : false}
            onClick={() =>
              next(
                nextPage,
                laporanPenjualan,
                setBeforePage,
                setNextPage,
                beforePage
              )
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
      )}

      <DetailLaporanDialog
        open={open}
        handleClose={handleClose}
        detailLaporan={detailLaporan}
      />
    </TableContainer>
  );
}
