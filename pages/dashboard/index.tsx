import { GetServerSidePropsContext } from "next";
import { getSession, signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import type { Session } from "next-auth";

type Props = {
  session: Session;
};

export default function Dashboard({ session }: Props) {
  if (!session)
    return (
      <div className="w-full h-screen grid place-items-center">
        <Button onClick={() => signIn()}>Sign In</Button>
      </div>
    );
  return (
    <div className="w-full h-screen grid place-items-center">
      <p>Welcome back, {session?.user?.name}</p>
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
