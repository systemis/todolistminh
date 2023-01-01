import { SET_USER } from "@/src/redux/actions";

/**
 * @param user
 * @returns
 * @description
 * Update user profile in redux state
 */
export const setUser = (user: unknown) => ({
  type: SET_USER,
  payload: user,
});
