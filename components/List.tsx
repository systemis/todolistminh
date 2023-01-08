import React, { ReactNode, useCallback, useEffect, FC, useState } from 'react'
import { useMain } from "@/src/hooks/useMain";
import { useRecoilValue, useRecoilState } from 'recoil'
import {
  SortableContainer as SortableContainerWrap,
  SortableElement,
  SortEvent,
  SortEventWithTag
} from 'react-sortable-hoc'
import { AnimatePresence, motion } from 'framer-motion'
import { TodoEntity, TodoTaskEntity } from "@/src/entities/todo.entity";
import Input from './Input'
import ListFilter from './ListFilter'
import ItemsLeft from './ItemsLeft'
import filteredTodoState from '../recoil/selectors/todo-filter'
import todoState from '../recoil/atoms/todo'
import useTodos from './hooks/useTodos'
import useIsMounted from './hooks/useIsMounted'

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.03,
      duration: 0.5
    },
  }
}

const item = {
  hidden: { x: '-100%', y: 0, opacity: 0 },
  visible: {
    x: 0,
    y: 0,
    opacity: 1
  }
}

interface SortableItemProps {
  todo: TodoEntity
  idx: number;
  id: string;
  taskId: string;
  deleteTodo: (idx: number) => void
  shareTodo: (idx: number) => void
  updateTodoCompleted: (idx: number, completed: boolean) => void
  updateTodoValue: (idx: number, value: string) => void
}

const SortableItem = SortableElement<SortableItemProps>(({
  todo,
  idx,
  id,
  taskId,
  updateTodoCompleted,
  updateTodoValue,
  deleteTodo,
  shareTodo
}: SortableItemProps) => {
  return (
    <motion.div
      key={`div-${todo.id}`}
      variants={item}
      animate={{ opacity: 1, x: 0, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, x: '-100%', transition: { duration: 0.2 } }}
    >
      <Input
        key={`input-${todo.id}`}
        todo={todo}
        onInputChange={(value: string) => updateTodoValue(idx, value)}
        onCheckboxChange={(completed: boolean) => updateTodoCompleted(idx, completed)}
        onDelete={() => deleteTodo(parseInt(id))}
        onShare={() => shareTodo(parseInt(id))}
        taskId={taskId}
        readonly
      />
    </motion.div>
  )
})

interface SortableContainerProps {
  children: ReactNode
}

const SortableContainer = SortableContainerWrap<SortableContainerProps>(({ children }: SortableContainerProps) => {
  return <div className="cursor-pointer">{children}</div>
})

const List: FC<{ taskId: string, shared?: boolean }> = ({ taskId, shared }) => {
  const { taskList: userTaskList, taskListShared } = useMain();
  const todos = useRecoilValue(filteredTodoState)
  const [_, setTaskList] = useRecoilState(todoState);

  const {
    clearCompletedTodos,
    deleteTodo,
    updateTodoCompleted,
    updateTodoValue,
    reorderTodo
  } = useTodos(taskId)
  const isMounted = useIsMounted()

  const onSortEnd = useCallback(({ oldIndex, newIndex }: { oldIndex: number, newIndex: number }) => {
    reorderTodo(oldIndex, newIndex)
  }, [reorderTodo])

  const shouldCancelStart = useCallback(({ target }: SortEvent | SortEventWithTag): boolean => {
    return 'tagName' in target && target.tagName?.toLowerCase() === 'img'
  }, [])

  useEffect(() => {
    setTaskList(((shared ? taskListShared : userTaskList).find(item => item.id.toString() === taskId))?.todos || []);
  }, [userTaskList, taskId, taskListShared]);

  if (!isMounted) return null

  return (
    <div className="mt-[0] sm:mt-[0]">
      <div className="rounded">
        <div className="rounded">
          {/** @ts-ignore */}
          <SortableContainer onSortEnd={onSortEnd} shouldCancelStart={shouldCancelStart} distance={10}>
            <motion.div variants={container} initial="hidden" animate="visible">
              <AnimatePresence>
                {todos.map((todo, idx) => {
                  {/** @ts-ignore */ }
                  return <SortableItem
                    key={`item-${todo?.id}`}
                    index={idx}
                    todo={todo}
                    idx={idx}
                    id={todo.id}
                    updateTodoValue={(idx, value) => updateTodoValue(todo.id, idx, value)}
                    updateTodoCompleted={(idx, value) => updateTodoCompleted(todo.id, idx, value)}
                    deleteTodo={deleteTodo}
                    taskId={taskId}
                  />
                })}
              </AnimatePresence>
            </motion.div>
          </SortableContainer>
          <motion.div
            className="text-sm px-6 py-4 flex items-center w-full bg-white dark:bg-dark_veryDarkDesaturatedBlue"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="flex flex-1">
              <ItemsLeft taskId={taskId} />
            </div>
            <div className="hidden sm:flex">
              <ListFilter />
            </div>
            <div className="flex justify-end flex-1 text-light_darkGreyBlue hover:text-light_veryDarkGreyBlue dark:hover:text-white transition ease-linear cursor-pointer">
              <div onClick={clearCompletedTodos}>Clear Completed</div>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="rounded sm:hidden mt-4 bg-white dark:bg-dark_veryDarkDesaturatedBlue px-6 py-3.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <ListFilter />
        </motion.div>
      </div>
    </div>
  )
}

export default List
