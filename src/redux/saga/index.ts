import { takeLatest } from 'redux-saga/effects';
import { login, register } from "./user/user.saga";
import { getTodoList } from "./todo/todo.saga";
import {
  LOGIN_EMAIL,
  REGISTER_EMAIL,
  GET_TODO_LIST
} from '@/src/redux/actions';

export default function* root() {
  yield takeLatest<any>(LOGIN_EMAIL, login);
  yield takeLatest<any>(REGISTER_EMAIL, register);
  yield takeLatest<any>(GET_TODO_LIST, getTodoList);
}
