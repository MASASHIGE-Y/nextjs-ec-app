import CreateProductFormContainer from "@/features/product/components/ProductForm/CreateProductFormContainer"
import { getCategories } from "@/features/product/queries/getCategories"

export default async function ProductNewPage() {
  const categories = await getCategories()

  return <CreateProductFormContainer categories={categories} />
}