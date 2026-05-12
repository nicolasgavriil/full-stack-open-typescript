import { z } from "zod";
import { Gender, HealthCheckRating } from "./types.ts";

export const NewPatientSchema = z.object({
  ssn: z.string(),
  name: z.string(),
  dateOfBirth: z.iso.date(),
  occupation: z.string(),
  gender: z.enum(Gender),
});

const BaseNewEntrySchema = z.object({
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional(),
});

const NewHealthCheckEntrySchema = BaseNewEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.enum(HealthCheckRating),
});

const NewOccupationalHealthcareEntrySchema = BaseNewEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z
    .object({
      startDate: z.iso.date(),
      endDate: z.iso.date(),
    })
    .optional(),
});

const NewHospitalEntrySchema = BaseNewEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.iso.date(),
    criteria: z.string(),
  }),
});

export const NewEntrySchema = z.discriminatedUnion("type", [
  NewHealthCheckEntrySchema,
  NewOccupationalHealthcareEntrySchema,
  NewHospitalEntrySchema,
]);
