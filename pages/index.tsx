import prisma from "@/db/prisma";
import Head from "next/head";
import Masonry from "react-masonry-css";
import type { Post } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import Image from "next/image";

const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

type Props = {
  posts: Post[];
};

export default function App({ posts }: Props) {
  return (
    <>
      <Head>
        <title>Shots</title>
      </Head>
      <ScrollArea className="w-3/4 h-[88vh]">
        <Masonry
          className="flex gap-4 py-4 pl-4 w-full"
          breakpointCols={breakpointColumnsObj}
        >
          {posts?.map((post) => (
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
      </ScrollArea>
    </>
  );
}

export const getServerSideProps = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`,
    {
      cache: "no-store",
    }
  );
  const posts = await response.json();

  return {
    props: {
      posts,
    },
  };
};
