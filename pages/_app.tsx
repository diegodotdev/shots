import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import type { SessionProviderProps } from "next-auth/react";
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"] });
import Nav from "@/components/nav";
import SideMenu from "@/components/side-menu";
import { Toaster } from "@/components/ui/toaster";

export default function App(
  { Component, pageProps }: AppProps,
  { session }: SessionProviderProps
) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <SessionProvider session={session}>
        <Nav />
        <main
          className={cn(poppins.className, "w-[90vw] md:w-[80vw] mx-auto flex")}
        >
          <SideMenu />
          <Component {...pageProps} />
        </main>
        <Toaster />
      </SessionProvider>
    </ThemeProvider>
  );
}
