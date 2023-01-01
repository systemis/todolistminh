import { combineReducers } from "redux";
import userReducer from "./user";
import State from "@/src/redux/entities/state";

/**
 * @dev Initialize reducer for app state management.
 */
const reducer = combineReducers<State>({
  user: userReducer,
});

/**
 * @dev Declare default state for app.
 */
export const initState: State = {
  user: null,
};

export default reducer;
