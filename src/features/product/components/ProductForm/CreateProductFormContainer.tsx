"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { createProduct } from "@/features/product/actions/createProduct"
import Presentation from "./Presentation"

type Props = {
  categories: {
    id: number
    name: string
  }[]
}

export default function CreateProductFormContainer({ categories }: Props) {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    try {
      setIsPending(true)

      const rawTitle = formData.get("title")
      const rawDescription = formData.get("description")
      const rawPrice = formData.get("price")
      const rawStock = formData.get("stock")
      const rawCategoryIds = formData.getAll("categoryIds")
      const rawImage = formData.get("image")

      const title =
        typeof rawTitle === "string" ? rawTitle.trim() : ""
      const description =
        typeof rawDescription === "string" ? rawDescription.trim() : ""
      const price =
        typeof rawPrice === "string" && rawPrice !== ""
          ? Number(rawPrice)
          : NaN
      const stock =
        typeof rawStock === "string" && rawStock !== ""
          ? Number(rawStock)
          : NaN
      const categoryIds = rawCategoryIds
        .map((id) => Number(id))
        .filter((id) => !Number.isNaN(id))
        const image = rawImage instanceof File && rawImage.size > 0 ? rawImage : null

      await createProduct({
        title,
        description,
        price,
        stock,
        categoryIds,
        image,
      })

      toast.success("商品を登録しました")
      router.push("/mypage")
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error("商品の登録に失敗しました")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Presentation
      onSubmit={handleSubmit}
      isPending={isPending}
      categories={categories}
    />
  )
}