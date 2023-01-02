import Head from 'next/head'
import { ReactElement, useState, useCallback } from 'react'
import Footer from '../components/Footer'
import Toggle from '../components/Toggle'
import { TaskContainer } from "@/components/task-container";
import { useMain } from "@/src/hooks/useMain";
import { createTodoList } from "@/src/redux/actions";
import { RecoilRoot } from 'recoil';
import { toast } from "react-toastify";

export default function Home(): ReactElement {
  const { taskList, dispatch } = useMain();
  const [todoName, setTodoName] = useState("");

  const onSubmit = useCallback((e) => {
    e.preventDefault()
    if (!todoName) return;
    dispatch(createTodoList({
      name: todoName,
    }, (task) => {
      if (!task) return;
      toast("Create new task succesfully");
      setTodoName("");
    }))
  }, [todoName]);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <Head>
        <title>Todo</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="flex-1 lg:w-2/3 xl:w-2/5 w-full px-7">
        <div>
          <p className="text-3xl lg:text-4xl text-white font-bold tracking-widest pt-10 sm:pt-16 lg:pt-24 lg:pt-20 pb-6 lg:pb-10">
            TODO
            <Toggle />
          </p>
          <div className='relative group'>
            <form onSubmit={onSubmit}>
              <input
                type="text"
                className={`text-sm sm:text-base overflow-ellipsis w-full focus:outline-none py-4 sm:py-4.5 pr-8 pl-14 sm:pl-16 dark:bg-dark_veryDarkDesaturatedBlue cursor-pointer transition ease-linear} 'text-light_veryDarkGreyBlue dark:text-dark_lightGreyBlue',`}
                placeholder="Create a new task"
                value={todoName}
                onChange={(e) => setTodoName(e.target.value)}
                maxLength={125}
                aria-label="Todo"
              />
            </form>
          </div>
          {taskList.map((item, index) => (
            <RecoilRoot key={`task-container-${index}`}>
              <TaskContainer task={item} />
            </RecoilRoot>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
