import express, { type Request, type Response } from "express";
import type { NewPatient, NonSensitivePatient, Patient } from "../types.ts";
import patientService from "../services/patientService.ts";
import { errorMiddleware, newPatientParser } from "../middleware.ts";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatient[]>) => {
  const patients = patientService.getNonSensitivePatients();
  res.send(patients);
});

router.post(
  "/",
  newPatientParser,
  (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
    const addedPatient = patientService.addPatient(req.body);
    res.status(200).json(addedPatient);
  },
);

router.use(errorMiddleware);

export default router;
