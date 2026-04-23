import { z } from 'zod';

/////////////////////////////////////////
// CART ITEM SCHEMA
/////////////////////////////////////////

export const CartItemSchema = z.object({
  id: z.number().int(),
  cartId: z.number().int(),
  productId: z.number().int(),
  quantity: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type CartItem = z.infer<typeof CartItemSchema>

/////////////////////////////////////////
// CART ITEM PARTIAL SCHEMA
/////////////////////////////////////////

export const CartItemPartialSchema = CartItemSchema.partial()

export type CartItemPartial = z.infer<typeof CartItemPartialSchema>

/////////////////////////////////////////
// CART ITEM OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const CartItemOptionalDefaultsSchema = CartItemSchema.merge(z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type CartItemOptionalDefaults = z.infer<typeof CartItemOptionalDefaultsSchema>

export default CartItemSchema;
