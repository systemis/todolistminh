import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import dynamic from 'next/dynamic';
import { FC } from "react";
import type { AppProps } from 'next/app';
import { ReactElement } from 'react';
import { Provider as ReduxProvider } from "react-redux";
import { MainProvider } from "@/src/hooks/useMain";
import { ToastContainer } from "react-toastify";
import makeStore from "@/src/redux";
import { ConfigProvider } from 'antd';

const Layout: any = dynamic(() => { return import('../components/Layout') }, { ssr: false });

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
        {/* <ConfigProvider theme={{ hashed: false }}>
        </ConfigProvider> */}
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
