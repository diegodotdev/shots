import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;

  try {
    await prisma.post.create({
      data: {
        content: body?.content,
        image: body?.image,
        userId: body?.userId?.id,
      },
    });
    return res.status(200).send({ message: "Post Uploaded" });
  } catch (error) {
    return res.status(200).send(error);
  }
}
