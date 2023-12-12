import { ScrollArea } from "@/components/ui/scroll-area";
import type { User } from "@/types";
import Masonry from "react-masonry-css";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import prisma from "@/db/prisma";
import { getSession } from "next-auth/react";
import { removePost } from "@/lib/requests";

type Props = {
  user: User;
};

const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

export default function Profile({ user }: Props) {
  return (
    <>
      <Head>
        <title>Shots</title>
      </Head>
      <ScrollArea className="w-3/4 h-[88vh]">
        <div className="w-full p-4">
          <Masonry
            className="flex gap-4 w-full"
            breakpointCols={breakpointColumnsObj}
          >
            {user?.likes?.map((post: any) => (
              <Link
                href={`/p/${post?.post?.id}`}
                className="w-full"
                key={post?.post?.id}
              >
                <Image
                  src={post?.post?.image}
                  alt="post image"
                  width={500}
                  height={500}
                  className="w-full object-cover rounded-lg"
                />
              </Link>
            ))}
          </Masonry>
        </div>
      </ScrollArea>
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);
  const id = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
    select: {
      id: true,
    },
  });
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id?.id}`
  );
  const user = await response.json();

  return {
    props: {
      user,
    },
  };
};
