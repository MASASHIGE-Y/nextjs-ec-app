import { z } from 'zod';

export const OrderItemScalarFieldEnumSchema = z.enum(['id','orderId','productId','productTitle','productImageUrl','unitPrice','quantity','subtotal','createdAt','updatedAt']);

export default OrderItemScalarFieldEnumSchema;
