import {
  fetchItem,
  sortStokHabis,
  sortStokSedikit,
  sortStokBanyak,
  fetchLaporan,
  fetchLaporanBeliSorting,
  fetchLaporanJual,
} from "../../src/redux/actions";
import {
  LAPORAN_PEMBELIAN_SEMINGGU,
  LAPORAN_PEMBELIAN_SEBULAN,
  LAPORAN_PEMBELIAN_SETAHUN,
  LAPORAN_PENJUALAN_SEMINGGU,
  LAPORAN_PENJUALAN_SEBULAN,
  LAPORAN_PENJUALAN_SETAHUN,
} from "../../src/redux/actionType";
import moment from "moment";
export const handleChangeSort = (
  event,
  dispatch,
  setState,
  state,
  router,
  api
) => {
  const name = event.target.name;
  if (event.target.value === "Stok habis") {
    dispatch(sortStokHabis());
  } else if (event.target.value === "Stok sedikit") {
    dispatch(sortStokSedikit());
  } else if (event.target.value === "Stok terbanyak") {
    dispatch(sortStokBanyak());
  } else if (event.target.value === "Seminggu ini") {
    dispatch(
      fetchLaporanBeliSorting(
        api + "seminggu",
        router.pathname === "/laporan/laporanPembelian"
          ? LAPORAN_PEMBELIAN_SEMINGGU
          : LAPORAN_PENJUALAN_SEMINGGU
      )
    );
  } else if (event.target.value === "Sebulan ini") {
    dispatch(
      fetchLaporanBeliSorting(
        api + "sebulan",
        router.pathname === "/laporan/laporanPembelian"
          ? LAPORAN_PEMBELIAN_SEBULAN
          : LAPORAN_PENJUALAN_SEBULAN
      )
    );
  } else if (event.target.value === "Setahun ini") {
    dispatch(
      fetchLaporanBeliSorting(
        api + "setahun",
        router.pathname === "/laporan/laporanPembelian"
          ? LAPORAN_PEMBELIAN_SETAHUN
          : LAPORAN_PENJUALAN_SETAHUN
      )
    );
  } else {
    dispatch(fetchItem());
    dispatch(fetchLaporan());
    dispatch(fetchLaporanJual());
  }
  setState({
    ...state,
    [name]: event.target.value,
  });
};

// searching
export const filterData = (value, dataList, dispatch, router) => {
  const excludeColums = [
    "createdAt",
    "stok",
    "_id",
    "__v",
    "hargaPerSatuan",
    "stok",
  ];
  const lowerCaseValue = value.toLowerCase().trim();
  if (lowerCaseValue === "") {
    if (router.pathname === "/laporan/laporanPembelian") {
      dispatch(fetchLaporan());
    } else if (router.pathname === "/laporan/laporanPenjualan") {
      dispatch(fetchLaporanJual());
    } else {
      dispatch(fetchItem());
    }
  } else {
    const filterData = dataList.filter((item) => {
      return router.pathname === "/daftarBarang"
        ? Object.keys(item).some((key) => {
            return item[key].toString().toLowerCase().includes(lowerCaseValue);
          })
        : moment(item.createdAt)
            .format("MMMM D YYYY")
            .toLowerCase()
            .includes(lowerCaseValue) ||
            moment(item.createdAt)
              .format("h:mm a")
              .toLowerCase()
              .includes(lowerCaseValue) ||
            Object.keys(item).some((key) => {
              return item[key]
                .toString()
                .toLowerCase()
                .includes(lowerCaseValue);
            });
    });
    if (router.pathname === "/laporan/laporanPembelian") {
      dispatch({ type: "searchLaporanPembelian", data: filterData });
    } else if (router.pathname === "/laporan/laporanPenjualan") {
      dispatch({ type: "searchLaporanPenjualan", data: filterData });
    } else {
      dispatch({ type: "search", data: filterData });
    }
  }
};
