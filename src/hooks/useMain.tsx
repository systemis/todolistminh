import {
  FC,
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
  useCallback
} from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import * as Actions from "@/src/redux/actions";

const AUTH_ROUTE = [
  "/"
];

export interface MainContextState {
  dispatch(t: any): void;
};

export const MainContext = createContext<MainContextState>(null);

export const MainProvider: FC<{ children: ReactNode }> = ({
  children
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [auth, setAuth] = useState(false);

  /**
   * @dev The function to condition whenever the app is authenticated with the server.
   */
  const handleAuthenticate = useCallback(() => {
    dispatch(Actions.getTodoList((todoList) => {
      console.log(todoList);
      if (todoList) {
        setAuth(true);
      }
    }))
  }, [router.asPath]);

  /**
   * @dev Process authentication whenever the router path changed.
   */
  useEffect(() => handleAuthenticate(), [router.asPath]);

  /**
   * @dev Process firewall route page with authentication.
   */
  useEffect(() => {
    if (!auth && AUTH_ROUTE.filter(item => item === router.asPath).length) {
      router.push("/auth");
    }

    if (auth && !(AUTH_ROUTE.filter(item => item === router.asPath).length)) {
      router.push("/");
    }
  }, [auth, router.asPath]);

  return (
    <MainContext.Provider value={{
      dispatch
    }}>
      {children}
    </MainContext.Provider>
  );
}

export const useMain = () => {
  const context = useContext(MainContext);
  if (context === undefined) {
    throw new Error("Must in wrapper");
  };
  return context;
};
