import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ThemeProvider from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

export default function App(
  { Component, pageProps }: AppProps,
  { session }: { session: Session }
) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}
