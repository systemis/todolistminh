
import { useRecoilValue, useRecoilState } from 'recoil'
import { useCallback } from 'react'
import arrayMove from 'array-move'
import filteredTodoState from '../../recoil/selectors/todo-filter'
import todoState from '../../recoil/atoms/todo'
import { replaceItemAtIndex, removeItemAtIndex } from '../utils/array'
import { TodoEntity } from "@/src/entities/todo.entity";
import { createTodo, deleteTodo as deleteTodoAction, editTodo } from "@/src/redux/actions";
import { useMain } from "@/src/hooks/useMain";
import { toast } from 'react-toastify'

interface UseTodos {
  addTodo: (todo: TodoEntity) => void
  clearCompletedTodos: () => void
  deleteTodo: (idx: number) => void
  updateTodoCompleted: (id: string, idx: number, completed: boolean) => void
  updateTodoValue: (id: string, idx: number, value: string) => void
  reorderTodo: (oldIdx: number, newIdx: number) => void
}

const useTodos = (taskId: string): UseTodos => {
  const { dispatch } = useMain();
  const todos = useRecoilValue(filteredTodoState);
  const [todoList, setTodos] = useRecoilState(todoState)

  const addTodo = useCallback((todo: TodoEntity) => {
    dispatch(createTodo({
      taskId,
      ...todo
    }));
  }, [setTodos])

  const updateTodoValue = useCallback((id: string, idx: number, value: string): void => {
    const item = todos[idx]
    const newList = replaceItemAtIndex(todos, idx, {
      ...item,
      name: value,
      completed: item?.done,
    })
    
    dispatch(editTodo({
      taskId,
      todoId: id,
      name: value,
    }));
    setTodos(newList)
  }, [setTodos, todos])

  const updateTodoCompleted = useCallback((id: string, idx: number, completed: boolean): void => {
    const item = todos[idx]
    const newList = replaceItemAtIndex(todos, idx, {
      ...item,
      completed
    })
    dispatch(editTodo({
      taskId,
      todoId: id,
      done: completed,
    }));
    setTodos(newList)
  }, [setTodos, todos])

  const deleteTodo = useCallback((idx: number): void => {
    dispatch(deleteTodoAction({
      taskId,
      todoId: idx.toString(),
    }, (v) => {
      if (!v) return;
      toast("Delete todo item successfully!");
    }))
  }, [setTodos, todos])

  const clearCompletedTodos = useCallback((): void => {
    const newList = todoList.filter((todo) => !todo.done)

    setTodos(newList)
  }, [setTodos, todoList])

  const reorderTodo = useCallback((oldIdx: number, newIdx: number): void => {
    const newList = arrayMove(todoList, oldIdx, newIdx)

    setTodos(newList)
  }, [setTodos, todoList])

  return {
    addTodo,
    clearCompletedTodos,
    deleteTodo,
    updateTodoCompleted,
    updateTodoValue,
    reorderTodo
  }
}

export default useTodos
