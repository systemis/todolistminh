import { call } from 'redux-saga/effects';
import { SagaPayload } from '@/src/redux/entities';
import { LoginDto, RegisterDto } from "@/src/dto";
import { userService } from "./user.service";

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
    callback && callback(loginResponse);
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
    console.error(err);
    callback && callback(null);
  }
}
