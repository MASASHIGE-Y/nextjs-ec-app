"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import Presentation from "./Presentation"
import { updateProduct } from "../../actions/updateProduct"
import { toast } from "sonner"

type Props = {
  product: {
    id: number
    title: string
    description: string
    price: number
    stock: number
  }
}

export default function EditProductFormContainer({product}: Props) {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async(formData: FormData) =>{
    try {
      setIsPending(true)

      const rawTitle = formData.get("title")
      const rawDescription = formData.get("description")
      const rawPrice = formData.get("price")
      const rawStock = formData.get("stock")

      const title = typeof rawTitle === "string" ? rawTitle.trim() : ""
      const description =
        typeof rawDescription === "string" ? rawDescription.trim() : ""

      const price =
        typeof rawPrice === "string" && rawPrice !== "" ? Number(rawPrice) : NaN

      const stock =
        typeof rawStock === "string" && rawStock !== "" ? Number(rawStock) : NaN

    await updateProduct({
      id: product.id,
      title,
      description,
      price,
      stock,
    })

      toast.success("商品を更新しました")
      router.push(`/mypage/products/${product.id}`)
    } catch (error) {
      console.error(error)
      toast.error("商品の更新に失敗しました")
    } finally {
      setIsPending(false)
    }
  }

  return(
    <Presentation
      onSubmit={handleSubmit}
      isPending={isPending}
      defaultValues={product}
      />
  )
}