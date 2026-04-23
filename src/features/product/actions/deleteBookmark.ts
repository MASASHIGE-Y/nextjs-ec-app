"use server"

import { getCurrentUser } from "@/lib/getCurrentUser"
import { prisma } from "@/lib/prisma"

export async function deleteBookmark(productId: number) {
  const {userId} = await getCurrentUser()
  
  const bookmark = await prisma.bookmark.findUnique({
    where: {
      userId_productId: {
         userId,
         productId,
      },
    },
  })

  if(!bookmark){
    throw new Error("ブックマークが見つかりません")
  }

  await prisma.bookmark.delete({
    where: {
      id: bookmark.id,
    },
  })
}