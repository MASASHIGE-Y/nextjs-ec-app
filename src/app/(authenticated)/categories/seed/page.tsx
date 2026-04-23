import { seedCategories } from "@/features/product/actions/seedCategories"

export default async function CategorySeedPage() {
  await seedCategories()

  return <div>カテゴリの初期データを投入しました</div>
}