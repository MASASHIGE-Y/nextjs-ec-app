import { z } from 'zod';

/////////////////////////////////////////
// CART SCHEMA
/////////////////////////////////////////

export const CartSchema = z.object({
  id: z.number().int(),
  userId: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Cart = z.infer<typeof CartSchema>

/////////////////////////////////////////
// CART PARTIAL SCHEMA
/////////////////////////////////////////

export const CartPartialSchema = CartSchema.partial()

export type CartPartial = z.infer<typeof CartPartialSchema>

/////////////////////////////////////////
// CART OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const CartOptionalDefaultsSchema = CartSchema.merge(z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type CartOptionalDefaults = z.infer<typeof CartOptionalDefaultsSchema>

export default CartSchema;
