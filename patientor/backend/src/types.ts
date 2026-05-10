import type { z } from "zod";
import type { NewPatientSchema } from "./utils.ts";

export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};

export const Gender = {
  Male: "male",
  Female: "female",
  Other: "other",
} as const;

export type Gender = (typeof Gender)[keyof typeof Gender];

export interface Entry {
  id: string;
}

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
};

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export type NewPatient = z.infer<typeof NewPatientSchema>;
