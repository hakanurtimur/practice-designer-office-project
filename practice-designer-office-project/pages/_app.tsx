import "@/styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout/Layout";
import AuthContextProvider from "@/context/auth-context";
import { RequestProvider } from "@/context/request-context";
import NotificationContextProvider from "@/context/notification-context";
import StorageContextProvider from "@/context/storage-context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NotificationContextProvider>
      <AuthContextProvider>
        <RequestProvider>
          <StorageContextProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </StorageContextProvider>
        </RequestProvider>
      </AuthContextProvider>
    </NotificationContextProvider>
  );
}

//TODO: add protector routes
// TODO: look for firebase rules
// todo: set dark mode
