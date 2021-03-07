import { TAMBAH_ITEM, HAPUS_ITEM, EDIT_ITEM } from "./actionType";
const initialState = {
  daftarItem: [
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
  ],
};
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TAMBAH_ITEM:
      return {
        ...state,
        daftarItem: [action.data, ...state.daftarItem],
      };
      break;
    case HAPUS_ITEM:
      return {
        ...state,
        daftarItem: [
          ...state.daftarItem.filter((item) =>
            item.key === action.key ? item.key !== action.key : item
          ),
        ],
      };
      break;
    case EDIT_ITEM:
      return {
        ...state,
        daftarItem: [
          ...state.daftarItem.map((item) =>
            item.key === action.key
              ? {
                  ...item,
                  nama: action.nama,
                  satuan: action.satuan,
                  hargaPerSatuan: action.hargaPerSatuan,
                }
              : item
          ),
        ],
      };
      break;
    default:
      return state;
      break;
  }
};
