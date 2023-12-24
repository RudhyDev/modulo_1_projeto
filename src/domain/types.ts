import { z } from "zod";

export const AddressSchema = z.object({
  line1: z.string(),
  loine2: z.string().optional(),
  zipCode: z.string(),
  city: z.string(),
  country: z.string(),
});

export type Address = z.infer<typeof AddressSchema>;

export interface Serializeble {
  id: string;
  toJson(): string;
  toObject(): Record<string, unknown>;
}
