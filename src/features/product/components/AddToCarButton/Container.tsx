"use client"

import { useState } from "react"
import { toast } from "sonner"
import { addToCart } from "../../actions/addToCart"
import AddToCartButtonPresentation from "./Presentation"

type Props ={
  productId: number
}

export default function AddToCartButtonContainer({productId}: Props){
  const [isPending, setIsPending] = useState(false)

  const handleClick = async () => {
    try {
      setIsPending(true)
      await addToCart(productId)
      toast.success("カードに追加しました")
    } catch (error) {
      console.error(error)

      if(error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error("カート追加に失敗しました")
      }
    } finally {
      setIsPending(false)
    }
  }

  return (
    <AddToCartButtonPresentation
      onClick={handleClick}
      isPending={isPending}
    />
  )
}