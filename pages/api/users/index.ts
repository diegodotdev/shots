import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send(error);
  }
}
