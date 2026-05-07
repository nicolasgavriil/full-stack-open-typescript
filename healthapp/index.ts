import express from 'express';
import { isNotNumber } from "./utils.ts";
import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  return res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const params = req.query;
  if (!params.height || !params.weight) {
    return res.status(400).json({error: "malformatted parameters"});
  }
  if (isNotNumber(params.height) || isNotNumber(params.weight) || Number(params.height) === 0) {
    return res.status(400).json({error: "malformatted parameters"});
  }

  try {
    const result = calculateBmi(Number(params.height), Number(params.weight));
    return res.status(200).json(result);
  } catch(err) {
    return res.status(500).json({error: `server error: ${err}`});
  }
  
});

app.post('/exercises', (req, res) => {
  const { daily_exercises: dailyExercises, target } = req.body;
  if (!dailyExercises || !target || dailyExercises.length === 0) {
    return res.status(400).json({error: "parameters missing"});
  }
  if (isNotNumber(target)) return res.status(400).json({error: "malformatted parameters"});

  for (const hours of dailyExercises) {
      if (isNotNumber(hours)) return res.status(400).json({error: "malformatted parameters"});
  }

  try {
    const result = calculateExercises(dailyExercises.map((h: string) => Number(h)), Number(target));
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({error: `server error: ${err}`});
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});