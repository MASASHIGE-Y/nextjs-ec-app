import { getMyOrders } from "@/app/(authenticated)/cart/queries/getMyOrders";
import  Link  from "next/link";

export default async function OrderListContainer() {
  const orders = await getMyOrders()

  return (
    <div className="mt-6 space-y-4">
      {orders.map((order) =>(
        <Link
          key={order.id}
          href={`/mypage/orders/${order.id}`}
          className="block rounded border p-4 hover:bg-gray-50"
        >
          <div className="flex justify-between">
            <span>注文ID:{order.id}</span>
            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="mt-2 flex justify-between">
            <span>{order.totalQuantity}点</span>
            <span className="font-bold">{order.totalPrice}円</span>
          </div>
        </Link>
      ))}
    </div>
  )
}