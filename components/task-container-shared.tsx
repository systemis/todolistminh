import { FC, useState } from "react";
import { TodoTaskEntity } from "@/src/entities/todo.entity";
import { useMain } from "@/src/hooks/useMain";
import { deleteTask, editTask } from "@/src/redux/actions";
import Input from './Input'
import List from './List'
import useTodos from './hooks/useTodos'
import { toast } from "react-toastify";

export const SharedTaskContainer: FC<{ task: TodoTaskEntity }> = ({ task }) => {
  const { dispatch } = useMain();
  const { addTodo } = useTodos(task?.id?.toString())
  const [taskName, setTaskName] = useState(task?.name);
  const [todo, setTodo] = useState({
    name: "",
    completed: false,
  });

  const handleInputChange = (name: string) => setTodo({
    ...todo,
    name
  })

  const handleCheckboxChange = (completed: boolean) => setTodo({
    ...todo,
    completed,
  })

  const handleSubmit = () => {
    /** @dev Change */
    addTodo({ ...todo })

    /** @dev Reset */
    setTodo({ name: "", completed: false })
  }

  const handleChangeTaskName = (name: string) => {
    setTaskName(name);
    dispatch(editTask({ taskId: task?.id?.toString(), name }, (v) => {
      if (!v) return;
    }))
  };

  const handleDelete = () => {
    dispatch(deleteTask({ taskId: task?.id?.toString() }, (v) => {
      if (!v) return;
      toast("Delete task successfully");
    }))
  }

  return (
    <div className="mt-[20px]">
      <div className="w-full px-[20px] bg-[#5c7de7] rounded py-[10px] text-white relative">
        <input
          className="w-full bg-[transparent] border-none outline-none"
          value={taskName}
          onChange={(e) => {
            e.preventDefault();
            handleChangeTaskName(e.target.value);
          }}
        />
        <a id={`delete-${task.id}`} className="absolute top-[-8px] right-0" onClick={(e) => {
          e.preventDefault();
          handleDelete();
        }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18" height="18"
            className="cursor-pointer
            sm:w-14.5
            sm:h-14.5
            sm:p-5
            w-12
            h-12
            p-4.5
            dark:hover:filter-white
            hover:animate-spin-fast
            visible
            group-hover:visible">
            <path
              fill="#ffffff"
              fillRule="evenodd"
              d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" />
          </svg>
        </a>
      </div>
      <Input
        todo={todo}
        onInputChange={handleInputChange}
        onCheckboxChange={handleCheckboxChange}
        onSubmit={handleSubmit}
        taskId={task?.id?.toString()}
      />
      <List taskId={task?.id?.toString()} />
    </div>
  );
}