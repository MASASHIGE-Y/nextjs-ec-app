import { getCurrentUser } from "@/lib/getCurrentUser"
import { prisma } from "@/lib/prisma"

type Props = {
  categoryId?: number
}

export async function getBookmarkedProducts({categoryId}: Props = {}) {
  const {userId} = await getCurrentUser()

  const bookmarks = await prisma.bookmark.findMany({
    where:{
      userId,
      ...(categoryId
        ?{
          product: {
            categories: {
              some: {
                categoryId,
              },
            },
          },
        }
      : {}),
    },
    include:{
      product: {
        include:{
          categories: {
            include:{
              category: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })
  
  return bookmarks.map((b) => b.product)
}