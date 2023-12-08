import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={cn(poppins.className, "w-[90vw] mx-auto")}>
      <Component {...pageProps} />
    </main>
  );
}
