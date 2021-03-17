import {
  TAMBAH_ITEM,
  HAPUS_ITEM,
  EDIT_ITEM,
  BELI_ITEM,
  JUAL_ITEM,
  RESET_ITEM,
  LAPORAN_PEMBELIAN,
  PENGELOLAAN_STOK_BELI,
  PENGELOLAAN_STOK_JUAL,
  LAPORAN_PENJUALAN,
  FETCH_ITEM,
} from "./actionType";
import swal from "sweetalert";
import axios from "axios";
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
      namaBarang: detail.namaBarang,
      satuan: detail.satuan,
      stokAwal: detail.stokAwal,
      jumlahBeli: parseInt(data.jumlahBeli),
      totalStok: detail.totalStok,
      hargaSatuan: detail.hargaSatuan,
      totalHarga: parseInt(data.jumlahBeli) * detail.hargaSatuan,
      tanggal: new Date().toDateString(),
      key: data.namaBarang,
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

// penjualan
export const jualItem = (data, detail, handleClose) => {
  return (dispatch) => {
    const obj = {
      namaBarang: detail.namaBarang,
      satuan: detail.satuan,
      stokAwal: detail.stokAwal,
      totalStok: detail.totalStok,
      jumlahJual: data.jumlahJual,
      hargaSatuan: parseInt(detail.hargaSatuan),
      totalHarga: parseInt(data.jumlahJual) * parseInt(detail.hargaSatuan),
      tanggal: new Date().toDateString(),
      key: data.namaBarang,
    };
    dispatch({ type: JUAL_ITEM, data: obj });
    handleClose();
  };
};

// laporan
export const laporanPembelian = (laporan) => {
  const laporanTotalHargaBeli =
    laporan.length <= 1
      ? laporan.map((item) => item.totalHarga)
      : laporan.reduce((acc, curr) => {
          return acc + curr.totalHarga;
        }, 0);
  const obj = {
    tanggal: new Date().toDateString(),
    waktu: new Date().toTimeString(),
    jumlahItemBeli: laporan.length,
    totalHargaBeli: laporanTotalHargaBeli,
    item: laporan,
    key: Math.random().toString(),
  };
  return (dispatch) => {
    laporan.forEach((element) => {
      dispatch({
        type: PENGELOLAAN_STOK_BELI,
        key: element.key,
        totalStok: element.totalStok,
      });
    });
    dispatch({ type: LAPORAN_PEMBELIAN, laporan: obj });
    dispatch({ type: RESET_ITEM });
    swal("Berhasil beli item !", {
      icon: "success",
    });
  };
};
export const laporanPenjualan = (laporan) => {
  const laporanTotalHargaBeli =
    laporan.length <= 1
      ? laporan.map((item) => item.totalHarga)
      : laporan.reduce((acc, curr) => {
          return acc + curr.totalHarga;
        }, 0);
  const obj = {
    tanggal: new Date().toDateString(),
    waktu: new Date().toTimeString(),
    jumlahItemJual: laporan.length,
    totalHargaJual: laporanTotalHargaBeli,
    item: laporan,
    key: Math.random().toString(),
  };
  return (dispatch) => {
    laporan.forEach((element) => {
      dispatch({
        type: PENGELOLAAN_STOK_JUAL,
        key: element.key,
        totalStok: element.totalStok,
      });
    });
    dispatch({ type: LAPORAN_PENJUALAN, laporan: obj });
    dispatch({ type: RESET_ITEM });
    swal("Berhasil beli item !", {
      icon: "success",
    });
  };
};

// fetch data dari mongo
export const fetchItem = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:4000/api/items")
      .then((data) => {
        console.log(data);
        const obj = {
          nama: data.data.nama,
          stok: data.data.stok,
          satuan: data.data.stok,
          tanggalBeli: "23 Nov 2021",
          hargaPerSatuan: 7000,
          totalHarga: 7000,
          key: "5",
        };

        dispatch({ type: FETCH_ITEM, data: data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
