import "@/styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import UnsubscribedLayout from "@/components/Layout/UnsubscribedLayout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UnsubscribedLayout>
      <Component {...pageProps} />
    </UnsubscribedLayout>
  );
}
