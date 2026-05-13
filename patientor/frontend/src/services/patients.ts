import axios from "axios";
import { Entry, NewEntry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const baseUrl = `${apiBaseUrl}/patients`;

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(baseUrl);

  return data;
};

const getById = async (patientId: string) => {
  const { data } = await axios.get<Patient>(`${baseUrl}/${patientId}`);
  return data;
};

const createPatient = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(baseUrl, object);

  return data;
};

const addEntry = async (object: NewEntry, id: string) => {
  const { data } = await axios.post<Entry>(`${baseUrl}/${id}/entries`, object);

  return data;
};

export default {
  getAll,
  getById,
  createPatient,
  addEntry,
};
