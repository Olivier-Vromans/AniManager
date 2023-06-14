import { z } from "zod";
import bcrypt from "bcryptjs";
import prisma from "../../../prisma/prismaClient.js";

const signupUserSchema = z.object({
  username: z.string().regex(/^[a-z0-9_-]{3,15}$/g, "username is not valid"),
  password: z.string().min(5, "password is too short"),
});

export default async function signup(req, res) {
  const { username, password } = signupUserSchema.parse(req.body);
  const user = await prisma.user.findUnique({
    where: { username: username },
  });
  if (user) {
    return res.status(400).json({ user: null, message: "Username already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prism.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  return res.status(200).json({ user: newUser, message: "User created successfully" });
}
