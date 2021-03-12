import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { formatRupiah } from "./utils";
const useStyles = makeStyles({});

export default function TableDetailLaporanBeli({ detailLaporan }) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nama barang</TableCell>
            <TableCell>Satuan</TableCell>
            <TableCell>Persediaan awal</TableCell>
            <TableCell>Jumlah Beli</TableCell>
            <TableCell>Total persediaan</TableCell>
            <TableCell>Harga satuan</TableCell>
            <TableCell>Total harga</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {detailLaporan.data &&
            detailLaporan.data.map((row) => (
              <TableRow key={row.key}>
                <TableCell component="th" scope="row">
                  {row.namaBarang}
                </TableCell>
                <TableCell>{row.satuan}</TableCell>
                <TableCell>{row.stokAwal}</TableCell>
                <TableCell>{row.jumlahBeli}</TableCell>
                <TableCell>{row.totalStok}</TableCell>
                <TableCell>{formatRupiah(row.hargaSatuan)}</TableCell>
                <TableCell>{formatRupiah(row.totalHarga)}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
