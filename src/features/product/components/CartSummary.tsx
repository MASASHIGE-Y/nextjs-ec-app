import { getCartSummary } from "../queries/getCartSummary"

export default async function CartSummary() {
  const {totalQuantity, totalPrice} = await getCartSummary()

  return(
    <div className="rounded-lg border bg-white px-4 py-3 text-sm shadow-sm">
      <p className="font-medium">カート</p>

      <div className="mt-2 flex items-center justify-between">
        <span className="text-gray-500">合計点数</span>
        <span className="font-semibold">{totalQuantity}点</span>
      </div>

      <div className="mt-1 flex items-center justify-between">
        <span className="text-gray-500">合計金額</span>
        <span className="font-semibold">{totalPrice}円</span>
      </div>
    </div>
  )
}