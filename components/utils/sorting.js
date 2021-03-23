import {
  fetchItem,
  sortStokHabis,
  sortStokSedikit,
  sortStokBanyak,
  fetchLaporan,
  fetchLaporanBeliSorting,
} from "../../src/redux/actions";
import {
  LAPORAN_PEMBELIAN_SEMINGGU,
  LAPORAN_PEMBELIAN_SEBULAN,
  LAPORAN_PEMBELIAN_SETAHUN,
} from "../../src/redux/actionType";
export const handleChangeSort = (event, dispatch, setState, state) => {
  const name = event.target.name;
  if (event.target.value === "Stok habis") {
    dispatch(sortStokHabis());
  } else if (event.target.value === "Stok sedikit") {
    dispatch(sortStokSedikit());
  } else if (event.target.value === "Stok terbanyak") {
    dispatch(sortStokBanyak());
  } else if (event.target.value === "Seminggu ini") {
    dispatch(fetchLaporanBeliSorting("seminggu", LAPORAN_PEMBELIAN_SEMINGGU));
  } else if (event.target.value === "Sebulan ini") {
    dispatch(fetchLaporanBeliSorting("sebulan", LAPORAN_PEMBELIAN_SEBULAN));
  } else if (event.target.value === "Setahun ini") {
    dispatch(fetchLaporanBeliSorting("setahun", LAPORAN_PEMBELIAN_SETAHUN));
  } else {
    dispatch(fetchItem());
    dispatch(fetchLaporan());
  }
  setState({
    ...state,
    [name]: event.target.value,
  });
};
