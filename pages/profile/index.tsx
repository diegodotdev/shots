import { ScrollArea } from "@/components/ui/scroll-area";
import type { User } from "@/types";
import Masonry from "react-masonry-css";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import prisma from "@/db/prisma";
import { getSession } from "next-auth/react";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { removePost } from "@/lib/requests";
import { revalidatePath } from "next/cache";

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
  const onDelete = async (id: string) => {
    await removePost({ id: id });
    window.location.reload();
  };

  return (
    <>
      <Head>
        <title>Shots</title>
      </Head>
      <ScrollArea className="w-3/4 h-[88vh]">
        <div className="w-full p-4">
          <div className="flex items-center gap-2">
            <Image
              src={user?.image}
              alt={user?.name}
              width={500}
              height={500}
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <p className="text-xl">{user?.name}</p>
          </div>
          <Masonry
            className="flex gap-4 py-4 w-full"
            breakpointCols={breakpointColumnsObj}
          >
            {user?.posts?.map((post) => (
              <Dialog key={post?.id}>
                <DialogTrigger className="w-full">
                  <div className="w-full rounded-lg overflow-hidden relative">
                    <Image
                      src={post?.image}
                      alt="post image"
                      width={500}
                      height={500}
                      className="w-full object-cover"
                    />
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>What do you want to do?</DialogTitle>
                  </DialogHeader>
                  <div className="w-full flex items-center gap-2">
                    <Link href={`/p/${post?.id}`} className="w-1/2">
                      <Button className="w-full text-white">View</Button>
                    </Link>
                    <DialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className="w-full md:w-1/2"
                        onClick={() => onDelete(post?.id)}
                      >
                        Delete
                      </Button>
                    </DialogTrigger>
                  </div>
                </DialogContent>
              </Dialog>
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
