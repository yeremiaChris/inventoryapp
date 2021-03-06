import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import PermDataSettingIcon from "@material-ui/icons/PermDataSetting";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import HourglassFullIcon from "@material-ui/icons/HourglassFull";
import * as Yup from "yup";
import { tambahItem, editItem } from "../../src/redux/actions";
import moment from "moment"; // item untuk dashboard\
import "moment/locale/id";

// jual terbanyak function
export const jualTerbanyak = (penjualan) => {
  let dataArray = [];
  penjualan.map((item) => {
    item.item.map((data) => {
      const obj = {
        key: data.key,
        jumlahJual: parseInt(data.jumlahJual),
        namaBarang: data.namaBarang,
      };
      dataArray.push(obj);
    });
  });
  const result = dataArray
    .map((item, i, array) => {
      const defaultValue = {
        key: item.key,
        jumlahJual: 0,
        namaBarang: item.namaBarang,
      };
      const finalValue = array
        .filter((other) => other.key === item.key) //we filter the same items
        .reduce((accum, currentVal) => {
          //we reduce them into a single entry
          accum.jumlahJual += parseInt(currentVal.jumlahJual);
          return accum;
        }, defaultValue);
      return finalValue;
    })
    .filter((item, thisIndex, array) => {
      //now our new array has duplicates, lets remove them
      const index = array.findIndex(
        (otherItem, otherIndex) =>
          otherItem.key === item.key &&
          otherIndex !== thisIndex &&
          otherIndex > thisIndex
      );
      return index === -1;
    });

  return result;
};

export const items = [
  {
    nama: "Produk Jual Terbanyak",
    key: "1",
  },
  {
    nama: "Penjualan Terbaru",
    key: "2",
  },
  {
    nama: "Barang yang baru di tambah",
    key: "3",
  },
];

// nav item untuk sidebar
export const routePath = [
  {
    nama: "Dashboard",
    key: "1",
    path: "/",
  },
  {
    nama: "Daftar Barang",
    key: "2",
    path: "/daftarBarang",
  },
  {
    nama: "Form Pembelian",
    key: "3",
    path: "/beliBarang",
  },
  {
    nama: "Form Penjualan",
    key: "5",
    path: "/jualBarang",
  },
  {
    nama: "Laporan Pembelian",
    key: "4",
    path: "/laporan/laporanPembelian",
  },
  {
    nama: "Laporan Penjualan",
    key: "6",
    path: "/laporan/laporanPenjualan",
  },
];

// ini state dashboard untuk box dashboard
export const itemsBox = [
  {
    nama: "Pengguna",
    color: "#C70039",
    angka: 0,
    key: "1",
    icon: <PermIdentityIcon fontSize="large" style={{ marginLeft: 10 }} />,
  },
  {
    nama: "Stok Sedikit",
    color: "#900C3F",
    angka: 0,
    key: "2",
    icon: <PermDataSettingIcon fontSize="large" style={{ marginLeft: 10 }} />,
  },
  {
    nama: "Stok Habis",
    color: "#FF5733",
    angka: 0,
    key: "3",
    icon: <HourglassEmptyIcon fontSize="large" style={{ marginLeft: 10 }} />,
  },
  {
    nama: "Total Item",
    color: "#f34419",
    angka: 0,
    key: "4",
    icon: <HourglassFullIcon fontSize="large" style={{ marginLeft: 10 }} />,
  },
];

// sort atau urutkan berdasarkan kategori
export const urutkan = [
  {
    nama: "Terbaru",
    key: "1",
  },
  {
    nama: "Stok sedikit",
    key: "2",
  },
  {
    nama: "Stok habis",
    key: "3",
  },
  {
    nama: "Stok terbanyak",
    key: "4",
  },
];
// sort atau urutkan di laporan pembelian
export const urutkanLaporan = [
  {
    nama: "Terbaru",
    key: "1",
  },
  {
    nama: "Seminggu ini",
    key: "2",
  },
  {
    nama: "Sebulan ini",
    key: "3",
  },
  {
    nama: "Setahun ini",
    key: "4",
  },
];

// format rupiah
export const formatRupiah = (bilangan) => {
  var reverse = bilangan.toString().split("").reverse().join(""),
    ribuan = reverse.match(/\d{1,3}/g);
  ribuan = `Rp. ${ribuan.join(".").split("").reverse().join("")}`;
  return ribuan;
};

// form tambah barang
const select = [
  {
    nama: "Kg",
    key: "1",
  },
  {
    nama: "Gram",
    key: "3",
  },
  {
    nama: "Pack",
    key: "2",
  },
  {
    nama: "Pcs",
    key: "4",
  },
];

export const fieldList = [
  {
    nama: "Nama barang",
    key: "1",
    value: "nama",
  },
  {
    nama: "Satuan",
    key: "2",
    select: true,
    selection: select,
  },
  {
    nama: "Harga Per Satuan",
    key: "3",
    value: "hargaPerSatuan",
  },
];
export const fieldListDua = [
  {
    nama: "Pilih barang",
    key: "2",
    select: true,
  },
  {
    nama: "Jumlah beli",
    key: "1",
    value: "jumlahBeli",
  },
];
export const fieldListTiga = [
  {
    nama: "Pilih barang",
    key: "2",
    select: true,
    selection: select,
  },
  {
    nama: "Jumlah jual",
    key: "1",
    value: "jumlahBeli",
  },
];

// select untuk form tambah barang

// validation schema tambah barang
export const tambahSchema = Yup.object().shape({
  nama: Yup.string()
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  satuan: Yup.string().required("Required"),
  hargaPerSatuan: Yup.number().required("Required"),
});
// validation schema beli barang
export const beliSchema = Yup.object().shape({
  namaBarang: Yup.string().required("Required"),
  jumlahBeli: Yup.number()
    .min(1, "Tidak boleh nol")
    .max(50, "Jumlah beli Tidak boleh lebih dari 50")
    .required("Required"),
});
// validation schema beli barang
export const jualSchema = Yup.object().shape({
  namaBarang: Yup.string().required("Required"),
  jumlahJual: Yup.number()
    .min(1, "Tidak boleh nol")
    .max(50, "Jumlah beli Tidak boleh lebih dari 50")
    .required("Required"),
});

// handlechange tambah barang di field nya
export const handleChangeTambahBarang = (e, item, setFieldValue) => {
  if (item.value !== "nama") {
    if (!Number(e.target.value)) {
      return;
    }
    setFieldValue("hargaPerSatuan", e.target.value);
  } else {
    setFieldValue("nama", e.target.value);
  }
};

// submit tambah barang
// Indonesian locale
moment.locale("id");
export const submitItem = (data, dispatch, handleClose) => {
  const key = Math.random();
  const date = new Date();
  const obj = {
    nama: data.nama,
    stok: 0,
    satuan: data.satuan,
    hargaPerSatuan: parseInt(data.hargaPerSatuan),
  };
  if (data) {
    dispatch(tambahItem(obj));
  }
  handleClose();
};
// edit item

export const editButton = (dispatch, data, handleClose) => {
  console.log(data);
  const obj = {
    hargaPerSatuan: data.hargaPerSatuan,
    nama: data.nama,
    satuan: data.satuan,
    key: data.key,
  };
  if (data) {
    dispatch(editItem(data));
  }
  handleClose();
};

// perhitungan total harga dif daftar barang
export const totalHarga = (stok, harga) => {
  const total = stok * harga;
  return total;
};

// pagination
export const next = (
  nextPage,
  bahan,
  setBeforePage,
  setNextPage,
  beforePage
) => {
  if (nextPage >= bahan.length) {
    return;
  } else {
    setBeforePage(beforePage + 3);
    setNextPage(nextPage + 3);
  }
};
export const before = (beforePage, setBeforePage, setNextPage, nextPage) => {
  if (beforePage <= 0) {
    return;
  } else {
    setBeforePage(beforePage - 3);
    setNextPage(nextPage - 3);
  }
};
