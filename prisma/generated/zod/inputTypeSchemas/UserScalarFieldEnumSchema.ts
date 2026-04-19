import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','email','password','name','imageUrl','createdAt','updatedAt']);

export default UserScalarFieldEnumSchema;
