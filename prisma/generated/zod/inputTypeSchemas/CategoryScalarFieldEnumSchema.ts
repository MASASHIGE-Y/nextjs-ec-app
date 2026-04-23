import { z } from 'zod';

export const CategoryScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt']);

export default CategoryScalarFieldEnumSchema;
