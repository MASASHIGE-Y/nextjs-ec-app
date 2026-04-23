import DeleteButton from "@/features/product/components/ProductDetail/DeleteButton"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { notFound } from "next/navigation"
import BookmarkButtonContainer from "@/features/product/components/BookmarkButton/Container"
import { getIsProductBookmarked } from "@/features/product/queries/getIsProductBookmarked"
import AddToCartButtonContainer from "@/features/product/components/AddToCarButton/Container"
import CartSummary from "@/features/product/components/CartSummary"
import Image from "next/image"

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const product = await prisma.product.findUnique({
    where: {
      id: Number(resolvedParams.id),
    },
    include:{
      categories:{
        include:{
          category: true,
        },
      },
    },
  })

  if (!product) return notFound()

  const isBookmarked = await getIsProductBookmarked(product.id)

return (
  <main className="mx-auto max-w-6xl p-6">
    <div className="flex gap-6">
      
      {/* 左：今の中身（←ここにそのまま入れる） */}
      <div className="flex-1">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <p className="mt-2 text-xl font-bold">{product.price}円</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {product.categories.map((pc) => (
                <span
                  key={pc.id}
                  className="rounded bg-gray-100 px-2 py-0.5 text-xs"
                >
                  {pc.category.name}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <AddToCartButtonContainer productId={product.id} />
          </div>

          <BookmarkButtonContainer
            isBookmarked={isBookmarked}
            productId={product.id}
          />
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">{product.title}</h1>

          <Link
            href={`/mypage/products/${product.id}/edit`}
            className="rounded border px-3 py-1 text-sm hover:bg-gray-50"
          >
            編集
          </Link>

          <DeleteButton id={product.id} />
        </div>

        <div className="space-y-2 rounded border p-4">
          <div className="relative aspect-[4/3] w-full max-w-md overflow-hidden rounded-lg border bg-gray-50">
            <Image
              src={product.imageUrl || "/no-image.png"}
              alt={product.title}
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover"
            />
          </div>
          <p>{product.description}</p>
          <p>{product.price}円</p>
          <p>在庫: {product.stock}</p>
        </div>
      </div>

      {/* 右：カート */}
      <div className="w-64 shrink-0">
        <CartSummary />
      </div>
    </div>
  </main>
)
}