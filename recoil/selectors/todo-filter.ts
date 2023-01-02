import { selector } from 'recoil'
import todoState from '../atoms/todo'
import todoFilterState from '../atoms/todo-filter'

import FilterEnum from '../../types/filter.type'
import { TodoEntity } from "@/src/entities/todo.entity";

const filteredTodoState = selector<TodoEntity[]>({
  key: `filteredTodoState`,
  get: ({ get }) => {
    const filter = get(todoFilterState)
    const list = get(todoState)

    switch(filter) {
    case FilterEnum.ShowActive:
      return list.filter((item) => !item?.done )
    case FilterEnum.ShowCompleted:
      return list.filter((item) => item.done)
    default:
      return list
    }
  }
})

export default filteredTodoState
