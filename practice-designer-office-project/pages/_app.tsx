import "@/styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout/Layout";
import AuthContextProvider from "@/context/auth-context";
import { RequestProvider } from "@/context/request-context";
import NotificationContextProvider from "@/context/notification-context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NotificationContextProvider>
      <AuthContextProvider>
        <RequestProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RequestProvider>
      </AuthContextProvider>
    </NotificationContextProvider>
  );
}

//TODO: add protector routes
