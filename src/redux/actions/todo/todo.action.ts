import { CallBackSaga } from "@/src/redux/entities";
import { TodoTaskEntity } from "@/src/entities/todo.entity";
import {
  CreateTaskDto,
  CreateTodoDto,
  DeleteTodoDto,
  DeleteTaskTodoDto,
  EditTodoDto,
  EditTaskDto,
  ShareTaskDto
} from "@/src/dto";
import {
  GET_TASK_TODO_LIST,
  SET_TASK_TODO_LIST,
  CREATE_TASK_TODO_LIST,
  CREATE_TASK_TODO_LIST_SHARED,
  CREATE_TODO,
  DELETE_TODO,
  DELETE_TASK_TODO_LIST,
  UPDATE_TASK_TODO_LIST,
  EDIT_TODO,
  SHARE_TASK,
  SET_TASK_TODO_LIST_SHARED,
  GET_SHARED_TASK,
  UNSHARE_TASK,
} from "@/src/redux/actions";

/**
 * @param callback
 * @returns
 * @description
 * Get todo list by user
 */
export const getTodoList = (
  callback?: CallBackSaga<unknown>
) => ({
  type: GET_TASK_TODO_LIST,
  callback,
});

/**
 * @param callback
 * @returns
 * @description
 * Get todo list by user
 */
export const createTodoList = (
  payload: CreateTaskDto,
  callback?: CallBackSaga<unknown>
) => ({
  type: CREATE_TASK_TODO_LIST,
  payload,
  callback,
});

/**
 * @param callback
 * @returns
 * @description
 * Get todo list by user
 */
export const createTodoListShared = (
  payload: CreateTaskDto,
  callback?: CallBackSaga<unknown>
) => ({
  type: CREATE_TASK_TODO_LIST_SHARED,
  payload,
  callback,
});

/**
 * @param callback
 * @returns
 * @description
 * Get todo list by user
 */
export const editTask = (
  payload: EditTaskDto,
  callback?: CallBackSaga<unknown>
) => ({
  type: UPDATE_TASK_TODO_LIST,
  payload,
  callback,
});

/**
 * @param callback
 * @returns
 * @description
 * Get todo list by user
 */
export const shareTask = (
  payload: ShareTaskDto,
  callback?: CallBackSaga<unknown>
) => ({
  type: SHARE_TASK,
  payload,
  callback,
});

/**
 * @param callback
 * @returns
 * @description
 * Get todo list by user
 */
export const unShareTask = (
  payload: ShareTaskDto,
  callback?: CallBackSaga<unknown>
) => ({
  type: UNSHARE_TASK,
  payload,
  callback,
});

/**
 * @param callback
 * @returns
 * @description
 * Get todo list by user
 */
export const getSharedTask = (
  payload: { taskId: string },
  callback?: CallBackSaga<unknown>
) => ({
  type: GET_SHARED_TASK,
  payload,
  callback,
});

/**
 * @param callback
 * @returns
 * @description
 * Get todo list by user
 */
export const deleteTask = (
  payload: DeleteTaskTodoDto,
  callback?: CallBackSaga<unknown>
) => ({
  type: DELETE_TASK_TODO_LIST,
  payload,
  callback,
});

/**
 * @param callback
 * @returns
 * @description
 * Get todo list by user
 */
export const createTodo = (
  payload: CreateTodoDto,
  callback?: CallBackSaga<unknown>
) => ({
  type: CREATE_TODO,
  payload,
  callback,
});

/**
 * @param callback
 * @returns
 * @description
 * Get todo list by user
 */
export const editTodo = (
  payload: EditTodoDto,
  callback?: CallBackSaga<unknown>
) => ({
  type: EDIT_TODO,
  payload,
  callback,
});

/**
 * @param callback
 * @returns
 * @description
 * Get todo list by user
 */
export const deleteTodo = (
  payload: DeleteTodoDto,
  callback?: CallBackSaga<unknown>
) => ({
  type: DELETE_TODO,
  payload,
  callback,
});


/**
 * @returns
 * @dev
 * Set todo list
 */
export const setTodoList = (payload: TodoTaskEntity[]) => ({
  type: SET_TASK_TODO_LIST,
  payload,
})

/**
 * @returns
 * @dev
 * Set todo list
 */
export const setTodoListShared = (payload: TodoTaskEntity[]) => ({
  type: SET_TASK_TODO_LIST_SHARED,
  payload,
})