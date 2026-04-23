import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image"

type ProductWithCategories = {
  id: number
  title: string
  description: string
  price: number
  stock: number
  imageUrl: string | null
  categories: {
    id: number
    category: {
      name: string
    }
  }[]
}

type Props ={
  products: ProductWithCategories[]
}

export default function Presentation({products}: Props) {
  if(products.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <div className="mt-10 text-center">
          <p className="text-lg font-medium">該当する商品がありません</p>
          <p className="mt-2 text-sm text-gray-500">
            条件を変えてもう一度お試しください。
          </p>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          商品を登録したり、ブックマークするとここに表示されます。
        </p>
      </div>
    )
  }
  
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <Link key={product.id} href={`/mypage/products/${product.id}`}>
          <Card className="transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
            <CardHeader>
              <CardTitle className="line-clamp-2 text-lg">
                  {product.title}
              </CardTitle>
              <div className="mt-2 flex flex-wrap gap-1">
                {product.categories.map((pc) => (
                  <span
                    key={pc.id}
                    className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
                  >
                    {pc.category.name}
                  </span>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 overflow-hidden rounded-lg border bg-gray-50">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={product.imageUrl || "/no-image.png"}
                    alt={product.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </div>
              <p className="line-clamp-3 text-sm text-gray-600">
                {product.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold">
                  {product.price}円
                </span>
                <span className="text-xs text-gray-500">
                  在庫 {product.stock}
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}