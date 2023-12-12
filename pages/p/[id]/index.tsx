import { useState } from "react";
import Head from "next/head";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GetServerSidePropsContext } from "next";
import type { Post } from "@/types";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { getSession, useSession } from "next-auth/react";
import type { Session } from "next-auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Heart, Plus } from "lucide-react";
import { fetchUserId } from "@/lib/requests";
import { cn } from "@/lib/utils";
import { createComment, createLike, removeLike } from "@/lib/requests";
import { useToast } from "@/components/ui/use-toast";
import { revalidatePath } from "next/cache";

type Props = {
  post: Post;
  session: Session;
};

export default function Post({ post, session }: Props) {
  const [comment, setComment] = useState("");
  const { toast } = useToast();

  const postIsLiked = !!post?.likes?.filter(
    (like: any) => like?.user?.email === session?.user?.email
  )?.length;

  const onPost = async () => {
    const id = await fetchUserId();
    if (id) {
      await createComment({
        content: comment,
        postId: post?.id,
        userId: id?.id,
      }).then((res) => console.log(res));
      setComment("");
      toast({
        title: "Comment Uploaded",
      });
      revalidatePath(`/p/${post?.id}`);
    } else {
      toast({
        title: "Something went wrong, try again",
        variant: "destructive",
      });
    }
  };

  const onLike = async () => {
    const id = await fetchUserId();
    if (id) {
      await createLike({
        userId: id?.id,
        postId: post?.id,
      }).then((res) => {
        toast({
          title: res?.message,
        });
      });
    } else {
      toast({
        title: "Something went wrong, try again",
        variant: "destructive",
      });
    }
  };

  const onRemove = async () => {
    const userId = await fetchUserId();
    const like: any = post?.likes?.filter(
      (like) => like?.userId === userId?.id
    );
    try {
      await removeLike({ id: like }).then((res) => {
        toast({
          title: "Like Removed",
        });
      });
    } catch (error) {
      toast({
        title: "Something went wrong, try again",
        variant: "destructive",
      });
    }
  };
  return (
    <>
      <Head>
        <title>Shots</title>
      </Head>
      <ScrollArea className="w-3/4 h-[88vh]">
        <div className="w-4/5 mx-auto flex flex-col gap-4 p-4">
          <div className="w-full flex justify-between items-center">
            <Link
              href={`/u/${post?.userId}`}
              className="flex items-center gap-2"
            >
              <Image
                src={post?.user?.image as string}
                alt={post?.user?.name as string}
                width={35}
                height={35}
                className="rounded-full object-cover"
              />
              <p>{post?.user?.name}</p>
            </Link>
            <p className="text-muted-foreground text-sm">
              {moment(post?.created_at).fromNow()}
            </p>
          </div>
          <p>{post?.content}</p>
          <Image
            src={post?.image}
            alt="post image"
            width={500}
            height={500}
            className="h-[350px] object-contain mx-auto"
          />
          {session && (
            <>
              {postIsLiked ? (
                <div className="w-full flex justify-end items-center">
                  <Button
                    variant="ghost"
                    onClick={() => onRemove()}
                    className="bg-red-400"
                  >
                    <Heart />
                  </Button>
                </div>
              ) : (
                <div className="w-full flex justify-end items-center">
                  <Button variant="ghost" onClick={() => onLike()}>
                    <Heart />
                  </Button>
                </div>
              )}
              <div className="w-full gap-4 flex justify-center">
                <Input
                  placeholder="Comment"
                  type="text"
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                />
                <Button disabled={!session} onClick={() => onPost()}>
                  <Plus />
                </Button>
              </div>
            </>
          )}
          {post?.comments?.map((comment, idx) => (
            <div
              className="flex flex-col gap-2 p-4 border border-gray-200 rounded-lg"
              key={idx}
            >
              <div className="w-full flex justify-between items-center">
                <Link href={`/u/${comment?.user?.id}`}>
                  <div className="flex items-center gap-2">
                    <Image
                      className="w-[30px] h-[30px] rounded-full object-cover"
                      src={comment?.user?.image}
                      alt={comment?.user?.name}
                      width={200}
                      height={200}
                    />
                    <p>{comment?.user?.name}</p>
                  </div>
                </Link>
                <p className="text-muted-foreground text-sm">
                  {moment(comment?.created_at).fromNow()}
                </p>
              </div>
              <p>{comment?.content}</p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession(context);
  const { id }: any = context?.params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${id}`
  );
  const post = await response.json();

  return {
    props: {
      post,
      session,
    },
  };
};
