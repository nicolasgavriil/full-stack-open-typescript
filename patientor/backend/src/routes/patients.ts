import express, { type Request, type Response } from "express";
import type {
  Entry,
  NewEntry,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from "../types.ts";
import patientService from "../services/patientService.ts";
import {
  errorMiddleware,
  newEntryParser,
  newPatientParser,
} from "../middleware.ts";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  const patients = patientService.getNonSensitivePatients();
  res.send(patients);
});

router.get("/:id", (req, res: Response<Patient | { error: string }>) => {
  const id = req.params.id;
  const patient = patientService.getPatientById(id);
  if (!patient) {
    return res.status(404).json({ error: "patient not found" });
  }
  return res.send(patient);
});

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    return res.status(200).json(addedPatient);
  },
);

router.post(
  "/:id/entries",
  newEntryParser,
  (
    req: Request<{ id: string }, unknown, NewEntry>,
    res: Response<Entry | { error: string }>,
  ) => {
    const id = req.params.id;
    const patient = patientService.getPatientById(id);
    if (!patient) {
      return res.status(404).json({ error: "patient not found" });
    }
    const addedEntry = patientService.addEntry(req.body, patient);
    return res.status(200).json(addedEntry);
  },
);

router.use(errorMiddleware);

export default router;
