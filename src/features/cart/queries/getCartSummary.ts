import { getCurrentUser } from "@/lib/getCurrentUser"
import { prisma } from "@/lib/prisma"

export async function getCartSummary() {
  const { userId } = await getCurrentUser()

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  })

  if (!cart) {
    return {
      totalQuantity: 0,
      totalPrice: 0,
    }
  }

  let totalQuantity = 0
  let totalPrice = 0

  for (const item of cart.items) {
    totalQuantity += item.quantity
    totalPrice += item.quantity * item.product.price
  }

  return {
    totalQuantity,
    totalPrice,
  }
}