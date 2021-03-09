import {
  TAMBAH_ITEM,
  HAPUS_ITEM,
  EDIT_ITEM,
  BELI_ITEM,
  RESET_ITEM,
  LAPORAN_PEMBELIAN,
} from "./actionType";
import swal from "sweetalert";
// crud item
export const tambahItem = (data) => {
  return (dispatch) => {
    dispatch({ type: TAMBAH_ITEM, data: data });
  };
};
export const hapusItem = (key, nama) => {
  return (dispatch) => {
    swal({
      title: `Anda akan menghapus ${nama} ?`,
      text: "Jika ya, item akan di hapus dan tidak bisa di akses kembali.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch({ type: HAPUS_ITEM, key: key });
        swal("Berhasil di hapus !", {
          icon: "success",
        });
      }
    });
  };
};
export const editItem = (data) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_ITEM,
      key: data.key,
      nama: data.nama,
      satuan: data.satuan,
      hargaPerSatuan: data.hargaPerSatuan,
    });
  };
};

// pembelian
export const beliItem = (data, detail, handleClose) => {
  return (dispatch) => {
    const obj = {
      namaBarang: detail.nama,
      satuan: detail.satuan,
      stokAwal: detail.stokAwal,
      jumlahBeli: data.jumlahBeli,
      totalStok: detail.totalStok,
      hargaSatuan: detail.hargaSatuan,
      totalHarga: data.jumlahBeli * detail.hargaSatuan,
      tanggal: new Date().toDateString(),
      key: Math.random().toString(),
    };
    dispatch({ type: BELI_ITEM, data: obj });
    handleClose();
  };
};
export const resetItem = () => {
  return (dispatch) => {
    dispatch({ type: RESET_ITEM });
  };
};

// laporan
export const laporanPembelian = (laporan) => {
  const laporanTotalHargaBeli =
    laporan.length <= 1
      ? laporan.map((item) => item.totalHarga)
      : laporan.reduce((acc, curr) => acc.totalHarga + curr.totalHarga, 0);
  const obj = {
    tanggal: new Date().toDateString(),
    waktu: new Date().toTimeString(),
    jumlahItemBeli: laporan.length,
    totalHargaBeli: laporanTotalHargaBeli,
    item: laporan,
    key: Math.random().toString(),
  };
  return (dispatch) => {
    dispatch({ type: LAPORAN_PEMBELIAN, laporan: obj });
  };
};
