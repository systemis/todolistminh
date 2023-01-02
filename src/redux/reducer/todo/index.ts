import { SET_TASK_TODO_LIST } from "@/src/redux/actions";
import { TodoTaskEntity } from "@/src/entities/todo.entity";
import { Action } from "@/src/redux/entities/interfaces/action";

export default (state: TodoTaskEntity[] = [], action: Action) => {
  if (action.type === SET_TASK_TODO_LIST) {
    return action.payload;
  }
  return state;
};
