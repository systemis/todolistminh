import { call, put } from 'redux-saga/effects';
import { SagaPayload } from '@/src/redux/entities';
import { LoginDto, RegisterDto } from "@/src/dto";
import { storageProvider } from "@/src/providers/storage.provider";
import { userService } from "./user.service";
import { setUser } from "@/src/redux/actions";

/**
 * @param payload
 * @param callback
 * @description
 * Login
 */
export function* login({
  payload,
  callback,
}: SagaPayload<LoginDto, unknown>) {
  try {
    const loginResponse: unknown = yield call(userService.login, payload);
    storageProvider.setItem("hAccessToken", (loginResponse as any)?.headers?.["access-token"]);
    storageProvider.setItem("client", (loginResponse as any)?.headers?.client);
    storageProvider.setItem("uid", (loginResponse as any)?.headers?.uid);
    callback && callback((loginResponse as any)?.data);
  } catch (err) {
    console.error(err);
    callback && callback(null);
  }
}

/**
 * @param payload
 * @param callback
 * @description
 * Register
 */
export function* register({
  payload,
  callback,
}: SagaPayload<RegisterDto, unknown>) {
  try {
    const registerResponse: unknown = yield call(userService.register, payload);
    callback && callback(registerResponse);
  } catch (err) {
    callback && callback(null);
  }
}

/**
 * @param payload
 * @param callback
 * @description
 * Register
 */
export function* getUsers({
  callback,
}: SagaPayload<unknown, unknown>) {
  try {
    const users: unknown = yield call(userService.getUsers);
    yield put(setUser(users))
    callback && callback(users);
  } catch (err) {
    callback && callback(null);
  }
}
