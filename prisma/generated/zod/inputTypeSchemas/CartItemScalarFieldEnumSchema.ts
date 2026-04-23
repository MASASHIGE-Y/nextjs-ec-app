import { z } from 'zod';

export const CartItemScalarFieldEnumSchema = z.enum(['id','cartId','productId','quantity','createdAt','updatedAt']);

export default CartItemScalarFieldEnumSchema;
