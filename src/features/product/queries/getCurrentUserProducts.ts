import { getCurrentUser } from "@/lib/getCurrentUser"
import { prisma } from "@/lib/prisma"

type Props = {
  categoryId?: number
}

export async function getCurrentUserProducts({ categoryId }: Props = {}) {
  const { userId } = await getCurrentUser()

  return await prisma.product.findMany({
    where: {
      userId,
      ...(categoryId
        ? {
            categories: {
              some: {
                categoryId,
              },
            },
          }
        : {}),
    },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })
}