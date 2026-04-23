import { getCurrentUser } from "@/lib/getCurrentUser";
import { prisma } from "@/lib/prisma";


export async function getIsProductBookmarked(productId: number) {
  const {userId} = await getCurrentUser()

  const bookmark = await prisma.bookmark.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  })

  return bookmark !== null
}