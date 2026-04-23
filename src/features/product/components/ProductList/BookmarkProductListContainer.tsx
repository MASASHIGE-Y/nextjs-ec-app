import { getBookmarkedProducts } from "../../queries/getBookmarkedProducts";
import Presentation from "./Presentation";

type Props = {
  categoryId?: number
}

export default async function BookmarkProductListContainer({ categoryId }: Props) {
  const products = await getBookmarkedProducts({ categoryId })

  return <Presentation products={products} />
}