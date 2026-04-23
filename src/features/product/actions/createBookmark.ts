"use server"

import { getCurrentUser } from "@/lib/getCurrentUser"
import { prisma } from "@/lib/prisma"

export async function createBookmark(productId: number) {
  const {userId} = await getCurrentUser()

  const existingBookmark = await prisma.bookmark.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  })

  if (existingBookmark) {
    throw new Error("すでにブックマークしています")
  }

  const bookmark = await prisma.bookmark.create({
    data: {
      userId,
      productId,
    },
  })

  return bookmark
}