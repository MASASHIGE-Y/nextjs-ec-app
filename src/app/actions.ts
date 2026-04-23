"use server"

import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { signJWT, setAuthToken, clearAuthToken } from "@/lib/session"

export type SignUpState = {
  message: string
  success: boolean
}

export async function signup(_: SignUpState, formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { success: false, message: "必須項目が不足しています" }
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return { success: false, message: "既に登録されています" }
  }

  const hashed = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { name, email, password: hashed },
  })

  const cookieStore = await cookies()
  cookieStore.set("userId", String(user.id))

  return { success: true, message: "登録成功" }
}

export async function login(prevState: any, formData: FormData) {
  try {
    const email = String(formData.get("email") ?? "")
    const password = String(formData.get("password") ?? "")

    if (!email || !password) {
      return { success: false, message: "必須項目が不足しています" }
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return { success: false, message: "ユーザーが存在しません" }
    }

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      return { success: false, message: "パスワードが違います" }
    }

    const token = await signJWT({
      userId: user.id,
      email: user.email,
    })

    await setAuthToken(token)

    return {
      success: true,
      message: "ログイン成功",
    }
  } catch (error) {
    return {
      success: false,
      message: "ログイン失敗",
    }
  }
}

export async function logout() {
  await clearAuthToken()
  redirect("/login")
}