import { getCurrentUser } from "@/lib/getCurrentUser"
import { prisma } from "@/lib/prisma"
import CheckoutButton from "@/features/cart/components/CheckoutButton"

export default async function CartCheckoutPage() {
  const { userId } = await getCurrentUser()

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  })

  if (!cart || cart.items.length === 0) {
    return (
      <main className="mx-auto max-w-4xl p-6">
        <h1 className="text-2xl font-bold">購入確認</h1>
        <p className="mt-4 text-gray-500">カートに商品がありません</p>
      </main>
    )
  }

  const totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.items.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  )

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-bold">購入確認</h1>

      <div className="mt-6 space-y-4">
        {cart.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded border p-4"
          >
            <div>
              <p className="font-semibold">{item.product.title}</p>
              <p className="text-sm text-gray-500">
                {item.product.price}円 × {item.quantity}
              </p>
            </div>

            <div className="text-right">
              <p className="font-bold">
                {item.product.price * item.quantity}円
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-lg border p-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">合計点数</span>
          <span className="font-semibold">{totalQuantity}点</span>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-gray-500">合計金額</span>
          <span className="text-lg font-bold">{totalPrice}円</span>
        </div>

        <CheckoutButton />

      </div>
    </main>
  )
}