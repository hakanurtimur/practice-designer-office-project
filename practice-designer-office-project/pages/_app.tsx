import "@/styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import UnsubscribedLayout from "@/components/Layout/UnsubscribedLayout";
import AuthContextProvider from "@/context/auth-context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <UnsubscribedLayout>
        <Component {...pageProps} />
      </UnsubscribedLayout>
    </AuthContextProvider>
  );
}
