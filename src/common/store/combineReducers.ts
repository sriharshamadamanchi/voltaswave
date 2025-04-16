import { combineReducers } from "redux";
import { loaderReducer } from "../loaderRedux/reducer";
import { homeReducer } from "../../Home/redux/reducer";

export const reducers: any = combineReducers({
  loader: loaderReducer,
  home: homeReducer
});
