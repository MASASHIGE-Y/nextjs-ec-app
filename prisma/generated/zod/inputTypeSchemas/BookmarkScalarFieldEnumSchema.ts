import { z } from 'zod';

export const BookmarkScalarFieldEnumSchema = z.enum(['id','userId','productId','createdAt','updatedAt']);

export default BookmarkScalarFieldEnumSchema;
