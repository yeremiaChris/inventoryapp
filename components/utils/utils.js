// item untuk dashboard\
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import PermDataSettingIcon from "@material-ui/icons/PermDataSetting";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import HourglassFullIcon from "@material-ui/icons/HourglassFull";
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
    nama: "Form Pengeluaran",
    key: "3",
  },
  {
    nama: "Tambah Barang",
    key: "4",
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
