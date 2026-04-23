"use server"

import { getCurrentUser } from "@/lib/getCurrentUser"
import { prisma } from "@/lib/prisma"
import { productSchema } from "../schemas"

type UpdateProductInput ={
  id: number
  title: string
  description: string
  price: number
  stock: number
}

export async function updateProduct(input: UpdateProductInput) {
    const validated = productSchema.safeParse({
    title: input.title,
    description: input.description,
    price: input.price,
    stock: input.stock,
  })

  if(!validated.success) {
    const firstMessage =
     validated.error.issues[0]?.message ?? "入力内容が正しくありません"
    throw new Error(firstMessage)
  }
  
  const { userId } = await getCurrentUser()

  const product = await prisma.product.findFirst({
    where: {
      id: input.id,
      userId,
    },
  })

  if(!product){
    throw new Error("対象商品が見つかりません")
  }

  const updatedProduct = await prisma.product.update({
    where: {
      id: input.id,
    },
    data: {
      title: input.title,
      description: input.description,
      price: input.price,
      stock: input.stock,
    },
  })

  return updatedProduct
}