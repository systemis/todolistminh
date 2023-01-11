import { call, put } from 'redux-saga/effects';
import { SagaPayload } from '@/src/redux/entities';
import { todoService } from "./todo.service";
import { TodoTaskEntity, TodoEntity } from "@/src/entities/todo.entity";
import {
  CreateTaskDto,
  CreateTodoDto,
  DeleteTodoDto,
  DeleteTaskTodoDto,
  EditTodoDto,
  EditTaskDto,
  ShareTaskDto
} from "@/src/dto";
import { setTodoListShared, setTodoList, getTodoList as getTodoListAction } from "@/src/redux/actions";

/**
 * @param payload
 * @param callback
 * @description
 * Get todo list
 */
export function* getTodoList({
  callback,
}: SagaPayload<unknown, unknown>) {
  try {
    const todoList: TodoTaskEntity[] = yield call(todoService.getTodoList);
    const sharedList: TodoTaskEntity[] = yield call(todoService.getTodoListShared);
    yield put(setTodoList(todoList));
    yield put(setTodoListShared(sharedList));
    callback && callback(todoList);
  } catch (err) {
    console.log("error ", err);
    callback && callback(null);
  }
}

/**
 * @param payload
 * @param callback
 * @dev
 * Create new task
 */
export function* createTask({
  payload,
  callback,
}: SagaPayload<CreateTaskDto, unknown>) {
  try {
    const getTodoListResponse: TodoTaskEntity[] = yield call(todoService.newTask, payload);
    yield put(getTodoListAction());
    callback && callback(getTodoListResponse);
  } catch (err) {
    console.log("error ", err);
    callback && callback(null);
  } 
}

/**
 * @param payload
 * @param callback
 * @dev
 * Create new task
 */
export function* createTaskShared({
  payload,
  callback,
}: SagaPayload<CreateTaskDto, unknown>) {
  try {
    const getTodoListResponse: TodoTaskEntity[] = yield call(todoService.newTask, payload);
    yield put(getTodoListAction());
    callback && callback(getTodoListResponse);
  } catch (err) {
    console.log("error ", err);
    callback && callback(null);
  } 
}

/**
 * @param payload
 * @param callback
 * @dev
 * Create new task
 */
export function* editTask({
  payload,
  callback,
}: SagaPayload<EditTaskDto, unknown>) {
  try {
    const getTodoListResponse: TodoTaskEntity[] = yield call(todoService.editTask, payload);
    // yield put(getTodoListAction());
    callback && callback(getTodoListResponse);
  } catch (err) {
    console.log("error ", err);
    callback && callback(null);
  } 
}

/**
 * @param payload
 * @param callback
 * @dev
 * Create new task
 */
export function* shareTask({
  payload,
  callback,
}: SagaPayload<ShareTaskDto, unknown>) {
  try {
    const getTodoListResponse: TodoTaskEntity[] = yield call(todoService.shareTask, {
      ...payload,
      is_write: true,
    });
    callback && callback(getTodoListResponse);
  } catch (err) {
    console.log("error ", err);
    callback && callback(null);
  } 
}

/**
 * @param payload
 * @param callback
 * @dev
 * Create new task
 */
export function* getSharedTask({
  payload,
  callback,
}: SagaPayload<{ taskId: string }, any>) {
  try {
    // const getTodoListResponse = yield call(todoService.getSharedTask, payload?.taskId);
    // callback && callback(getTodoListResponse);
  } catch (err) {
    callback && callback(null);
  } 
}


/**
 * @param payload
 * @param callback
 * @dev
 * Create new task
 */
export function* deleteTaskTodo({
  payload,
  callback,
}: SagaPayload<DeleteTaskTodoDto, unknown>) {
  try {
    const getTodoListResponse: unknown = yield call(todoService.deleteTask, payload);
    yield put(getTodoListAction());
    callback && callback(getTodoListResponse);
  } catch (err) {
    callback && callback(null);
  } 
}

/**
 * @param payload
 * @param callback
 * @dev
 * Create new task
 */
export function* createTodo({
  payload,
  callback,
}: SagaPayload<CreateTodoDto, unknown>) {
  try {
    const getTodoListResponse: TodoEntity = yield call(todoService.newTodo, payload);
    yield put(getTodoListAction());
    callback && callback(getTodoListResponse);
  } catch (err) {
    console.log("error ", err);
    callback && callback(null);
  } 
}

/**
 * @param payload
 * @param callback
 * @dev
 * Create new task
 */
export function* editTodo({
  payload,
  callback,
}: SagaPayload<EditTodoDto, unknown>) {
  try {
    const getTodoListResponse: TodoEntity = yield call(todoService.editTodo, payload);
    yield put(getTodoListAction());
    callback && callback(getTodoListResponse);
  } catch (err) {
    console.log("error ", err);
    callback && callback(null);
  } 
}


/**
 * @param payload
 * @param callback
 * @dev
 * Create new task
 */
export function* deleteTodo({
  payload,
  callback,
}: SagaPayload<DeleteTodoDto, unknown>) {
  try {
    const deleteTodoResponse: unknown = yield call(todoService.deleteTodo, payload);
    yield put(getTodoListAction());
    callback && callback(deleteTodoResponse);
  } catch (err) {
    console.log("error ", err);
    callback && callback(null);
  } 
}