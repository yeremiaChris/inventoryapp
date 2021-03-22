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
  FETCH_LAPORAN_PEMBELIAN,
  FETCH_LAPORAN_PENJUALAN,
} from "./actionType";
import swal from "sweetalert";
import axios from "axios";
// crud item
export const tambahItem = (data) => {
  return (dispatch) => {
    console.log(data);
    axios
      .post("http://localhost:4000/api/items/create", data)
      .then((item) => {
        console.log(item);
        dispatch({ type: TAMBAH_ITEM, data: item.data });
        swal("Berhasil menambah item!", "", "success");
      })
      .catch((err) => {
        console.log(err);
      });
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
        axios
          .delete(`http://localhost:4000/api/items/delete/${key}`)
          .then((item) => {
            dispatch({ type: HAPUS_ITEM, key: key });
            swal("Berhasil di hapus !", {
              icon: "success",
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };
};
export const editItem = (data) => {
  return (dispatch) => {
    const obj = {
      nama: data.nama,
      satuan: data.satuan,
      hargaPerSatuan: data.hargaPerSatuan,
    };
    axios
      .put(`http://localhost:4000/api/items/update/${data.key}`, obj)
      .then((item) => {
        dispatch({
          type: EDIT_ITEM,
          key: data.key,
          nama: data.nama,
          satuan: data.satuan,
          hargaPerSatuan: data.hargaPerSatuan,
        });
        swal("Berhasil update item!", "", "success");
      })
      .catch((err) => {
        console.log(err);
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
      key: data.namaBarang,
    };
    dispatch({ type: BELI_ITEM, data: obj });
    handleClose();
    console.log(data);
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
export const laporanPembelian = (laporan, router) => {
  let laporanTotalHargaBeli = 0;
  laporan.length <= 1
    ? laporan.map((item) => {
        laporanTotalHargaBeli = item.totalHarga;
      })
    : (laporanTotalHargaBeli = laporan.reduce((acc, curr) => {
        return acc + curr.totalHarga;
      }, 0));
  const obj = {
    jumlahItemBeli: laporan.length,
    totalHargaBeli: laporanTotalHargaBeli,
    item: laporan,
  };
  return (dispatch) => {
    // laporan.forEach((element) => {
    //   dispatch({
    //     type: PENGELOLAAN_STOK_BELI,
    //     key: element.key,
    //     totalStok: element.totalStok,
    //   });
    // });
    axios
      .post(`http://localhost:4000/api/pembelian/create`, obj)
      .then((item) => {
        dispatch({ type: LAPORAN_PEMBELIAN, laporan: item.data });
        dispatch({ type: RESET_ITEM });
        swal("Berhasil beli item !", {
          icon: "success",
        });
        router.push("/laporan/laporanPembelian");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const fetchLaporan = () => {
  return (dispatch) => {
    axios
      .get(`http://localhost:4000/api/pembelian`)
      .then((item) => {
        dispatch({ type: FETCH_LAPORAN_PEMBELIAN, laporan: item.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const fetchLaporanJual = () => {
  return (dispatch) => {
    axios
      .get(`http://localhost:4000/api/penjualan`)
      .then((item) => {
        dispatch({ type: FETCH_LAPORAN_PENJUALAN, laporan: item.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const laporanPenjualan = (laporan, router) => {
  let laporanTotalHargaJual = 0;
  laporan.length <= 1
    ? laporan.map((item) => {
        laporanTotalHargaJual = item.totalHarga;
      })
    : (laporanTotalHargaJual = laporan.reduce((acc, curr) => {
        return acc + curr.totalHarga;
      }, 0));
  const obj = {
    jumlahItemJual: laporan.length,
    totalHargaJual: laporanTotalHargaJual,
    item: laporan,
  };

  return (dispatch) => {
    // laporan.forEach((element) => {
    //   dispatch({
    //     type: PENGELOLAAN_STOK_JUAL,
    //     key: element.key,
    //     totalStok: element.totalStok,
    //   });
    // });

    axios
      .post(`http://localhost:4000/api/penjualan/create`, obj)
      .then((item) => {
        console.log(item);
        dispatch({ type: LAPORAN_PENJUALAN, laporan: item.data });
        dispatch({ type: RESET_ITEM });
        swal("Berhasil Jual item !", {
          icon: "success",
        });
        router.push("/laporan/laporanPenjualan");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// fetch data dari mongo
export const fetchItem = () => {
  return (dispatch) => {
    axios
      .get("http://localhost:4000/api/items")
      .then((data) => {
        dispatch({ type: FETCH_ITEM, data: data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
