"use server"

import { getCurrentUser } from "@/lib/getCurrentUser"
import { prisma } from "@/lib/prisma"
import { productSchema } from "../schemas"
import { saveImage } from "@/lib/saveImage"

type CreateProductInput = {
  title: string
  description: string
  price: number
  stock: number
  categoryIds: number[]
  image: File | null
}

export async function createProduct({
  title,
  description,
  price,
  stock,
  categoryIds,
  image,
}: CreateProductInput) {
  const { userId } = await getCurrentUser()

  const validated = productSchema.safeParse({
    title,
    description,
    price,
    stock,
  })

  const imageUrl = image ? await saveImage(image) : null

  if (!validated.success) {
    console.error(validated.error.flatten())
    throw new Error("入力内容が正しくありません")
  }

  const product = await prisma.product.create({
    data: {
      title: validated.data.title,
      description: validated.data.description,
      price: validated.data.price,
      stock: validated.data.stock,
      userId,
      imageUrl,
      categories: {
        create: categoryIds.map((categoryId) => ({
          categoryId,
        })),
      },
    },
  })

  return product
}