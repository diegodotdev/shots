import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  try {
    const id = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
      select: {
        id: true,
      },
    });
    res.status(200).send(id);
  } catch (error) {
    res.status(500).send(error);
  }
}
