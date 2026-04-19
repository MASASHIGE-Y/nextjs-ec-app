import prisma from "@/lib/prisma"
import { signUpSchema } from "@/lib/validations/user"

export async function POST(req: Request) {
  const body = await req.json()

  const result = signUpSchema.safeParse(body)

  if (!result.success) {
    return Response.json(
      {
        message: "Validation failed",
        errors: result.error.flatten().fieldErrors,
      },
      { status: 400 }
    )
  }

  const user = await prisma.user.create({
    data: {
      name: result.data.name,
      email: result.data.email,
      password: result.data.password,
    },
  })

  console.log("保存されたユーザー:", user)

  return Response.json({
    message: "User saved successfully",
    user,
  })
}