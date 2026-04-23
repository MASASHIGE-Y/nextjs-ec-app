"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { checkout } from "@/features/cart/actions/checkout"
import { Button } from "@/components/ui/button"

export default function CheckoutButton() {
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()

  const handleClick = async () => {
    try {
      setIsPending(true)
      const order = await checkout()
      toast.success("購入が完了しました")
      router.push(`/mypage/orders/${order.id}`)
    } catch (error) {
      console.error(error)

      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("購入に失敗しました")
      }
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Button
      onClick={handleClick}
      disabled={isPending}
      className="mt-6 w-full"
    >
      {isPending ? "購入中..." : "購入する"}
    </Button>
  )
}