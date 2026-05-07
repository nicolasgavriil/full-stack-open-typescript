import express, { type Response} from 'express';
import type { NonSensitivePatient } from '../types.ts';
import patientService from '../services/patientService.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  const patients = patientService.getNonSensitivePatients();
  res.send(patients);
});

export default router;