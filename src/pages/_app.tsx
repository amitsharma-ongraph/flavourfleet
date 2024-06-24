import {
  createElement,
  type ReactElement,
  type ReactNode,
  type FC,
  type PropsWithChildren,
  useState,
  useEffect,
} from "react";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@/providers/ChakraProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import { StoreProvider } from "@/providers/StoreProvider";
import { NotificationProvider } from "@/providers/NotificationProvider";
import { ModalProvider } from "@/providers/modalProvider";
import { RestroStoreProvider } from "@/providers/restroStoreProvider";
import { AdminStoreProvider } from "@/providers/adminStoreProvider";
import { Router } from "next/router";
import AnimatedLogo from "@/components/AnimatedLogo";

type NextPageWithLayout = NextPage & {
  title?: string;
  description?: string;
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const Providers: FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setLoading(true);
    };

    const handleRouteChangeComplete = () => {
      setLoading(false);
    };

    Router.events.on("routeChangeStart", handleRouteChangeStart);
    Router.events.on("routeChangeComplete", handleRouteChangeComplete);
    Router.events.on("routeChangeError", handleRouteChangeComplete);

    return () => {
      Router.events.off("routeChangeStart", handleRouteChangeStart);
      Router.events.off("routeChangeComplete", handleRouteChangeComplete);
      Router.events.off("routeChangeError", handleRouteChangeComplete);
    };
  }, []);
  return (
    <ChakraProvider>
      {loading && <AnimatedLogo />}
      <NotificationProvider>
        <AuthProvider>
          <StoreProvider>
            <RestroStoreProvider>
              <AdminStoreProvider>
                <ModalProvider>{children} </ModalProvider>
              </AdminStoreProvider>
            </RestroStoreProvider>
          </StoreProvider>
        </AuthProvider>
      </NotificationProvider>
    </ChakraProvider>
  );
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Providers>
      {getLayout(createElement(Component as any, pageProps))}
    </Providers>
  );
}
