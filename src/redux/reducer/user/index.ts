import { SET_USERS } from "@/src/redux/actions";
import { Action } from "@/src/redux/entities/interfaces/action";

export default (state: unknown[] = [], action: Action) => {
  if (action.type === SET_USERS) {
    return action.payload;
  }
  return state;
};
