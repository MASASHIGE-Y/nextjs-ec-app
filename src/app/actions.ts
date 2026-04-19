"use server"

import prisma from "@/lib/prisma"
import { signUpSchema } from "@/lib/validations/user"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"

export type SignUpState = {
  errors?: {
    name?: string[]
    email?: string[]
    password?: string[]
  }
  message?: string
  success?: boolean
}

export async function signUp(
  prevState: SignUpState,
  formData: FormData
): Promise<SignUpState> {
  const rawData = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  }

  const result = signUpSchema.safeParse(rawData)

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      message: "Validation failed",
      success: false,
    }
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: result.data.email,
    },
  })

  if (existingUser) {
    return {
      errors: {
        email: ["This email is already in use"],
      },
      message: "Sign up failed",
      success: false,
    }
  }

  const hashedPassword = await bcrypt.hash(result.data.password, 10)

  await prisma.user.create({
    data: {
      name: result.data.name,
      email: result.data.email,
      password: hashedPassword,
    },
  })

  redirect("/dashboard")
}

export type LoginState = {

  errors?: {
    email?: string[]
    password?: string[]
  }

  message?: string
  success?: boolean
}

export async function login(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "")
  const password = String(formData.get("password") ?? "")

  // ① ユーザー検索
  const user = await prisma.user.findUnique({
    where: { email },
  })
  if (!user) {
    return {
      errors: {
        email: ["User not found"],
      },
      message: "Login failed",
      success: false,
    }
  }

  const isValid = await bcrypt.compare(password, user.password)

  if (!isValid) {
    return {
      errors: {
        password: ["Incorrect password"],
      },
      message: "Login failed",
      success: false,
    }
  }

  const cookieStore = await cookies()

  cookieStore.set("userId", String(user.id), {
    httpOnly: true,
    sameSite: "lax",
    path:"/",
  })

  // ③ 成功 → 遷移
  redirect("/dashboard")
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete("userId")
  redirect("/login")
}