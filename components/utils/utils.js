import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import PermDataSettingIcon from "@material-ui/icons/PermDataSetting";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import HourglassFullIcon from "@material-ui/icons/HourglassFull";
import * as Yup from "yup";
import {tambahItem} from '../../src/redux/actions'
import moment from 'moment';// item untuk dashboard\
import 'moment/locale/id'
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

// item untuk bahan barang
export const bahan = [
  {
    nama: "Kopi hitam pahit",
    stok: 0,
    satuan: "Kg",
    tanggalBeli: "20 Nov 2021",
    hargaPerSatuan: 10000,
    totalHarga: 10000,
    key: "1",
  },
  {
    nama: "Gula pasir",
    stok: 0,
    satuan: "Kg",
    tanggalBeli: "25 Nov 2021",
    hargaPerSatuan: 15000,
    totalHarga: 15000,
    key: "2",
  },
  {
    nama: "Cap kopi",
    stok: 0,
    satuan: "pcs",
    tanggalBeli: "12 Nov 2021",
    hargaPerSatuan: 5000,
    totalHarga: 5000,
    key: "3",
  },
  {
    nama: "Sedotan",
    stok: 0,
    satuan: "pack",
    tanggalBeli: "23 Nov 2021",
    hargaPerSatuan: 7000,
    totalHarga: 7000,
    key: "4",
  },
  {
    nama: "Sedotan",
    stok: 0,
    satuan: "pack",
    tanggalBeli: "23 Nov 2021",
    hargaPerSatuan: 7000,
    totalHarga: 7000,
    key: "5",
  },
  {
    nama: "Capuchino kopi",
    stok: 0,
    satuan: "kg",
    tanggalBeli: "10 Nov 2021",
    hargaPerSatuan: 4000,
    totalHarga: 4000,
    key: "6",
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
    nama: "Jumlah beli",
    key: "1",
  },
];

// select untuk form tambah barang

// validation schema tambah barang
export const tambahSchema = Yup.object().shape({
  nama: Yup.string()
    .min(5, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  satuan: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  hargaPerSatuan: Yup.number().required("Required"),
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
moment.locale('id');
export const submitItem = (data, dispatch, handleClose) => {
  
  const key = Math.random()
  const date = new Date()
  const obj = {
      nama: data.nama,
      stok: 0,
      satuan: data.satuan,
      tanggalBeli: moment(date).format('LL'), // "June 1, 2017"
      hargaPerSatuan: parseInt(data.hargaPerSatuan),
      totalHarga: 4000,
      key: key,
  }
  console.log(obj);
  dispatch(tambahItem(obj))
  handleClose()
};