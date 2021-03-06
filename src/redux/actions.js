import { TAMBAH_ITEM } from "./actionType";
export const tambahItem = (data) => {
  return (dispatch) => {
    // console.log(dispatch);
    dispatch({ type: TAMBAH_ITEM, data: data });
  };
};
