import { combineReducers } from "redux";
import { reducer } from "./reducer";

const rootReducer = combineReducers({
  daftarItem: reducer,
});

export default rootReducer;
