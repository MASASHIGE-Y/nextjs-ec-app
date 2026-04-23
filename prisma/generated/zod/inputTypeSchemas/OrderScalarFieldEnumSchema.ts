import { z } from 'zod';

export const OrderScalarFieldEnumSchema = z.enum(['id','userId','totalQuantity','totalPrice','createdAt','updatedAt']);

export default OrderScalarFieldEnumSchema;
