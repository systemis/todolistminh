import { FC, useEffect, useState, useCallback } from "react";
import { TodoTaskEntity, SharedTaskUser } from "@/src/entities/todo.entity";
import { useMain } from "@/src/hooks/useMain";
import { deleteTask, editTask, getUsers, shareTask, unShareTask } from "@/src/redux/actions";
import Input from '../components/Input'
import List from '../components/List'
import useTodos from '../components/hooks/useTodos'
import { toast } from "react-toastify";
import { Avatar, List as AntdList, Skeleton, Modal, Select } from 'antd';
import { todoService } from "@/src/redux/saga/todo/todo.service";
import * as Actions from "@/src/redux/actions";

const smapleData = "dsai@gmail.com";

export const TaskContainer: FC<{ task: TodoTaskEntity, shared?: boolean}> = ({ task, shared }) => {
  const { dispatch, users } = useMain();
  const { addTodo } = useTodos(task?.id?.toString())
  const [taskName, setTaskName] = useState(task?.name);
  const [sharedTodo, setSharedTodo] = useState("");
  const [sharedTaskUser, setSharedTaskUser] = useState<SharedTaskUser[]>([]);

  const [todo, setTodo] = useState({
    name: "",
    completed: false,
  });

  const handleInputChange = (name: string) => setTodo({ ...todo, name })
  const handleCheckboxChange = (completed: boolean) => setTodo({
    ...todo,
    completed,
  })

  const reCall = async () => {
    // dispatch(Actions.getTodoList())
    const sharedTask: SharedTaskUser[] = await todoService.getSharedTask(task?.id?.toString());
      setSharedTaskUser(sharedTask);
  }
  
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

    reCall();
  }

  const handleShareTask = (user_id: string, option: string) => {
    if (option === "share") return;

    dispatch(shareTask({
      taskId: sharedTodo,
      user_id,
      is_write: option === "write" ? true : false,
    }));

    setSharedTodo("");
    reCall();
  }

  const handleUnshareTask = (user_id: string) => {
    dispatch(unShareTask({
      taskId: sharedTodo,
      user_id,
    }));

    setSharedTodo("");
    reCall();
  }

  const handleGetSharedTask = useCallback(async () => {
    try {
      // dispatch(getSharedTask({ taskId: task.id.toString() }))
    } catch {}
  }, [task.id])

  useEffect(() => {
    (async () => {
      !shared && reCall();
    })();
  }, [task?.id, shared]);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

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
        {shared !== true && (
          <>
            <a id={`share-${task.id}`} className="absolute top-[-8px] right-[50px]" onClick={(e) => {
              e.preventDefault();
              setSharedTodo(task.id.toString());
            }}>
              <img
                src="https://todoappt.netlify.app/images/icons8-connect.svg"
                className={`
            cursor-pointer
            sm:w-14.5
            sm:h-14.5
            sm:p-5
            w-12
            h-12
            p-4.5
            hover:filter-black
            dark:hover:filter-white
            hover:animate-spin-fast
            visible
            group-hover:visible"
          `}
                alt="Delete Todo"
              />
            </a>
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
          </>
        )}
      </div>
      <Input
        todo={todo}
        onInputChange={handleInputChange}
        onCheckboxChange={handleCheckboxChange}
        onSubmit={handleSubmit}
        taskId={task?.id?.toString()}
      />
      <List shared={shared} taskId={task?.id?.toString()} />
      <Modal
        open={sharedTodo !== ""}
        onCancel={() => setSharedTodo("")}
        onOk={() => setSharedTodo("")}>
        <div>
          <AntdList
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={
              users.filter((item: any) => (
                sharedTaskUser.find(sItem => sItem.user_id === item?.id) !== undefined
              )).concat(
                users.filter((item: any) => (
                  sharedTaskUser.find(sItem => sItem.user_id === item?.id) === undefined
              )))
            }
            renderItem={(item: any) => (
              <AntdList.Item
                actions={[
                  sharedTaskUser.find(sItem => sItem.user_id === item?.id)
                    ? <a key="list-loadmore-edit" onClick={() => handleUnshareTask(item?.id)}>Remove</a>
                    : (
                      <Select
                        defaultValue="Share"
                        onChange={(value) => handleShareTask(item?.id, value)}
                        className="relative right-[-5px]"
                        options={[
                          {
                            value: 'read',
                            label: 'Read',
                          },
                          {
                            value: 'write',
                            label: 'Write',
                          },
                        ]}
                      />
                    )
                ]}
              >
                <Skeleton avatar title={false} loading={item?.loading} active>
                  <AntdList.Item.Meta
                    avatar={<Avatar src="https://source.boringavatars.com/beam" />}
                    title={<a href="https://ant.design">{item?.email}</a>}
                  />
                </Skeleton>
              </AntdList.Item>
            )}
          />
        </div>
      </Modal>
    </div>
  );
}