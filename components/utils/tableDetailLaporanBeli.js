import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { formatRupiah, before, next } from "./utils";
import { useRouter } from "next/router";
const useStyles = makeStyles((theme) => ({
  pagination: {
    padding: 20,
    paddingRight: 0,
    justifyContent: "flex-end",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function TableDetailLaporanBeli({ detailLaporan }) {
  const classes = useStyles();

  // pagination
  const [nextPage, setNextPage] = React.useState(3);
  const [beforePage, setBeforePage] = React.useState(0);
  const currentPage =
    detailLaporan === undefined
      ? null
      : detailLaporan.data.slice(beforePage, nextPage);
  const router = useRouter();
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nama barang</TableCell>
            <TableCell>Satuan</TableCell>
            <TableCell>Persediaan awal</TableCell>
            <TableCell>
              Jumlah{" "}
              {router.pathname === "/laporan/laporanPembelian"
                ? "beli"
                : "jual"}
            </TableCell>
            <TableCell>Total persediaan</TableCell>
            <TableCell>Harga satuan</TableCell>
            <TableCell>Total harga</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPage &&
            currentPage.map((row) => (
              <TableRow key={row.key}>
                <TableCell component="th" scope="row">
                  {row.namaBarang}
                </TableCell>
                <TableCell>{row.satuan}</TableCell>
                <TableCell>{row.stokAwal}</TableCell>
                <TableCell>
                  {router.pathname === "laporan/laporanPembelian"
                    ? row.jumlahBeli
                    : row.jumlahJual}
                </TableCell>
                <TableCell>{row.totalStok}</TableCell>
                <TableCell>{formatRupiah(row.hargaSatuan)}</TableCell>
                <TableCell>{formatRupiah(row.totalHarga)}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div
        style={{
          display: detailLaporan.data.length <= 3 ? "none" : "flex",
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
          disabled={nextPage >= detailLaporan.data.length ? true : false}
          onClick={() =>
            next(
              nextPage,
              detailLaporan.data,
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
    </TableContainer>
  );
}
