import { getCurrentUser } from "@/lib/getCurrentUser"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

type Props ={
  params: { id: string }
}

export default  async function OrderDetailPage({params}: Props) {
  const {userId} = await getCurrentUser()

  const order = await prisma.order.findFirst({
    where: {
      id: Number(params.id),
      userId,
    },
    include: {
      items: true,
    },
  })

  if(!order) return notFound()

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-bold">購入明細</h1>

      <div className="mt-6 rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">合計点数</span>
          <span className="font-semibold">{order.totalQuantity}点</span>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-gray-500">合計金額</span>
          <span className="font-semibold">{order.totalPrice}円</span>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded border p-4">
              <div>
                <p className="font-semibold">{item.productTitle}</p>
                <p className="text-sm text-gray-500">
                  {item.unitPrice}円 × {item.quantity}
                </p>
              </div>

              <div className="text-right">
                <p className="font-bold">{item.subtotal}円</p>
              </div>
            </div>
        ))}
      </div>
    </main>
  )
}