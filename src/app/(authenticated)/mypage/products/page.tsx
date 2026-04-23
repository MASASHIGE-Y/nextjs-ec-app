import BookmarkProductListContainer from "@/features/product/components/ProductList/BookmarkProductListContainer"
import CartSummary from "@/features/product/components/CartSummary"


export default async function ProductsPage() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <div className="flex gap-6">
        <div className="flex-1">
          <section>
            <div className="mb-8">
              <h1 className="text-3xl font-bold">ブックマークした商品一覧</h1>
              <p className="mt-2 text-sm text-gray-500">
                保存した商品をあとからまとめて確認できます。
              </p>
            </div>

            <BookmarkProductListContainer />
          </section>
        </div>

        <div className="w-64 shrink-0">
          <CartSummary />
        </div>
      </div>
    </main>
  )
}