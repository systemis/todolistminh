import { CallBackSaga } from "@/src/redux/entities";
import { GET_TODO_LIST } from "@/src/redux/actions";

/**
 * @param callback
 * @returns
 * @description
 * Get todo list by user
 */
export const getTodoList = (
  callback: CallBackSaga<unknown>
) => ({
  type: GET_TODO_LIST,
  callback,
});
