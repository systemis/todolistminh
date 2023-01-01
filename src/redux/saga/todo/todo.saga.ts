import { call } from 'redux-saga/effects';
import { SagaPayload } from '@/src/redux/entities';
import { todoService } from "./todo.service";

/**
 * @param payload
 * @param callback
 * @description
 * Login
 */
export function* getTodoList({
  callback,
}: SagaPayload<unknown, unknown>) {
  try {
    const getTodoListResponse: unknown = yield call(todoService.getTodoList);
    console.log(getTodoListResponse);
    callback && callback(getTodoListResponse);
  } catch (err) {
    callback && callback(null);
  }
}