import { randomUUID } from "crypto";
import { z } from "zod";
import { AddressSchema, Serializeble } from "./types.js";

export const ParentCreationSchema = z.object({
  id: z.string().uuid().optional(),
  firstName: z.string(),
  surname: z.string(),
  phones: z.array(z.string()).nonempty(),
  emails: z.array(z.string().email()).nonempty(),
  address: z.array(AddressSchema).nonempty(),
  document: z.string(),
});

export const ParentUpdateSchema = ParentCreationSchema.partial().omit({ id: true });
export type ParentCreationType = z.infer<typeof ParentCreationSchema>;
export type ParentUpdateType = z.infer<typeof ParentUpdateSchema>;

export class Parent implements Serializeble {
  firstName: ParentCreationType["firstName"];
  surname: ParentCreationType["surname"];
  phones: ParentCreationType["phones"];
  emails: ParentCreationType["emails"];
  address: ParentCreationType["address"];
  document: ParentCreationType["document"];
  readonly id: string;

  constructor(data: ParentCreationType) {
    this.firstName = data.firstName;
    this.surname = data.surname;
    this.phones = data.phones;
    this.emails = data.emails;
    this.address = data.address;
    this.document = data.document;
    this.id = data.id ?? randomUUID();
  }

  static fromObject(data: Record<string, unknown>) {
    const parsed = ParentCreationSchema.parse(data);
    return new Parent(parsed);
  }

  toObject() {
    return {
      id: this.id,
      firstName: this.firstName,
      surname: this.surname,
      phones: this.phones,
      emails: this.emails,
      address: this.address,
      document: this.document,
    };
  }

  toJson() {
    return JSON.stringify(this.toObject());
  }
}
