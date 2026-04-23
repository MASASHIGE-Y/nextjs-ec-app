import { z } from 'zod';

/////////////////////////////////////////
// PRODUCT CATEGORY SCHEMA
/////////////////////////////////////////

export const ProductCategorySchema = z.object({
  id: z.number().int(),
  productId: z.number().int(),
  categoryId: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type ProductCategory = z.infer<typeof ProductCategorySchema>

/////////////////////////////////////////
// PRODUCT CATEGORY PARTIAL SCHEMA
/////////////////////////////////////////

export const ProductCategoryPartialSchema = ProductCategorySchema.partial()

export type ProductCategoryPartial = z.infer<typeof ProductCategoryPartialSchema>

/////////////////////////////////////////
// PRODUCT CATEGORY OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const ProductCategoryOptionalDefaultsSchema = ProductCategorySchema.merge(z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type ProductCategoryOptionalDefaults = z.infer<typeof ProductCategoryOptionalDefaultsSchema>

export default ProductCategorySchema;
