import { z } from 'zod';

export const ProductScalarFieldEnumSchema = z.enum(['id','title','description','price','stock','imageUrl','userId','createdAt','updatedAt']);

export default ProductScalarFieldEnumSchema;
