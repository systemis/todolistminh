import { combineReducers } from "redux";
import userReducer from "./user";
import { todoReducer, sharedReducer } from "./todo";
import State from "@/src/redux/entities/state";

/**
 * @dev Initialize reducer for app state management.
 */
const reducer = combineReducers<State>({
  users: userReducer,
  taskList: todoReducer,
  taskListShared: sharedReducer,
});

/**
 * @dev Declare default state for app.
 */
export const initState: State = {
  users: [],
  taskList: [],
  taskListShared: [],
};

export default reducer;


