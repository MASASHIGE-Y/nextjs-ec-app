import { z } from 'zod';

export const ProductCategoryScalarFieldEnumSchema = z.enum(['id','productId','categoryId','createdAt','updatedAt']);

export default ProductCategoryScalarFieldEnumSchema;
