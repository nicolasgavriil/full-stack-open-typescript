import express, { type Response} from 'express';
import type { Diagnosis } from '../types.ts';
import diagnosisService from '../services/diagnosisService.ts';

const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
  const diagnoses = diagnosisService.getDiagnoses();
  res.send(diagnoses);
});

export default router;