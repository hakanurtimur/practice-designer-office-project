import "@/styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout/Layout";
import AuthContextProvider from "@/context/auth-context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}

//TODO: add protector routes
