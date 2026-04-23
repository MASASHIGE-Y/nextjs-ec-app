"use server"

import { getCurrentUser } from "@/lib/getCurrentUser"
import { prisma } from "@/lib/prisma"

export async function deleteProduct(id: number) {
  const {userId} = await getCurrentUser()
  
  // 自分の商品のみ削除できるようにチェック
  const product = await prisma.product.findFirst({
    where: {id, userId},
  })

  if(!product){
    throw new Error("削除対象が見つかりません")
  }

  // Bookmarkが残っていると削除ができないため、先に削除
  await prisma.bookmark.deleteMany({
    where:{
      productId: id,
    },
  })

  await prisma.product.delete({
    where:{id},
  })

  return true
}