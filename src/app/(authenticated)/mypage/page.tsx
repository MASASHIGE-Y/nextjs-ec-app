import MyProductListContainer from "@/features/product/components/ProductList/MyProductListContainer"
import Link from "next/link"
import OrderListContainer from "@/features/cart/components/OrderListContainer"

export default function MyPage() {
  return (
    <main className="mx-auto max-w-6xl p-6">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">マイページ</h1>
          <p className="mt-2 text-sm text-gray-500">
            自分が登録した商品を確認・編集できます。
          </p>
        </div>

        <Link
          href="/mypage/products/new"
          className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-gray-50"
        >
          商品を登録する
        </Link>
      </div>

      <MyProductListContainer />

      <h2 className="mt-8 text-xl font-bold">購入履歴</h2>
      <OrderListContainer />
    </main>
  )
}