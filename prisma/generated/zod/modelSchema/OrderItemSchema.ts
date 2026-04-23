import { z } from 'zod';

/////////////////////////////////////////
// ORDER ITEM SCHEMA
/////////////////////////////////////////

export const OrderItemSchema = z.object({
  id: z.number().int(),
  orderId: z.number().int(),
  productId: z.number().int(),
  productTitle: z.string(),
  productImageUrl: z.string().nullable(),
  unitPrice: z.number().int(),
  quantity: z.number().int(),
  subtotal: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type OrderItem = z.infer<typeof OrderItemSchema>

/////////////////////////////////////////
// ORDER ITEM PARTIAL SCHEMA
/////////////////////////////////////////

export const OrderItemPartialSchema = OrderItemSchema.partial()

export type OrderItemPartial = z.infer<typeof OrderItemPartialSchema>

/////////////////////////////////////////
// ORDER ITEM OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const OrderItemOptionalDefaultsSchema = OrderItemSchema.merge(z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type OrderItemOptionalDefaults = z.infer<typeof OrderItemOptionalDefaultsSchema>

export default OrderItemSchema;
