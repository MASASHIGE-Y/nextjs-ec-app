import z from "zod";

export const productSchema = z.object({
  title: z.string().trim().min(1, "商品名は必須です").max(100, "商品名は100文字以内です"),
  description: z
    .string()
    .trim()
    .min(1, "商品説明は必須です")
    .max(4000, "商品説明は4000文字以内です"),
    price: z.number().int().min(1, "価格は1円以上で入力してください"),
    stock: z.number().int().min(1, "在庫は1以上で入力してください"),
})

export type ProductFormValues = z.infer<typeof productSchema>