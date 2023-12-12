import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req?.body;

  try {
    await prisma.post.delete({
      where: {
        id: body?.id,
      },
    });
    return res.status(200).send({ message: "Post Deleted" });
  } catch (error) {
    return res.status(500).send(error);
  }
}
