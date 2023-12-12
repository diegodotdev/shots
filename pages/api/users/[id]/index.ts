import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id }: any = req?.query;

  try {
    const post = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        posts: true,
      },
    });
    return res.status(200).send(post);
  } catch (error) {
    return res.status(500).send(error);
  }
}
