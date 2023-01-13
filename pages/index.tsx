import Head from 'next/head'
import { ReactElement, useState, useCallback, useEffect } from 'react'
import Footer from '../components/Footer'
import Toggle from '../components/Toggle'
import { TaskContainer } from "@/components/task-container";
import { Input, Button } from "antd";
import { useMain } from "@/src/hooks/useMain";
import { createTodoList } from "@/src/redux/actions";
import { RecoilRoot } from 'recoil';
import { toast } from "react-toastify";
import { Tabs } from 'antd';
import { storageProvider } from "@/src/providers/storage.provider";
import { networkProvider } from "@/src/providers/network.provider";

export default function Home(): ReactElement {
  const { taskList, taskListShared, dispatch, logout: handleLogout } = useMain();
  const [todoName, setTodoName] = useState("");
  const [ userData, setUserData ] = useState<any>();
  const [ password, setPassword ] = useState("");

  const onSubmit = useCallback((e) => {
    e.preventDefault()
    if (!todoName) return;
    dispatch(createTodoList({
      name: todoName,
    }, (task) => {
      if (!task) return;
      toast("Create new todo list succesfully");
      setTodoName("");
    }))
  }, [todoName]);

  const updateProfile = async () => {
    await networkProvider.requestWithCredentials("/auth", {
      method: "PATCH",
      data: userData,
    })

    toast.success("Update profile successfully!");
    storageProvider.setItem("userData", JSON.stringify(userData));
  }

  const updatePassword = async () => {
    await networkProvider.requestWithCredentials("/auth/password", {
      method: "PUT",
      data: {
        email: userData.email,
        password: password,
        password_confirmation: password,
      },
    })

    toast.success("Update password successfully!");
    setPassword("");
    storageProvider.setItem("userData", JSON.stringify(userData));
  }

  useEffect(() => {
    setUserData(JSON.parse(storageProvider?.getItem("userData") || "{}"));
    console.log(userData);
  }, []);

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

        <p className="text-3xl lg:text-4xl text-white font-bold tracking-widest pt-10 sm:pt-16 lg:pt-24 lg:pt-20 pb-6 lg:pb-10 items-center">
          TODO
          <Toggle />
          <p className='float-right text-[10px] tracking-[2px] mr-[20px] cursor-pointer relative top-[-5px]' onClick={handleLogout}>Logout</p>
        </p>
        <Tabs
          defaultActiveKey="1"
          type="card"
          items={[
            {
              label: `Main`,
              key: "dssa1",
              children: (
                <div>
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
              ),
            },
          ].concat(taskListShared?.length ? [
            {
              label: `Shared`,
              key: "dssa2",
              children: (
                <div>
                  {taskListShared.map((item, index) => (
                    <RecoilRoot key={`task-container-shared-${index}`}>
                      <TaskContainer task={item} shared={true} />
                    </RecoilRoot>
                  ))}
                </div>
              ),
            }
          ] : []).concat([
            {
              label: `Profile`,
              key: "profile",
              children: (
                <div>
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
                  <div className='w-full px-[20px] bg-[#5c7de7] rounded py-[10px] text-white relative mt-[20px]'>
                    <p className="mb-[10px]">Email</p>
                    <Input defaultValue={userData?.email} className="px-[10px] py-[7px]" onChange={(e) => setUserData((prev: any) => ({ ...prev, email: e.target.value }))}></Input>
                    <p className="mb-[10px]  mt-[20px]">Name</p>
                    <Input defaultValue={userData?.name} className="px-[10px] py-[7px]" onChange={(e) => setUserData((prev: any) => ({ ...prev, name: e.target.value }))}></Input>
                    <Button className="mt-[30px]" onClick={(e) => {
                      e.preventDefault();
                      updateProfile();
                    }}>Save</Button>
                    
                    <p className="mb-[10px] mt-[30px]">Password</p>
                    <Input value={password} className="px-[10px] py-[7px]" onChange={(e) => setPassword((prev: any) => e.target.value )} type={"password"}></Input>
                    <Button className="mt-[30px]" onClick={(e) => {
                      e.preventDefault();
                      updatePassword();
                    }}>Update password</Button>
                  </div>
                </div>
              ),
            }
          ])}
        />
      </div>
      <Footer />
    </div>
  )
}
