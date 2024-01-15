import { z } from "zod";
import { Serializeble } from "./types.js";
import { randomUUID } from "crypto";

export const ClassCreationSchema = z.object({
  id: z.string().uuid().optional(),
  teacher: z.string().uuid().nullable(),
  code: z.string().regex(/^[0-9]{1}[A-H]{1}-[MTN]$/),
});
export type ClassCreationType = z.infer<typeof ClassCreationSchema>;

export const ClassUpdateSchema = ClassCreationSchema.partial().omit({
  id: true,
});

export type ClassUpdateType = z.infer<typeof ClassUpdateSchema>;

export class Class implements Serializeble {
  code: ClassCreationType["code"];
  readonly id: string;
  accessor teacher: ClassCreationType["teacher"];

  constructor(data: ClassCreationType) {
    this.id = data.id ?? randomUUID();
    this.teacher = data.teacher;
    this.code = data.code;
  }

  static fromObject(data: Record<string, unknown>): Class {
    const parsed = ClassCreationSchema.parse(data);
    return new Class(parsed);
  }

  toJson(): string {
    return JSON.stringify(this.toObject());
  }
  toObject(): Record<string, unknown> {
    return {
      id: this.id,
      teacher: this.teacher,
      code: this.code,
    };
  }
}
