"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

type Props = {
  onSubmit: (formData: FormData) => void | Promise<void>
  isPending: boolean
  defaultValues?: {
    title: string
    description: string
    price: number
    stock: number
  }
  categories: {
    id: number
    name: string
  }[]
}

export default function Presentation({
  onSubmit,
  isPending,
  defaultValues,
  categories,
}: Props) {
  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="mb-6 text-2xl font-bold">商品登録</h1>

      <form action={onSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">商品名</Label>
          <Input id="title" name="title" defaultValue={defaultValues?.title} placeholder="商品名を入力" />
        </div>

        <div>
          <Label htmlFor="description">商品説明</Label>
          <Input id="description" name="description" defaultValue={defaultValues?.description} placeholder="説明を入力" />
        </div>

        <div>
          <Label htmlFor="price">価格</Label>
          <Input id="price" name="price" type="number" defaultValue={defaultValues?.price} placeholder="価格" />
        </div>

        <div>
          <Label htmlFor="stock">在庫</Label>
          <Input id="stock" name="stock" type="number" defaultValue={defaultValues?.stock} placeholder="在庫数" />
        </div>

        <div>
        <Label className="mb-2 block">カテゴリー</Label>

          <div className="grid gap-2 sm:grid-cols-2">
            {categories.map((category) => (
              <label
                key={category.id}
                className="flex items-center gap-2 rounded border p-2 text-sm"
              >
              <input
                type="checkbox"
                name="categoryIds"
                value={category.id}
              />
                <span>{category.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="image">画像</Label>
          <Input id="image" name="image" type="file" />
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "登録中..." : "登録する"}
        </Button>
      </form>
    </div>
  )
}