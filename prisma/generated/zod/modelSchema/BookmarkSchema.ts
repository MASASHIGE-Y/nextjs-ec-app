import { z } from 'zod';

/////////////////////////////////////////
// BOOKMARK SCHEMA
/////////////////////////////////////////

export const BookmarkSchema = z.object({
  id: z.number().int(),
  userId: z.number().int(),
  productId: z.number().int(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Bookmark = z.infer<typeof BookmarkSchema>

/////////////////////////////////////////
// BOOKMARK PARTIAL SCHEMA
/////////////////////////////////////////

export const BookmarkPartialSchema = BookmarkSchema.partial()

export type BookmarkPartial = z.infer<typeof BookmarkPartialSchema>

/////////////////////////////////////////
// BOOKMARK OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const BookmarkOptionalDefaultsSchema = BookmarkSchema.merge(z.object({
  id: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
}))

export type BookmarkOptionalDefaults = z.infer<typeof BookmarkOptionalDefaultsSchema>

export default BookmarkSchema;
