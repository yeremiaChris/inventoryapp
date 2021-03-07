import { TAMBAH_ITEM, HAPUS_ITEM, EDIT_ITEM } from "./actionType";
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
