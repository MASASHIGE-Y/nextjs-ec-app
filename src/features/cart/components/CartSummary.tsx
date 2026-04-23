import Link from "next/link"
import { getCartSummary } from "../queries/getCartSummary"

export default async function CartSummary() {
  const { totalQuantity, totalPrice } = await getCartSummary()

  return (
    <div className="sticky top-6 rounded-xl border bg-white p-4 shadow-md">
      <div className="mb-3">
        <p className="text-base font-semibold">カート</p>
        <p className="text-xs text-gray-500">現在の合計</p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">合計点数</span>
          <span className="font-semibold">{totalQuantity}点</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">合計金額</span>
          <span className="font-semibold">{totalPrice}円</span>
        </div>
      </div>

      <Link
        href="/cart"
        className="mt-4 block rounded-lg bg-black px-3 py-2 text-center text-sm font-medium text-white transition hover:opacity-90"
      >
        カートを見る
      </Link>
    </div>
  )
}