import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req?.body;

  try {
    await prisma.like.create({
      data: {
        postId: body?.postId,
        userId: body?.userId,
      },
    });
    return res.status(200).send({ message: "Post Liked" });
  } catch (error) {
    return res.status(500).send(error);
  }
}
