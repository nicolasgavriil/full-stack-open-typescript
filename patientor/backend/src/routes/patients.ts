import express, { type Response} from 'express';
import type { NonSensitivePatient } from '../types.ts';
import patientService from '../services/patientService.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  const patients = patientService.getNonSensitivePatients();
  res.send(patients);
});

router.post('/', (req, res) => {
  const { ssn, name, dateOfBirth, gender, occupation } = req.body;
  const addedPatient = patientService.addPatient({
    ssn,
    name,
    dateOfBirth,
    occupation,
    gender
  });
  res.json(addedPatient);
});

export default router;