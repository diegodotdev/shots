import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req?.body;

  try {
    await prisma.like.delete({
      where: {
        id: body?.id[0]?.id,
      },
    });
    return res.status(200).send({ message: "Like Removed" });
  } catch (error) {
    return res.status(500).send(error);
  }
}
