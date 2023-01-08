import { SET_USERS, GET_USERS } from "@/src/redux/actions";
import { CallBackSaga } from "@/src/redux/entities";

/**
 * @param user
 * @returns
 * @description
 * Update user profile in redux state
 */
export const setUser = (user: unknown) => ({
  type: SET_USERS,
  payload: user,
});

/**
 * @param user
 * @returns
 * @description
 * Update user profile in redux state
 */
export const getUsers = (
  callback?: CallBackSaga<unknown>
) => ({
  type: GET_USERS,
  callback,
});