"use client"

import { useRouter, useSearchParams } from "next/navigation"

type Props = {
  categories: {
    id: number
    name: string
  }[]
}

export default function CategoryFilter({ categories }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentCategoryId = searchParams.get("categoryId") ?? ""

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set("categoryId", value)
    } else {
      params.delete("categoryId")
    }

    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="mb-6">
      <label htmlFor="category" className="mb-2 block text-sm font-medium">
        カテゴリーで絞り込み
      </label>

      <select
        id="category"
        value={currentCategoryId}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full max-w-xs rounded-md border px-3 py-2 text-sm"
      >
        <option value="">すべて</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  )
}