import CartSummary from "@/features/cart/components/CartSummary"
import MyProductListContainer from "@/features/product/components/ProductList/MyProductListContainer"
import { getCategories } from "@/features/product/queries/getCategories"
import CategoryFilter from "@/features/product/components/ProductList/CategoryFilter"
import BookmarkProductListContainer from "@/features/product/components/ProductList/BookmarkProductListContainer"

type Props = {
  searchParams?: Promise<{
    categoryId?: string
  }>
}

export default async function ProductsPage({ searchParams }: Props) {
  const categories = await getCategories()
  const params = searchParams ? await searchParams : {}
  const selectedCategoryId =
    typeof params.categoryId === "string" && params.categoryId !== ""
      ? Number(params.categoryId)
      : undefined

  return (
    <main className="mx-auto max-w-6xl p-6">
      <div className="flex gap-6">
        <div className="flex-1">
          <h1 className="mb-6 text-3xl font-bold">商品一覧</h1> 
          <p className="mb-6 text-sm text-gray-500">
            カテゴリーで絞り込みながら商品を探せます。
          </p>

          <CategoryFilter categories={categories} />

          <h2 className="mt-8 text-xl font-bold">あなたの商品</h2>
          <MyProductListContainer categoryId={selectedCategoryId} />

          <h2 className="mt-8 text-xl font-bold">ブックマーク</h2>
          <BookmarkProductListContainer categoryId={selectedCategoryId} />
          </div>

        <div className="w-64 shrink-0">
          <CartSummary />
        </div>
      </div>
    </main>
  )
}