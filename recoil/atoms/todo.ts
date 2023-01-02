import { atom } from 'recoil'
import { TodoEntity } from "@/src/entities/todo.entity";

const todoState = atom<TodoEntity[]>({
  key: 'todoState',
  default: []
})

export default todoState
