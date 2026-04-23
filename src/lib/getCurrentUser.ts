import { prisma } from "./prisma"

export async function getCurrentUser() {
  // 仮：ユーザーIDを固定（ログイン機能と連携してないため）
  const userId = 11

  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!user) {
    throw new Error("User not found")
  }

  return {
    userId: user.id,
    user,
  }
}