import { SET_TASK_TODO_LIST, SET_TASK_TODO_LIST_SHARED } from "@/src/redux/actions";
import { TodoTaskEntity } from "@/src/entities/todo.entity";
import { Action } from "@/src/redux/entities/interfaces/action";

export const todoReducer = (state: TodoTaskEntity[] = [], action: Action) => {
  if (action.type === SET_TASK_TODO_LIST) {
    return action.payload;
  }
  return state;
};
export const sharedReducer = (state: TodoTaskEntity[] = [], action: Action) => {
  if (action.type === SET_TASK_TODO_LIST_SHARED) {
    return action.payload;
  }
  return state;
};
