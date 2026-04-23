import { getCurrentUser } from "@/lib/getCurrentUser"
import { prisma } from "@/lib/prisma"
import CartItemQuantityControl from "@/features/cart/components/CartItemQuantityControl"

export default async function CartPage() {
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
        <h1 className="text-2xl font-bold">カート</h1>
        <p className="mt-4 text-gray-500">カートに商品がありません</p>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-bold">カート</h1>

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

            <CartItemQuantityControl
              cartItemId={item.id}
              quantity={item.quantity}
            />

            <div className="text-right">
              <p className="font-bold">
                {item.product.price * item.quantity}円
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

