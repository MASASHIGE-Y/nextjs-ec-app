"use client"

import { useState } from "react"
import { toast } from "sonner"
import { increaseCartItemQuantity } from "@/features/cart/actions/increaseCartItemQuantity"
import { decreaseCartItemQuantity } from "@/features/cart/actions/decreaseCartItemQuantity"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

type Props = {
  cartItemId: number
  quantity: number
}

export default function CartItemQuantityControl({
  cartItemId,
  quantity,
}: Props) {
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  const handleIncrease = async () => {
    try {
      setIsPending(true)
      await increaseCartItemQuantity(cartItemId)
      toast.success("数量を増やしました")
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error("追加できませんでした")
    } finally {
      setIsPending(false)
    }
  }

  const handleDecrease = async () => {
    try {
      setIsPending(true)
      await decreaseCartItemQuantity(cartItemId)
      toast.success("数量を減らしました")
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error("減らせませんでした")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button size="sm" onClick={handleDecrease} disabled={isPending}>
        -
      </Button>

      <span className="w-6 text-center">{quantity}</span>

      <Button size="sm" onClick={handleIncrease} disabled={isPending}>
        +
      </Button>
    </div>
  )
}