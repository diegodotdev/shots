import { Button } from "@/components/ui/button";
import { GetServerSidePropsContext } from "next";
import { signIn, signOut, getSession } from "next-auth/react";
import type { Session } from "next-auth";
import Head from "next/head";

export default function App({ session }: { session: Session }) {
  return (
    <div className="w-full h-screen grid place-items-center">
      <Head>
        <title>Shots</title>
      </Head>
      {session ? (
        <div className="flex flex-col justify-center items-center gap-2">
          <p className="text-2xl">Welcome {session?.user?.name}</p>
          <Button onClick={() => signOut()}>Sign Out</Button>
        </div>
      ) : (
        <Button onClick={() => signIn()}>Sign In</Button>
      )}
    </div>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
