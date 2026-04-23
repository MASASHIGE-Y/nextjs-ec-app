"use server"

import { getCurrentUser } from "@/lib/getCurrentUser"
import { prisma } from "@/lib/prisma"

export async function decreaseCartItemQuantity(cartItemId: number) {
  const { userId } = await getCurrentUser()

  const cartItem = await prisma.cartItem.findFirst({
    where: {
      id: cartItemId,
      cart: {
        userId,
      },
    },
    include: {
      product: true,
    },
  })

  if (!cartItem) {
    throw new Error("カートの商品が見つかりません")
  }

  if (cartItem.quantity <= 1) {
    await prisma.cartItem.delete({
      where: {
        id: cartItem.id,
      },
    })
  } else {
    await prisma.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        quantity: cartItem.quantity - 1,
      },
    })
  }

  await prisma.product.update({
    where: {
      id: cartItem.productId,
    },
    data: {
      stock: cartItem.product.stock + 1,
    },
  })
}