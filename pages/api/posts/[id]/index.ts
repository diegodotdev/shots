import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id }: any = req?.query;

  try {
    const post = await prisma.post.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
        },
        likes: {
          include: {
            user: true,
          },
        },
      },
    });
    return res.status(200).send(post);
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong, try again" });
  }
}
