"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

type Props = {
  onClick: () => void
  isPending: boolean
}

export default function AddToCartButtonPresentation({
  onClick,
  isPending,
}: Props) {
  return(
    <Button
      onClick={onClick}
      disabled={isPending}
      className="flex items-center gap-2"
    >
      <ShoppingCart size={16} />
      {isPending ? "追加中..." : "カートに入れる"}
    </Button>
  )
}