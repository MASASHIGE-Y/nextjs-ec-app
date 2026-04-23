import { getCurrentUser } from "@/lib/getCurrentUser"
import { prisma } from "@/lib/prisma"

export const getMyOrders = async () =>{
  const { userId} = await getCurrentUser()

  return prisma.order.findMany({
    where: { userId },
    orderBy:{ createdAt: "desc"},
  })
}