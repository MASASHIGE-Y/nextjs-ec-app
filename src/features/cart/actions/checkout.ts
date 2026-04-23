"use server"

import { getCurrentUser } from "@/lib/getCurrentUser"
import { prisma } from "@/lib/prisma"


export async function checkout() {
  const {userId} = await getCurrentUser()

  const cart = await prisma.cart.findUnique({
    where: {userId},
    include:{
      items:{
        include:{
          product: true,
        },
      },
    },
  })

  if(!cart || cart.items.length === 0) {
    throw new Error("カートに商品がありません")
  }

  let totalQuantity = 0
  let totalPrice = 0

  for (const item of cart.items) {
    totalQuantity += item.quantity
    totalPrice += item.quantity * item.product.price
  }

  const order = await prisma.order.create({
    data: {
      userId,
      totalQuantity,
      totalPrice,
      items:{
        create: cart.items.map((item) => ({
          productId: item.productId,
          productTitle: item.product.title,
          productImageUrl: item.product.imageUrl,
          unitPrice: item.product.price,
          quantity: item.quantity,
          subtotal: item.quantity * item.product.price,
        })),
      },
    },
    include:{
      items: true,
    },
  })

  await prisma.cartItem.deleteMany({
    where:{
      cartId: cart.id,
    },
  })

  return order
}