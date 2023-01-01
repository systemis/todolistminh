import { takeLatest } from 'redux-saga/effects';
import { login, register } from "./user/user.saga";
import {
  LOGIN_EMAIL,
  REGISTER_EMAIL
} from '@/src/redux/actions';

export default function* root() {
  yield takeLatest<any>(LOGIN_EMAIL, login);
  yield takeLatest<any>(REGISTER_EMAIL, register);
}
