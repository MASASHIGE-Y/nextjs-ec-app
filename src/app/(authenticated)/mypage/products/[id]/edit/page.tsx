import EditProductFormContainer from "@/features/product/components/ProductForm/EditProductFormContainer"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

type Props ={
  params: {id: string}
}

export default async function ProductEditPage({ params}: Props) {
  const product = await prisma.product.findUnique({
    where: { id: Number(params.id)},
  })

  if(!product) return notFound()

  return <EditProductFormContainer product={product} />
}