import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import { FC } from "react";
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import { ReactElement } from 'react';
import { Provider as ReduxProvider } from "react-redux";
import { MainProvider } from "@/src/hooks/useMain";
import { ToastContainer } from "react-toastify";
import makeStore from "@/src/redux";

const store = makeStore();

const AppComponent: FC<{ Component: any; pageProps: any }> = ({
  Component,
  pageProps,
}) => {
  return <Component {...pageProps} />;
};

function Application({ Component, pageProps }: AppProps): ReactElement {
  return (
    <ReduxProvider store={store}>
      <MainProvider>
        <Layout>
          <AppComponent
            Component={Component}
            pageProps={pageProps}
          />
        </Layout>
        <ToastContainer />
      </MainProvider>
    </ReduxProvider>
  )
}

export default Application
