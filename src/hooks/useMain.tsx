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
import { useDispatch, useSelector } from "react-redux";
import AppState from "@/src/redux/entities/state";
import * as Actions from "@/src/redux/actions";

const AUTH_ROUTE = [
  "/"
];

export interface MainContextState extends AppState {
  dispatch(t: any): void;
  logout(e: any): Promise<void>;
};

export const MainContext = createContext<MainContextState>(null);

export const MainProvider: FC<{ children: ReactNode }> = ({
  children
}) => {
  const appState = useSelector((appState: AppState) => appState);
  const dispatch = useDispatch();
  const router = useRouter();
  const [auth, setAuth] = useState(false);

  /**
   * @dev The function to condition whenever the app is authenticated with the server.
   */
  const handleAuthenticate = useCallback(() => {
    dispatch(Actions.getTodoList((todoList) => {
      if (todoList) {
        setAuth(true);
      }
    }))
  }, [router.asPath]);

  const handleLogout = useCallback(async (e) => {
    e?.preventDefault();
    window?.localStorage.removeItem('TODOLISTAPP_hAccessToken');
    window?.localStorage.removeItem("TODOLISTAPP_client");
    window?.localStorage.removeItem("TODOLISTAPP_uid");
    setAuth(false);
    router.push('/');
  }, [auth]);


  /**
   * @dev Process authentication whenever the router path changed.
   */
  useEffect(() => handleAuthenticate(), [router.asPath]);

  /**
   * @dev Process firewall route page with authentication.
   */
  useEffect(() => {
    if (!auth && AUTH_ROUTE.filter(item => item === router.asPath).length) {
      router.push(`/auth`);
    }

    if (auth && !(AUTH_ROUTE.filter(item => item === router.asPath).length)) {
      router.push(`/`);
    }
  }, [auth, router.asPath]);

  return (
    <MainContext.Provider value={{
      dispatch,
      logout: handleLogout,
      ...appState
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
