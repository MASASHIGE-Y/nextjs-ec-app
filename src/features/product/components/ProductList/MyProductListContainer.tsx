import { getCurrentUserProducts } from "@/features/product/queries/getCurrentUserProducts"
import Presentation from "./Presentation"

type Props = {
  categoryId?: number
}

export default async function MyProductListContainer({ categoryId }: Props) {
  const products = await getCurrentUserProducts({ categoryId })

  return <Presentation products={products} />
}