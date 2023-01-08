import React, { ReactElement } from 'react'
import { ThemeProvider } from 'next-themes'
import { useTheme } from 'next-themes'
import usePreloadBgImages from './hooks/usePreloadBgImages'
import { ConfigProvider, theme } from 'antd';


const DLayout = ({ children }: { children: ReactElement }): ReactElement => {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const { theme: nextTheme } = useTheme();

  return (
    <ConfigProvider theme={{
      algorithm: nextTheme === "dark" ? darkAlgorithm : defaultAlgorithm,
    }}>
      <div className={`
        transition-all
        ease-linear
        bg-light_veryLightGreyBlue
        dark:bg-dark_veryDarkBlue
        min-h-screen
        bg-mobile-light-background
        dark:bg-mobile-dark-background
        sm:bg-light-background
        sm:dark:bg-dark-background
        bg-no-repeat
        bg-contain
        bg-center-top
        bg-fixed
      `}>
        <main>{children}</main>
      </div>
    </ConfigProvider>
  )
}

const Layout = ({ children }: { children: ReactElement }): ReactElement => {
  usePreloadBgImages()

  return (
    <ThemeProvider attribute="class">
      <DLayout>
        {children}
      </DLayout>
    </ThemeProvider>
  )
}

export default Layout
