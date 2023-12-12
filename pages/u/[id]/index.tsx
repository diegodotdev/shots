import { ScrollArea } from "@/components/ui/scroll-area";
import type { User } from "@/types";
import Masonry from "react-masonry-css";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";

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

export default function User({ user }: Props) {
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
            className="flex gap-4 py-4 pl-4 w-full"
            breakpointCols={breakpointColumnsObj}
          >
            {user?.posts?.map((post) => (
              <Link href={`/p/${post?.id}`} key={post?.id} className="w-full">
                <div className="w-full rounded-lg overflow-hidden relative">
                  <Image
                    src={post?.image}
                    alt="post image"
                    width={500}
                    height={500}
                    className="w-full object-cover"
                  />
                </div>
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
  const { id }: any = context?.params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${id}`
  );
  const user = await response.json();

  return {
    props: {
      user,
    },
  };
};
