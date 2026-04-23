import { z } from 'zod';

export const CartScalarFieldEnumSchema = z.enum(['id','userId','createdAt','updatedAt']);

export default CartScalarFieldEnumSchema;
