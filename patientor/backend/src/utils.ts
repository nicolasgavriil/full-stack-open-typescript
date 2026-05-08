import { z } from "zod";
import { Gender } from "./types.ts";

export const NewPatientSchema = z.object({
  ssn: z.string(),
  name: z.string(),
  dateOfBirth: z.iso.date(),
  occupation: z.string(),
  gender: z.enum(Gender),
});
