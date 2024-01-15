import { z } from "zod";
import { Serializeble } from "./types.js";
import { randomUUID } from "crypto";

export const StudentCreationSchema = z.object({
  firstName: z.string(),
  surname: z.string(),
  phone: z.string(),
  email: z.string().email(),
  document: z.string(),
  id: z.string().uuid().optional(),
  bloodType: z.string(),
  birthDate: z
    .string()
    .datetime()
    .refine((date) => !isNaN(new Date(date).getTime())),
  allergies: z.string().array().optional(),
  medications: z.string().array().optional(),
  startDate: z
    .string()
    .datetime()
    .refine((date) => !isNaN(new Date(date).getTime())),
  parents: z.string().uuid().array().nonempty(),
  class: z.string().uuid(),
});

export type StudentCreationType = z.infer<typeof StudentCreationSchema>;

export const StudentUpdateSchema = StudentCreationSchema.partial().omit({ id: true });

export class Student implements Serializeble {
  readonly id: string;
  firstName: StudentCreationType["firstName"];
  surname: StudentCreationType["surname"];
  phone: StudentCreationType["phone"];
  email: StudentCreationType["email"];
  document: StudentCreationType["document"];
  bloodType: StudentCreationType["bloodType"];
  birthDate: StudentCreationType["birthDate"];
  allergies: StudentCreationType["allergies"];
  medications: StudentCreationType["medications"];
  startDate: StudentCreationType["startDate"];
  #parents: StudentCreationType["parents"];
  class: StudentCreationType["class"];
  constructor(data: StudentCreationType) {
    const parsedData = StudentCreationSchema.parse(data);
    this.firstName = parsedData.firstName;
    this.surname = parsedData.surname;
    this.phone = parsedData.phone;
    this.email = parsedData.email;
    this.document = parsedData.document;
    this.bloodType = parsedData.bloodType;
    this.birthDate = new Date(parsedData.birthDate).toISOString();
    this.allergies = parsedData.allergies;
    this.medications = parsedData.medications;
    this.startDate = new Date(parsedData.startDate).toISOString();
    this.#parents = parsedData.parents;
    this.class = parsedData.class;
    this.id = parsedData.id ?? randomUUID();
  }

  get parents() {
    return this.#parents;
  }

  set parents(value: StudentCreationType["parents"]) {
    this.#parents = value;
  }

  static fromObject(data: Record<string, unknown>) {
    const parsed = StudentCreationSchema.parse(data);
    return new Student(parsed);
  }
  toJson(): string {
    return JSON.stringify(this.toObject());
  }
  toObject(): Record<string, unknown> {
    return {
      id: this.id,
      firstName: this.firstName,
      surname: this.surname,
      phone: this.phone,
      email: this.email,
      document: this.document,
      bloodType: this.bloodType,
      birthDate: this.birthDate,
      allergies: this.allergies,
      medications: this.medications,
      startDate: this.startDate,
      parents: this.#parents,
      class: this.class,
    };
  }
}
