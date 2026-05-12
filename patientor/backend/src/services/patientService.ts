import { v4 as uuid } from "uuid";
import patients from "../../data/patients.ts";
import type {
  Patient,
  NewPatient,
  NonSensitivePatient,
  NewEntry,
  Entry,
} from "../types.ts";

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const addPatient = (newPatient: NewPatient): Patient => {
  const patientToAdd: Patient = {
    id: uuid(),
    entries: [],
    ...newPatient,
  };

  patients.push(patientToAdd);
  return patientToAdd;
};

const addEntry = (newEntry: NewEntry, patient: Patient): Entry => {
  const entryToAdd: Entry = {
    id: uuid(),
    ...newEntry,
  };
  patient.entries.push(entryToAdd);
  return entryToAdd;
};

export default {
  getPatients,
  getNonSensitivePatients,
  getPatientById,
  addPatient,
  addEntry,
};
