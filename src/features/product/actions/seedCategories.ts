"use server"

import { prisma } from "@/lib/prisma"

const categories = [
  "食品",
  "家具",
  "書籍",
  "衣類",
  "電子機器",
  "スポーツ用品",
  "おもちゃ",
  "美容・健康",
  "ホーム・キッチン",
  "ペット用品",
]

export async function seedCategories() {
  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    })
  }
}