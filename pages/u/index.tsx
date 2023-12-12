import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import type { User } from "@/types";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

type Props = {
  users: User[];
};

export default function Users({ users }: Props) {
  const [search, setSearch] = useState("");

  const filter = users?.filter((user) =>
    user?.name?.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <Head>
        <title>Shots</title>
      </Head>
      <ScrollArea className="w-3/4 h-[88vh]">
        <div className="p-4 mx-auto w-4/5 flex flex-col gap-4">
          <Input
            type="text"
            className="w-full"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          {filter?.slice(0, 20)?.map((user) => (
            <Link
              href={`/u/${user?.id}`}
              key={user?.id}
              className="flex items-center gap-2"
            >
              <Image
                className="w-[30px] h-[30px] rounded-full object-cover"
                src={user?.image}
                alt={user?.name}
                width={200}
                height={200}
              />
              <p>{user?.name}</p>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </>
  );
}

export const getServerSideProps = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
    {
      cache: "no-store",
    }
  );
  const users = await response.json();

  return {
    props: {
      users,
    },
  };
};
