import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;

  try {
    await prisma.comment.create({
      data: {
        userId: body?.userId,
        postId: body?.postId,
        content: body?.content,
      },
    });
    return res.status(200).send({ message: "Comment Posted" });
  } catch (error) {
    return res.status(500).send(error);
  }
}
