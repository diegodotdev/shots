import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const posts = await prisma.post.findMany();

    return res.status(200).send(posts);
  } catch (error) {
    return res.status(500).send({ message: "Something went wrong, try again" });
  }
}
