import {
  TAMBAH_ITEM,
  HAPUS_ITEM,
  EDIT_ITEM,
  BELI_ITEM,
  RESET_ITEM,
  LAPORAN_PEMBELIAN,
  PENGELOLAAN_STOK_BELI,
  PENGELOLAAN_STOK_JUAL,
  JUAL_ITEM,
  LAPORAN_PENJUALAN,
  FETCH_ITEM,
} from "./actionType";
const initialState = {
  daftarItem: [
    // {
    //   nama: "Kopi hitam pahit",
    //   stok: 0,
    //   satuan: "Kg",
    //   tanggalBeli: "20 Nov 2021",
    //   hargaPerSatuan: 10000,
    //   totalHarga: 10000,
    //   key: "1",
    // },
    // {
    //   nama: "Gula pasir",
    //   stok: 0,
    //   satuan: "Kg",
    //   tanggalBeli: "25 Nov 2021",
    //   hargaPerSatuan: 15000,
    //   totalHarga: 15000,
    //   key: "2",
    // },
    // {
    //   nama: "Cap kopi",
    //   stok: 0,
    //   satuan: "Pcs",
    //   tanggalBeli: "12 Nov 2021",
    //   hargaPerSatuan: 5000,
    //   totalHarga: 5000,
    //   key: "3",
    // },
    // {
    //   nama: "Sedotan",
    //   stok: 0,
    //   satuan: "Pack",
    //   tanggalBeli: "23 Nov 2021",
    //   hargaPerSatuan: 7000,
    //   totalHarga: 7000,
    //   key: "4",
    // },
    // {
    //   nama: "Sedotan",
    //   stok: 0,
    //   satuan: "Pack",
    //   tanggalBeli: "23 Nov 2021",
    //   hargaPerSatuan: 7000,
    //   totalHarga: 7000,
    //   key: "5",
    // },
    // {
    //   nama: "Capuchino kopi",
    //   stok: 0,
    //   satuan: "Kg",
    //   tanggalBeli: "10 Nov 2021",
    //   hargaPerSatuan: 4000,
    //   totalHarga: 4000,
    //   key: "6",
    // },
  ],
  daftarBeliItem: [],
  daftarJualItem: [],
  laporanPembelian: [],
  laporanPenjualan: [],
};
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEM:
      return {
        ...state,
        daftarItem: action.data,
      };
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
    case BELI_ITEM:
      const checkObject = state.daftarBeliItem.some(
        (item) => item.key === action.data.key
      );
      return {
        ...state,
        daftarBeliItem: checkObject
          ? [
              ...state.daftarBeliItem.map((item) =>
                item.key === action.data.key
                  ? {
                      ...item,
                      stokAwal: action.data.stokAwal,
                      jumlahBeli: action.data.jumlahBeli,
                      totalStok: action.data.totalStok,
                      hargaSatuan: action.data.hargaSatuan,
                      totalHarga: action.data.totalHarga,
                      tanggal: action.data.tanggal,
                    }
                  : item
              ),
            ]
          : [action.data, ...state.daftarBeliItem],
      };
      break;
    case JUAL_ITEM:
      const checkObjectJual = state.daftarJualItem.some(
        (item) => item.key === action.data.key
      );
      return {
        ...state,
        daftarJualItem: checkObjectJual
          ? [
              ...state.daftarJualItem.map((item) =>
                item.key === action.data.key
                  ? {
                      ...item,
                      stokAwal: action.data.stokAwal,
                      jumlahJual: action.data.jumlahJual,
                      totalStok: action.data.totalStok,
                      hargaSatuan: action.data.hargaSatuan,
                      totalHarga: action.data.totalHarga,
                      tanggal: action.data.tanggal,
                    }
                  : item
              ),
            ]
          : [action.data, ...state.daftarJualItem],
      };
      break;
    case RESET_ITEM:
      return {
        ...state,
        daftarBeliItem: [],
        daftarJualItem: [],
      };
      break;
    case LAPORAN_PEMBELIAN:
      return {
        ...state,
        laporanPembelian: [...state.laporanPembelian, action.laporan],
      };
      break;
    case LAPORAN_PENJUALAN:
      return {
        ...state,
        laporanPenjualan: [...state.laporanPenjualan, action.laporan],
      };
      break;
    case PENGELOLAAN_STOK_BELI:
      return {
        ...state,
        daftarItem: [
          ...state.daftarItem.map((item) =>
            item.key === action.key
              ? {
                  ...item,
                  stok: action.totalStok,
                }
              : item
          ),
        ],
      };
      break;
    case PENGELOLAAN_STOK_JUAL:
      return {
        ...state,
        daftarItem: [
          ...state.daftarItem.map((item) =>
            item.key === action.key
              ? {
                  ...item,
                  stok: action.totalStok,
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
