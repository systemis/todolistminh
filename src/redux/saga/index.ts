import { takeLatest } from 'redux-saga/effects';
import { login, register, getUsers } from "./user/user.saga";
import {
  getTodoList,
  createTask,
  createTaskShared,
  createTodo,
  deleteTodo,
  deleteTaskTodo,
  editTodo,
  editTask,
  shareTask,
  getSharedTask,
  unShareTask
} from "./todo/todo.saga";
import {
  LOGIN_EMAIL,
  REGISTER_EMAIL,
  GET_TASK_TODO_LIST,
  CREATE_TASK_TODO_LIST,
  CREATE_TASK_TODO_LIST_SHARED,
  CREATE_TODO,
  DELETE_TODO,
  DELETE_TASK_TODO_LIST,
  EDIT_TODO,
  UPDATE_TASK_TODO_LIST,
  GET_USERS,
  SHARE_TASK,
  GET_SHARED_TASK,
  UNSHARE_TASK
} from '@/src/redux/actions';

export default function* root() {
  yield takeLatest<any>(LOGIN_EMAIL, login);
  yield takeLatest<any>(REGISTER_EMAIL, register);
  yield takeLatest<any>(GET_TASK_TODO_LIST, getTodoList);
  yield takeLatest<any>(CREATE_TASK_TODO_LIST, createTask);
  yield takeLatest<any>(CREATE_TASK_TODO_LIST_SHARED, createTaskShared);
  yield takeLatest<any>(CREATE_TODO, createTodo);
  yield takeLatest<any>(DELETE_TODO, deleteTodo);
  yield takeLatest<any>(DELETE_TASK_TODO_LIST, deleteTaskTodo);
  yield takeLatest<any>(EDIT_TODO, editTodo);
  yield takeLatest<any>(UPDATE_TASK_TODO_LIST, editTask);
  yield takeLatest<any>(GET_USERS, getUsers);
  yield takeLatest<any>(SHARE_TASK, shareTask);
  yield takeLatest<any>(UNSHARE_TASK, unShareTask);
  yield takeLatest<any>(GET_SHARED_TASK, getSharedTask);
}
